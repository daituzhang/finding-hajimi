#!/usr/bin/env python3
"""
Batch-generate images from docs/image-prompts.html via Gemini / Imagen.

Reads every <div class="prompt compact"> + the nearest preceding <div class="path">
and POSTs the prompt to Google's image-generation API, saving the result as
<path>.jpg under the repo root.

Usage:
  export GEMINI_API_KEY=...
  python3 tools/gen_images.py                         # all .compact, skip existing
  python3 tools/gen_images.py --only birthday-1       # one stem
  python3 tools/gen_images.py --only birthday-,walk-  # prefix match
  python3 tools/gen_images.py --force                 # overwrite existing
  python3 tools/gen_images.py --dry-run               # list, no API calls
  python3 tools/gen_images.py --trim                  # crop bottom 6% (watermark)
  python3 tools/gen_images.py --max 3                 # cap to first N
  python3 tools/gen_images.py --model imagen-4.0-generate-001
"""
import argparse
import base64
import json
import os
import sys
import time
from html.parser import HTMLParser
from io import BytesIO
from pathlib import Path
from urllib import error, request

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "docs" / "image-prompts.html"


class Extractor(HTMLParser):
    """Pair each <div class='path'> ... <code>X</code> ... </div>
    with the next <div class='prompt compact'> <pre>...</pre>."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []  # (tag, classes)
        self.in_path_code = False
        self.in_compact_pre = False
        self.pending_path = None
        self.buf = ""
        self.items = []  # [(rel_no_ext, prompt)]

    def _has_ancestor_class(self, needle):
        return any(needle in (c or "").split() for _, c in self.stack)

    def handle_starttag(self, tag, attrs):
        cls = dict(attrs).get("class", "")
        self.stack.append((tag, cls))
        if tag == "code" and self._has_ancestor_class("path"):
            self.in_path_code = True
            self.buf = ""
        if tag == "pre" and self._has_ancestor_class("compact"):
            self.in_compact_pre = True
            self.buf = ""

    def handle_endtag(self, tag):
        if tag == "code" and self.in_path_code:
            self.in_path_code = False
            txt = self.buf.strip()
            # only treat as a save path if it's a real asset under a known page dir
            if (
                txt
                and "/assets/" in txt
                and not txt.lower().endswith((".html", ".css", ".js", ".svg"))
            ):
                self.pending_path = txt
        elif tag == "pre" and self.in_compact_pre:
            self.in_compact_pre = False
            prompt = self.buf.strip()
            if self.pending_path and prompt:
                self.items.append((self.pending_path, prompt))
                self.pending_path = None
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i]
                break

    def handle_data(self, data):
        if self.in_path_code or self.in_compact_pre:
            self.buf += data


def extract():
    p = Extractor()
    p.feed(HTML.read_text(encoding="utf-8"))
    return p.items


def _post(url: str, body: dict, timeout=180) -> dict:
    req = request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def call_gemini(prompt: str, model: str, key: str) -> bytes:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"]},
    }
    data = _post(url, body)
    for cand in data.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if inline and inline.get("data"):
                return base64.b64decode(inline["data"])
    raise RuntimeError(f"no image in response: {json.dumps(data)[:400]}")


def call_imagen(prompt: str, model: str, key: str) -> bytes:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:predict?key={key}"
    body = {"instances": [{"prompt": prompt}], "parameters": {"sampleCount": 1}}
    data = _post(url, body)
    preds = data.get("predictions") or []
    if preds and preds[0].get("bytesBase64Encoded"):
        return base64.b64decode(preds[0]["bytesBase64Encoded"])
    raise RuntimeError(f"no image in response: {json.dumps(data)[:400]}")


def save_jpeg(raw: bytes, dest: Path, trim_watermark: bool):
    try:
        from PIL import Image
    except ImportError:
        sys.exit("Pillow not installed. Run: pip install --user Pillow")
    img = Image.open(BytesIO(raw)).convert("RGB")
    if trim_watermark:
        w, h = img.size
        img = img.crop((0, 0, w, int(h * 0.94)))
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=92)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--model",
        default="gemini-3.1-flash-image-preview",
        help="gemini-3.1-flash-image-preview | gemini-3-pro-image-preview | "
             "gemini-2.5-flash-image | imagen-4.0-generate-001 | "
             "imagen-4.0-fast-generate-001 | imagen-4.0-ultra-generate-001",
    )
    ap.add_argument("--only", default="", help="comma-separated filename-stem prefixes")
    ap.add_argument("--force", action="store_true", help="overwrite existing files")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--trim", action="store_true", help="trim bottom 6%% (watermark)")
    ap.add_argument("--max", type=int, default=0, help="cap to first N (after filter)")
    ap.add_argument("--sleep", type=float, default=2.0, help="seconds between calls")
    ap.add_argument("--retry", type=int, default=1, help="retry count on failure")
    args = ap.parse_args()

    key = os.environ.get("GEMINI_API_KEY")
    if not key and not args.dry_run:
        sys.exit("Set GEMINI_API_KEY env var first.")

    items = extract()
    if args.only:
        prefixes = [s.strip() for s in args.only.split(",") if s.strip()]
        items = [(p, t) for p, t in items
                 if any(Path(p).name.startswith(pr) for pr in prefixes)]
    if args.max:
        items = items[: args.max]

    if not items:
        print("No matching .compact prompts.")
        return

    print(f"Model: {args.model}")
    print(f"Found {len(items)} prompts.\n")

    ok = skip = fail = 0
    for i, (relpath, prompt) in enumerate(items, 1):
        dest = ROOT / (relpath + ".jpg")
        stem = Path(relpath).name
        if dest.exists() and not args.force:
            print(f"[{i:>3}/{len(items)}] skip   {stem} (exists)")
            skip += 1
            continue
        if args.dry_run:
            print(f"[{i:>3}/{len(items)}] would  {stem}  ({len(prompt)} chars)  -> {dest.relative_to(ROOT)}")
            continue
        attempt, last_err = 0, None
        while attempt <= args.retry:
            attempt += 1
            try:
                print(f"[{i:>3}/{len(items)}] gen    {stem} (attempt {attempt}, {len(prompt)} chars) ...", flush=True)
                if args.model.startswith("imagen"):
                    raw = call_imagen(prompt, args.model, key)
                else:
                    raw = call_gemini(prompt, args.model, key)
                save_jpeg(raw, dest, args.trim)
                print(f"             ✓ {dest.relative_to(ROOT)}.jpg ({len(raw)//1024} KB)")
                ok += 1
                last_err = None
                break
            except error.HTTPError as e:
                last_err = f"HTTP {e.code}: {e.read()[:300].decode(errors='replace')}"
            except Exception as e:
                last_err = f"{type(e).__name__}: {e}"
            if attempt <= args.retry:
                time.sleep(args.sleep * 2)
        if last_err:
            print(f"             ✗ {last_err}")
            fail += 1
        time.sleep(args.sleep)

    print(f"\nDone. ok={ok}  skip={skip}  fail={fail}")


if __name__ == "__main__":
    main()
