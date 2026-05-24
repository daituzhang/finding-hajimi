/**
 * VSS 视觉催眠符号 —— 觉醒 / 收集 / 进度共享模块
 *
 * 剧情：
 *   L1 阶段 5 个 VSS 散落在嵌入页里，默认完全隐身（普通装饰）。
 *   玩家走到 42 页（neolight/portal-search.html）读到企划书，
 *   被 root 注入的浏览器嗅探器激活 → 此后所有页面的 VSS 自动觉醒。
 *
 * API：
 *   awaken()                 - 42 页加载时调用，标记觉醒
 *   isAwakened()             - 查询是否已觉醒
 *   getSigils()              - 已收集列表 ['square', ...]
 *   addSigil(id)             - 手动加一个
 *   mountSigilCollect(sel,id) - 嵌入页给指定 svg 绑定觉醒高亮 + 点击收集
 */

const KEY_SIGILS = 'vss.sigils';
const KEY_AWAKEN = 'vss.awakened';

export function awaken() {
  try { localStorage.setItem(KEY_AWAKEN, '1'); } catch (_) {}
}

export function isAwakened() {
  try { return localStorage.getItem(KEY_AWAKEN) === '1'; } catch (_) { return false; }
}

export function getSigils() {
  try { return JSON.parse(localStorage.getItem(KEY_SIGILS) || '[]'); } catch (_) { return []; }
}

export function addSigil(id) {
  const set = new Set(getSigils());
  set.add(id);
  try { localStorage.setItem(KEY_SIGILS, JSON.stringify([...set])); } catch (_) {}
}

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const s = document.createElement('style');
  s.textContent = `
    .vss-awakened {
      cursor: pointer !important;
      animation: vss-pulse 1.8s ease-in-out infinite;
      filter: drop-shadow(0 0 8px #fbbf24) drop-shadow(0 0 16px #f59e0b88);
      transition: transform 0.2s, filter 0.2s;
      outline: 2px solid #fbbf2466;
      outline-offset: 2px;
    }
    .vss-awakened:hover {
      transform: scale(1.06);
      filter: drop-shadow(0 0 12px #fde047) drop-shadow(0 0 24px #fbbf24);
    }
    .vss-collected {
      animation: none !important;
      filter: grayscale(0.7) brightness(0.7) !important;
      cursor: default !important;
      outline: 2px solid #34d39966 !important;
    }
    .vss-collected::after {
      content: '✓';
      position: absolute; top: -8px; right: -8px;
      width: 20px; height: 20px; border-radius: 50%;
      background: #34d399; color: #052e1a;
      font-size: 13px; font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 8px #34d399;
      pointer-events: none;
    }
    @keyframes vss-pulse {
      0%, 100% { filter: drop-shadow(0 0 6px #fbbf24) drop-shadow(0 0 12px #f59e0b88); }
      50%      { filter: drop-shadow(0 0 14px #fde047) drop-shadow(0 0 28px #fbbf24); }
    }
    .vss-toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px);
      background: #1a0e2e; color: #fbbf24;
      border: 1px solid #fbbf24;
      padding: 10px 18px; border-radius: 4px;
      font: 600 13px/1.6 ui-monospace, monospace;
      letter-spacing: 1px;
      box-shadow: 0 0 20px #fbbf2455;
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s, transform 0.3s;
      z-index: 99998;
    }
    .vss-toast.show {
      opacity: 1; transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(s);
}

function showToast(msg) {
  injectStyles();
  let t = document.querySelector('.vss-toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'vss-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(t._hide);
  t._hide = setTimeout(() => t.classList.remove('show'), 2400);
}

/**
 * @param {string} selector  - 嵌入页里 VSS img 的 CSS 选择器
 * @param {string} sigilId   - 'square' | 'pentagon' | 'hexagon' | 'octagon' | 'ring'
 */
export function mountSigilCollect(selector, sigilId) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) return;
  if (!isAwakened()) return;  // L1 阶段完全隐身

  injectStyles();

  // 让父容器能定位 ::after 角标
  const parent = el.parentElement;
  if (parent && getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }

  el.classList.add('vss-awakened');
  if (getSigils().includes(sigilId)) {
    el.classList.add('vss-collected');
  }
  el.title = '⚠ 检测到 VSS · 点击采集为样本';

  el.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (el.classList.contains('vss-collected')) {
      showToast(`VSS-${sigilId} 已存档`);
      return;
    }
    addSigil(sigilId);
    el.classList.add('vss-collected');
    const n = getSigils().length;
    if (n >= 5) {
      showToast(`✓ ${sigilId} · 5/5 采集完成 · 回到企划书底部`);
    } else {
      showToast(`✓ ${sigilId} 已采集 · ${n}/5`);
    }
  });
}

/**
 * 自动扫描页内所有 [data-vss="..."] 元素并挂载收集。
 * 嵌入页只需在 <img> 上加 data-vss="square" 之类，再 import + 调用本函数即可。
 */
export function mountAllSigils() {
  if (!isAwakened()) return;
  document.querySelectorAll('[data-vss]').forEach(el => {
    const id = el.getAttribute('data-vss');
    if (id) mountSigilCollect(el, id);
  });
}
