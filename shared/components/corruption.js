/**
 * L1 污染机制：当 URL 带 ?nexus=N 时，L1 页面进入"被 AI 改写"的状态。
 *
 * 阶段（N）：
 *   1 — 段落 1（玩家自己撞破陷阱后的第一次重访）
 *   2 — 段落 2（5 个怀疑点核对阶段，更多细节暴露）
 *   3 — 段落 3 及之后（深度污染：替换文本、替换图片）
 *
 * 用法（在 L1 各页面）：
 *
 *   <script type="module">
 *     import { applyCorruption } from '../../shared/components/corruption.js';
 *     applyCorruption({
 *       page: 13,
 *       // 每阶段可替换的内容（key = data-corrupt-id，value = 替换文本/HTML）
 *       textReplacements: {
 *         1: { 'main-caption': '它没丢，它只是去度假了。' },          // 原文
 *         2: { 'main-caption': '它没丢，它只是去度假了。' },
 *         3: { 'main-caption': '你没丢，你只是去度假了。' },
 *       },
 *       // 图片替换（key = data-corrupt-img-id，value = 替换 src）
 *       imageReplacements: {
 *         3: { 'video-call-frame': '/assets/corrupted/video-call-same-face.png' },
 *       },
 *       // 整段元素隐藏（key = data-corrupt-id）
 *       hiddenAtStage: {
 *         3: ['comment-section'],
 *       },
 *     });
 *   </script>
 *
 * 同时设置 document.body 的 data-nexus 属性，shared.css 中页脚会自动变血红。
 */

function getNexusStage() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('nexus');
  if (!raw) return 0;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1) return 0;
  return n;
}

export function applyCorruption({ textReplacements = {}, imageReplacements = {}, hiddenAtStage = {} } = {}) {
  const stage = getNexusStage();
  if (stage === 0) return { stage: 0 };

  // 标记 body，让 CSS 钩子生效
  if (document.body) {
    document.body.setAttribute('data-nexus', String(stage));
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.setAttribute('data-nexus', String(stage));
    });
  }

  const applyAll = () => {
    // 文本替换
    const tr = textReplacements[stage] || {};
    for (const [id, val] of Object.entries(tr)) {
      const el = document.querySelector(`[data-corrupt-id="${CSS.escape(id)}"]`);
      if (el) el.textContent = val;
    }

    // 图片替换
    const ir = imageReplacements[stage] || {};
    for (const [id, src] of Object.entries(ir)) {
      const el = document.querySelector(`[data-corrupt-img-id="${CSS.escape(id)}"]`);
      if (el) el.setAttribute('src', src);
    }

    // 隐藏
    const hidden = hiddenAtStage[stage] || [];
    for (const id of hidden) {
      const el = document.querySelector(`[data-corrupt-id="${CSS.escape(id)}"]`);
      if (el) el.style.display = 'none';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAll);
  } else {
    applyAll();
  }

  return { stage };
}

export { getNexusStage };
