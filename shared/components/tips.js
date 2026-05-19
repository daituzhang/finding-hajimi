/**
 * 右上角 "?" 提示按钮 + 卡片式 slide 弹层。
 *
 * 用法：
 *   <script type="module">
 *     import { mountTips } from '../shared/components/tips.js';
 *     mountTips({
 *       tips: [
 *         '可以翻阅失主的笔记寻找线索',
 *         '也许评论里会有线索',
 *       ],
 *     });
 *   </script>
 *
 * 行为：
 *  - 点击 "?" 展开 popup
 *  - 多条 tip 时显示 "下一条" 按钮，必须手动一条一条往后翻才能看到后面的提示
 *    （已读条数会用 sessionStorage 记忆，关掉弹层再开还在原位）
 *  - 再点 "?" 或点击外部 / Esc 关闭
 */

const SHARED_CSS_HREF = new URL('../styles/shared.css', import.meta.url).href;

function ensureSharedCss() {
  if (document.querySelector(`link[href="${SHARED_CSS_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = SHARED_CSS_HREF;
  document.head.appendChild(link);
}

export function mountTips({ tips } = {}) {
  if (!Array.isArray(tips) || tips.length === 0) return null;
  ensureSharedCss();

  const storageKey = `arg-tips-idx::${location.pathname}`;
  let currentIdx = (() => {
    try {
      const v = parseInt(sessionStorage.getItem(storageKey) || '0', 10);
      return Number.isFinite(v) ? Math.min(Math.max(v, 0), tips.length - 1) : 0;
    } catch {
      return 0;
    }
  })();

  // 容器
  const wrap = document.createElement('div');
  wrap.className = 'arg-tips';

  // 按钮
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'arg-tips-btn';
  btn.setAttribute('aria-label', '提示');
  btn.textContent = '?';

  // 弹层
  const panel = document.createElement('div');
  panel.className = 'arg-tips-panel';
  if (tips.length === 1) panel.classList.add('single');
  panel.hidden = true;
  panel.innerHTML = `
    <div class="arg-tips-head">
      <span class="arg-tips-title">💡 提示</span>
      <span class="arg-tips-count"></span>
    </div>
    <div class="arg-tips-body"></div>
    <div class="arg-tips-foot">
      <button type="button" class="arg-tips-prev" aria-label="上一条">‹</button>
      <div class="arg-tips-dots"></div>
      <button type="button" class="arg-tips-next" aria-label="下一条">下一条 ›</button>
    </div>
  `;

  const bodyEl = panel.querySelector('.arg-tips-body');
  const countEl = panel.querySelector('.arg-tips-count');
  const prevBtn = panel.querySelector('.arg-tips-prev');
  const nextBtn = panel.querySelector('.arg-tips-next');
  const dotsEl = panel.querySelector('.arg-tips-dots');

  function render() {
    bodyEl.textContent = tips[currentIdx];
    countEl.textContent = `${currentIdx + 1} / ${tips.length}`;
    prevBtn.disabled = currentIdx === 0;
    if (currentIdx >= tips.length - 1) {
      nextBtn.disabled = true;
      nextBtn.textContent = '没有更多了';
    } else {
      nextBtn.disabled = false;
      nextBtn.textContent = '下一条 ›';
    }
    // dots
    dotsEl.innerHTML = '';
    for (let i = 0; i < tips.length; i++) {
      const d = document.createElement('span');
      d.className = 'arg-tips-dot' + (i === currentIdx ? ' active' : '') + (i > currentIdx ? ' locked' : '');
      dotsEl.appendChild(d);
    }
    try {
      sessionStorage.setItem(storageKey, String(currentIdx));
    } catch { /* ignore */ }
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIdx > 0) {
      currentIdx -= 1;
      render();
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIdx < tips.length - 1) {
      currentIdx += 1;
      render();
    }
  });

  let open = false;
  function setOpen(v) {
    open = v;
    panel.hidden = !v;
    btn.classList.toggle('open', v);
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!open);
    if (open) render();
  });

  document.addEventListener('click', (e) => {
    if (!open) return;
    if (wrap.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowRight' && currentIdx < tips.length - 1) { currentIdx++; render(); }
    else if (e.key === 'ArrowLeft' && currentIdx > 0) { currentIdx--; render(); }
  });

  wrap.appendChild(btn);
  wrap.appendChild(panel);

  if (document.body) {
    document.body.appendChild(wrap);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(wrap));
  }

  render();
  return wrap;
}
