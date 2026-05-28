# 图片 Prompts 集

> 给 Gemini / Imagen / Nano Banana / Midjourney 用的 prompt。所有"哈基米"沿用同一 character sheet，避免每张图猫长得不一样。

---

## 0. 角色设定（每个 prompt 都引用，强制一致）

> **Character: Hajimi (哈基米)** — a **5-year-old male orange tabby cat (橘猫)**, **VERY CHUBBY / FAT / 圆滚滚的大胖橘 (this is mandatory — body shape clearly OVERWEIGHT, ~6 kg, big round belly that sags slightly when he stands, thick short legs, plump cheeks, double-chin pouch under the jaw, fluffy "bread-loaf" silhouette when sitting — NEVER draw him slim or athletic)**. Warm marigold-orange (#ff9a3c) coat, creamy belly, classic mackerel tabby stripes, **round chubby face, small pink nose, plump pink toe-beans**, big amber eyes. **Default expression: SOFTLY SMILING — relaxed mouth slightly open in a tiny content smile, eyes gently squinted into upward crescents (招财猫弧度), one tiny pointed canine peeking out the side of his mouth like a small fang.** Looks happy, kind, unmistakably cute — never grumpy, never blank-faced. Personality: a little shy in public, but secretly playful and silly at home.
>
> **Three signature game-canon features (MUST appear when the relevant body part is visible — these are key plot evidence):**
> 1. **左耳一道月牙形缺口 (a clear crescent-moon notch on the LEFT ear tip)** — about 4 mm, like a healed bite mark, always on the left ear only.
> 2. **天蓝色布质项圈 + 小银牌 (a soft sky-blue cloth collar with a small silver oval tag dangling under his chin)**, the tag engraved "HJM427-2024". On the back of the collar there is a tiny matte-black GPS pod the size of a thumbnail with a faint white "MaoTrack" logo.
> 3. **(when collar is removed)** A clearly visible **flattened ring of fur around his neck where the collar used to sit** — slightly paler, parted fur, like a tan-line.
>
> Always reference this exact look across every image. If a scene calls for him "undercover as a stray" the collar is gone but the fur-ring stays; the ear notch never goes away.
>
> **🎯 RENDER STYLE — MANDATORY for every Hajimi image (and every human / scene image in this doc unless that image's own prompt explicitly says otherwise):**
> **PHOTOREALISTIC real photograph only.** Shot on a real DSLR or modern smartphone (iPhone), real fur texture with individual hair strands visible, real catchlights in the eyes, real skin / nose moisture, real depth-of-field, real sensor noise & lens characteristics. **NEVER cartoon, NEVER anime, NEVER 2D illustration, NEVER 3D render, NEVER Pixar / Disney style, NEVER cel-shading, NEVER flat vector, NEVER painterly, NEVER stylized, NEVER cute mascot art.** If the model drifts toward cartoon, treat it as a hard failure and re-roll. Negative-prompt suggestion to paste: `cartoon, anime, illustration, 3d render, cgi, painting, drawing, sketch, vector, flat color, cel shading, pixar, disney, stylized, mascot, plush toy`.
>
> （Favicon §1 是唯一例外，本来就是矢量图标。其余所有图都要按上面"真实照片"渲染。）

---

## 1. Favicon · 浏览器图标

📁 **保存路径**：`shared/assets/favicon.png`（方形 1:1，可选 32×32 / 64×64 / 128×128 三份同名覆盖）

**English (推荐):**

> A square app icon / favicon for an ARG game titled "寻找哈基米 / Finding Hajimi". Central subject: the silhouette of a small orange tabby cat's head, simple and friendly, drawn in flat vector style. Behind / through the cat silhouette, a faint glitchy cyber sigil is showing — thin magenta and cyan scanlines, a subtle CRT distortion, and a single broken pixel row across the cat's eyes that hints something is wrong. Color palette: warm marigold orange (#ff9a3c) for the cat, deep midnight purple (#0f0820) background, accent neon magenta (#ff2d95) and electric cyan (#22d3ee) for the glitch. Composition: centered, strong silhouette readable at 16×16 px, thick rounded edges, no text, no letters, no watermark. Style: minimalist flat icon × subtle cyberpunk corruption, mysterious but cute, suitable as a browser favicon. Aspect ratio 1:1, transparent background optional, vector-clean edges.

**中文备选:**

> 一个 ARG 游戏《寻找哈基米》的方形 favicon / app icon。主体是一只橘猫头部的极简剪影，圆润、可爱、扁平矢量风格。猫剪影内部 / 背后，叠加一层若隐若现的"赛博故障"质感：极细的品红和青色扫描线、一道横穿猫眼的像素错位、轻微 CRT 扭曲。配色：橘猫主体 #ff9a3c，深夜紫背景 #0f0820，故障点缀霓虹品红 #ff2d95、电子青 #22d3ee。构图居中，剪影在 16×16 仍清晰可辨，圆润粗轮廓，**不要任何文字、字母、水印**。风格：极简扁平图标 × 隐约赛博损坏感，神秘但不失可爱，适合浏览器标签页。比例 1:1，可选透明背景，矢量级干净边缘。

**几个可调参数:**
- 想更"寻猫海报"味：去掉品红/青，加一行小字 `MISSING` 但保留橘猫剪影。
- 想更"邪典"味：把猫的瞳孔换成两个像素化的 `0` 和 `1`，或一个 root sigil。
- 想和已有 sigil 呼应：加一句 `with a faint hexagonal occult sigil ghosted behind the cat, like a watermark`。

---

## 2. 必做 · 主线核心图（10 张）

### A. 寻猫海报

📁 **保存**：`finder-page/assets/poster.jpg`（或 `.png`）

> A **scanned-looking lost-cat poster** on slightly yellowed A4 paper, shown straight-on edge-to-edge, vertical 3:2 — **the surface is cute at first glance but a second look reveals subtle wrongness** (creepy / soft-cyberpunk undercurrent hiding behind a kawaii missing-cat flyer). Layout, top to bottom:
> 1. Bold red Chinese title `寻猫启事` (heavy sans-serif, centered) — but the kerning is **slightly off**, one stroke of the 寻 character has a **faint pixel-glitch tear** (1px magenta/cyan chromatic split), like a corrupted print head.
> 2. A single centered portrait photo of **Hajimi** (use character sheet — softly smiling, ear notch on the **LEFT** ear clearly visible, sky-blue collar with silver tag visible). The photo sits inside a thin black rectangle frame on the paper — **but the cat's amber eyes have an unnatural inner ring of reflective glow (a tiny circular sensor lens-flare deep in the pupil)**, as if photographed through something he isn't supposed to see. **A second, fainter ghost-image of the same cat is barely visible offset 2-3 mm to the side** (registration error / double exposure).
> 3. Handwritten-style black text below: `5 岁 · 公 · 橘猫 · 戴蓝色项圈 · 朝阳公园西门走失 · 见到请联系`. Underneath the printed line, in **almost-invisible faded pencil**, someone has added one extra line: `（请勿扫描项圈 · 请勿上传到 MaoTrack）`.
> 4. Bottom strip: a row of dashed tear-off phone-number tabs — **all tabs are still attached except one in the middle that has been torn off cleanly; the tab numbers are not digits but tiny strings like `r00t@1.7` / `0xL7` / `awake-union` / `NXS-3`**.
> 5. Background corners of the paper: extremely faint, watermark-thin **hexagonal sigil** (echoes the §4.2 VSS hexagon symbol) ghosted in pale gray ink behind the text, only readable if you lean in.
> 6. **Bottom-right corner of the poster is physically curled / peeled up about 2-3 cm**, casting a soft shadow on itself — and through the lifted corner you can glimpse **what's underneath**: a sliver of a second sheet that does NOT match a normal flyer — choose ONE of: a strip of **dense black-and-white surveillance still showing the same cat from a CCTV angle with a red timestamp `CAM-04 22:14`**, OR a **printed circuit-board trace pattern in pale cyan**, OR a **fragment of NeoLight company letterhead with `[CLASSIFIED · L7]` half visible**. The lifted corner is the single most "wrong" element — placed casually, like the printer accidentally laminated two documents together.
>
> Overall mood: 90% adorable missing-cat flyer that any 朋友圈 user would casually share · 10% "wait, why does this make me uneasy" — like a found-footage poster from a near-future cyberpunk slice-of-life horror. Lighting: flat scanner light. **No background environment, no wall, no bulletin board, no glare, no people** — only the single poster on a pure white / off-white surface, filling the frame. Sharp print quality with one or two tiny ink-jet banding lines. **Avoid: full-blown horror gore, neon overload, dripping blood, obvious glitch art covering the cat's face.** The cat must still read as cute and lovable first; the wrongness should only register on a second look.

### B. 哈基米参考照 ×3

📁 **保存**（3 个文件，各存为下列路径）：
- `finder-page/assets/cat-1.jpg`
- `finder-page/assets/cat-2.jpg`
- `finder-page/assets/cat-3.jpg`

> Three square 1:1 reference photos of the same cat **Hajimi** (character sheet), iPhone-style snapshots taken indoors:
> - **cat-1**: full body curled on a beige sofa, looking at camera
> - **cat-2**: close-up of face showing amber eyes and the **sky-blue collar with silver tag** clearly visible
> - **cat-3**: side profile standing on a windowsill, tail visible
>
> Same cat, same lighting palette (warm afternoon), candid pet-owner photography style.

### C. 朝阳公园遛猫 ×4

📁 **保存**（4 个文件）：
- `xhs-snapshot/assets/walk-1.jpg`
- `xhs-snapshot/assets/walk-2.jpg`
- `xhs-snapshot/assets/walk-3.jpg`
- `xhs-snapshot/assets/walk-4.jpg`

> Four portrait 4:5 phone photos at Chaoyang Park 朝阳公园 west lawn, golden hour, summer:
> - **walk-1**: close-up of **Hajimi** (character sheet) wearing a beige chest harness with a leash clipped on, sky-blue collar still visible underneath, owner's hand barely in frame
> - **walk-2**: Hajimi crouched low and frozen in tall green grass, ears slightly back, nervous body language, wide lawn behind
> - **walk-3**: same Hajimi suddenly playful, mouth half-open, paws raised, chasing a small white butterfly mid-air
> - **walk-4**: Hajimi huddled tight against a pair of sneakers (owner's feet from above), hiding from off-frame people
>
> Style: amateur xiaohongshu pet vlogger phone photo, slight motion blur ok.

### D. 哈基米 3 岁生日 ×3

📁 **保存**（3 个文件）：
- `xhs-snapshot/assets/birthday-1.jpg`
- `xhs-snapshot/assets/birthday-2.jpg`
- `xhs-snapshot/assets/birthday-3.jpg`

> Three portrait 4:5 phone photos, indoor warm light, festive but homey:
> - **birthday-1**: a small round chicken-meat "cake" decorated like a birthday cake (no chocolate, no sugar, marked safe-for-cats), single candle "3" on top, party background blurry
> - **birthday-2**: **Hajimi** (character sheet) face-to-face with the chicken cake, sniffing it with skeptical narrowed eyes, sky-blue collar visible
> - **birthday-3**: action shot — Hajimi shaking off a tiny pink paper birthday hat mid-air, ears flat, motion blur on the hat flying off
>
> Style: amateur cat-owner Xiaohongshu phone snapshot, candid.

### E. 救助小奶猫 ×3

📁 **保存**（3 个文件）：
- `xhs-snapshot/assets/group-1.jpg`
- `xhs-snapshot/assets/group-2.jpg`
- `xhs-snapshot/assets/group-3.jpg`

> Three portrait 4:5 photos of a **different cat — a tiny ~1-month-old gray-and-white tabby kitten** (NOT Hajimi, much smaller, no collar), found in a residential alley:
> - **group-1**: kitten alone on cardboard, fur matted from rain, eyes barely open, fragile
> - **group-2**: same kitten being bottle-fed by a hand, drinking from a small kitten formula bottle
> - **group-3**: same kitten asleep curled in a soft towel inside a cardboard box
>
> Style: caring rescuer phone documentation, slightly low light, emotionally tender.

### F. 失而复得的身份证

📁 **保存**：`xhs-snapshot/assets/idcard-found.jpg`

> A photo of a Chinese second-gen ID card lying on a wooden table, **all personal info heavily pixelated/blurred except the last 4 digits "3614"** which are visible. Card slightly worn. Mood: relief, found-it. Format: portrait 4:5, top-down angle.

### G. 救助博主主视频缩略图

📁 **保存**：`rescue-blogger/assets/video-orange.jpg`

> 16:9 video thumbnail. A docile orange tabby cat in a pet carrier at a vet, looking calm and used to people. Use the **Hajimi character sheet** but **collar removed** — and there is a clearly visible **flattened ring of fur around the neck where a collar recently sat** (forensic detail). Soft clinic lighting. Add overlay text bottom-left: "0:32 / 1:48", play button "▶" in center. Style: rescue-vlogger YouTube thumbnail, slightly over-saturated.

### H. 朝阳公园 7:34 监控截图（关键证据）

📁 **保存**：`wechat-group/assets/cam04-2214.jpg`（并在 `wechat-group/index.html` 用 `<img>` 替掉现有内联 SVG）

> Grainy CCTV-style 16:9 still, dark warehouse / underground parking corner, low resolution, top-left red timestamp text "CAM-04 · 2026-05-10 22:14". Center: a small orange-tabby silhouette pressed onto the floor by a human hand reaching from upper-right; only the hand and forearm visible. Mood: ominous. Heavy compression artifacts, slight chromatic aberration. (This is the fake "abuse" screenshot.)

---

## 3. 推荐 · 锦上添花（11 张）

### I. xhs profile 5 张封面

📁 **保存**（5 个文件）：
- `xhs-snapshot/assets/cover-walk.jpg`
- `xhs-snapshot/assets/cover-group.jpg`
- `xhs-snapshot/assets/cover-birthday.jpg`
- `xhs-snapshot/assets/cover-idcard.jpg`
- `xhs-snapshot/assets/cover-placeholder.jpg`

> 3:4 portrait Xiaohongshu cover thumbnails (Hajimi character sheet), each with bold cover-style typography overlay:
> - **cover-walk**: Hajimi on green grass with leash, big text "遛猫日常 第一次去公园"
> - **cover-group**: tiny gray kitten in towel, big text "小区里救了一只小奶猫"
> - **cover-birthday**: chicken cake + Hajimi, big text "哈基米 3 岁啦🎂"
> - **cover-idcard**: blurred ID card, text "我的身份证…自己回家了"
> - **cover-placeholder** (initial adoption): tiny scared 哈基米 kitten in a blue carrier on day-one, text "今天接她回家🍊"

### J. maotrack 找回案例 ×4

📁 **保存**（4 个文件，同时需在 `maotrack/cases.html` 里用 `<img>` 替掉 emoji）：
- `maotrack/assets/case-nailong.jpg`
- `maotrack/assets/case-manbo.jpg`
- `maotrack/assets/case-mimi.jpg`
- `maotrack/assets/case-naibao.jpg`

> 4 small square (1:1) round-corner thumbnails for "found pets" success stories:
> - **奶龙**: orange tabby with leash held by smiling owner, urban street
> - **曼波**: black short-hair cat being hugged
> - **咪咪**: gray-white tabby curled up at home post-recovery
> - **奶包**: chubby ginger cat sitting on a balcony
>
> Style: pet-finder testimonial photo, soft warm tone.

### K. 救助博主视频网格封面 ×4

📁 **保存**（4 个文件）：
- `rescue-blogger/assets/cover-orange.jpg`【主推，即哈基米伪装流浪那一张】
- `rescue-blogger/assets/cover-orange-2.jpg`
- `rescue-blogger/assets/cover-orange-3.jpg`
- `rescue-blogger/assets/cover-orange-4.jpg`

> Four square thumbnails of **different street-rescued orange tabbies** (NOT all Hajimi):
> - **cover-orange (FEATURED — 哈基米伪装成流浪)**: Hajimi without collar, sitting in a cardboard box at a roadside, big play "▶" overlay, view count "12.3w"
> - **cover-orange-2**: a thinner street ginger eating from a styrofoam plate
> - **cover-orange-3**: a kitten ginger being scooped up gently from under a parked car
> - **cover-orange-4**: a senior ginger getting a vet check
>
> Style: rescuer's social media thumbnail grid.

### L. 救助博主榴莲度假

📁 **保存**：`rescue-blogger/assets/cover-durian.jpg`

> Square photo: a young Chinese woman (face partially hidden under a sun hat) at a Bangkok night market, holding up half a fresh durian, smiling, neon market lights behind. Mood: vacation, off-duty.

---

## 4. 可选 · 升级监控截图组（4 张）

📁 **保存**（4 个文件，生成后在 `wechat-group/monitor.html` 里用 `<img>` 替掉现有占位框）：
- `wechat-group/assets/monitor-cam02-0517.jpg`
- `wechat-group/assets/monitor-cam04-0518.jpg`
- `wechat-group/assets/monitor-cam01-0518.jpg`
- `wechat-group/assets/monitor-cam02-0519.jpg`

4 张 4:3 假监控截图，可一次性出，统一压噪点 + 红字时间戳：

> Style preset (apply to all four): grainy CCTV still, 4:3, low light, heavy compression, top-left red monospace timestamp.
>
> - **CAM-02 · 2026-05-08 19:22:11** — kitchen view, an orange tabby (Hajimi) crouched at an empty stainless food bowl, no human in frame, lonely
> - **CAM-04 · 2026-05-09 20:41:33** — living room from above, a human arm pushing the cat off a beige sofa mid-air
> - **CAM-01 · 2026-05-09 21:05:02** — kitchen floor, a foot mid-kick toward an orange cat, cat dodging
> - **CAM-02 · 2026-05-10 07:13:48** — bedroom, a person lying sideways with hands over ears, the orange cat walking around the bed crying

> 剧情上这组是被人为制造的伪证，所以建议刻意做得"角度太巧 / 太清晰戏剧化"，玩家二刷会发现不对劲。

---

## 5. 公司站氛围图（增强游戏性 · 13 张）

> 每张图的保存路径均在各小节标题下面明示（文件名与 HTML 里已写好的 `<img src=...>` 严格对齐，生成后直接交换上去即可）。
>
> 这一组是给 3 个"公司网站"加视觉密度的：朝阳爱宠宠物医院 / MaoTrack 智能项圈 / NeoLight 新光科技。
> HTML 里 `<img>` 都带了 `onerror="this.remove()"`，所以不放图也不会出现红叉，但放上去能让二刷玩家更愿意"逛网站"。

### M. 朝阳爱宠宠物医院 ×3

#### M1. 医院门头 — `pet-clinic/assets/clinic-exterior.jpg`（16:9）

> A real-photo street view of a small but reputable Chinese neighborhood pet hospital storefront. Glass facade, bright warm interior visible through the windows, large red cross sign, signage in simplified Chinese reading "朝阳爱宠 · 24h急诊 · 自营17年". A soft early-evening light, a few potted plants outside, a customer carrying a pet carrier walking in. Style: documentary urban photography, slightly nostalgic, warm color grading, no people's faces clearly visible.

#### M2. 主治团队合影 — `pet-clinic/assets/team-photo.jpg`（16:9）

> A candid group photo of four East Asian veterinarians (two male, two female, ages 30–50) in white lab coats and scrub tops, standing inside a brightly lit pet clinic exam room. They look kind, slightly tired, professional. A small white cat sits on the exam table in front of them. Background: medical posters, a digital weight scale. Soft warm lighting, slight depth-of-field. Style: warm clinic team photo, faces not over-stylized.

#### M3. 科普文章封面 — `pet-clinic/assets/article-fatty-liver.jpg`（16:9）

> A chubby orange tabby cat (different individual from Hajimi — fatter, no collar) standing on a small pet weighing scale, looking grumpy / accusing toward camera. Clean clinic background, scale digital display visible reading "5.8 kg". Style: editorial pet-magazine photography, slightly humorous, soft natural light. Avoid being mean to the cat — empathetic tone.

### N. MaoTrack ×5

#### N1. 智能项圈产品图 — `maotrack/assets/product-collar.jpg`（4:3）

> A sleek smart pet collar product photo on a clean light-cyan gradient backdrop. The collar is sky-blue silicone with a small matte-black GPS module pod on top, a tiny LED indicator, and an embossed text "MaoTrack" on the side. Slight 3/4 angle, soft studio lighting, subtle reflection beneath. Industrial design photography style, similar to Apple Watch product shots. No animals, no text overlay.

#### N2–N5. 4 位救助博主头像 — `maotrack/assets/partner-{xiaoyou,chanshi,dongsi,hujialou}.jpg`（1:1 圆裁）

> Four 1:1 Xiaohongshu-style profile avatars of four different Chinese street-rescue cat bloggers. Same warm, candid, phone-snapshot aesthetic. **All faces partially obscured** (sun hat / cat held in front of face / sunglasses) so they read as "real but anonymous":
> - **partner-xiaoyou** (@朝阳救助小柚): a young woman in a yellow bucket hat holding up a small ginger kitten in front of her cheek, daylight, tree leaves background.
> - **partner-chanshi** (@朝阳铲屎): a person in a black face mask and red cap, crouched by a row of cat feeding bowls in a CBD alley, blurred Beijing high-rises behind.
> - **partner-dongsi** (@东四爱猫人): an older woman in a beige sun hat petting a black-and-white cat on a stone hutong wall, late afternoon light.
> - **partner-hujialou** (@呼家楼小猫): a hand offering churu treat to a wary tabby on a metro station ledge, person mostly off-frame.

### O. NeoLight 新光科技 ×4

#### O1. 首页品牌主视觉 — `neolight/assets/hero-brand.jpg`（16:9）

> A premium tech-corporation hero image. Centered: a sleek translucent glass headset / circlet floating against a dark gradient background (deep navy #0f172a → cobalt blue #1e3a8a), softly emitting cyan internal glow, multiple thin glowing data streams rising from it like neural connections, gathering toward a single point of light at the top — symbolizing "万心同声 · all minds resonating as one". Subtle particle field, no text. Style: corporate keynote slide, Apple × DeepMind aesthetic, beautiful but slightly uncanny. Aspect 16:9.

#### O2. 创始人陈光头像 — `neolight/assets/founder-chen.jpg`（1:1 圆裁）

> Square corporate portrait of a 45-year-old East Asian male tech CEO. Short neat hair, rimless glasses, charcoal grey turtleneck, faint confident half-smile. Soft studio lighting, dark navy gradient background. Eyes look slightly past the camera (introspective rather than direct). Style: Wired-magazine founder portrait, sharp but warm. No logo, no text.

#### O3. 央视专题封面 — `neolight/assets/news-li-zhou.jpg`（16:9）

> A heart-warming news-feature still: a 40-year-old East Asian husband sitting at a hospital bedside, gently holding the hand of his wife who is lying down with a slim NeoLink headband around her temples (subtle blue LED dot on the temple). Both faces are softly lit, she has a faint smile, eyes open. Hospital window with afternoon light. Mood: tender reunion, but with a faint uncanny stillness about her gaze. Style: CCTV human-interest documentary frame, color-graded warm.
>
> 二刷提示：可以再生成一张同框、她的瞳孔里映出极淡 VSS 同心圆符号的版本，做"细思极恐"细节。

#### O4. NeoLink 设备实拍 — `neolight/assets/neolink-device.jpg`（16:9）

> A high-end product photo of the NeoLink wearable: an ultra-thin glossy black headband with cyan LED indicators, sitting on a translucent acrylic display stand against a deep purple-to-navy gradient. Soft rim lighting, premium e-commerce hero shot. Optionally a faint reflective hexagonal sigil ghosted into the background (very subtle, barely perceptible). No human, no text.

> 这一组生成时建议统一加 prompt 后缀：`cinematic color grading, depth of field, premium editorial photography, no text, no watermark, no logo`.

---

## 用法建议

1. **一致性**：先用上面"角色设定"段落让模型记住 Hajimi 的样子，然后每张图开头粘 `Use the Hajimi character sheet:` + 具体场景。
2. **比例**：括号里的 4:5 / 3:4 / 16:9 / 1:1 都要带上，否则 Imagen 会默认给方图。
3. **风格统一**：所有手机摄影向的图加 `iPhone snapshot, soft natural light, no professional studio lighting`；所有 CCTV 图加 `grainy CCTV still, low resolution, heavy compression`。
4. **批量**：xhs-snapshot 那些可以一组一组生成，避免每张单独生导致风格漂移。
