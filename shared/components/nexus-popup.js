/**
 * 37 页 NEXUS 全游戏唯一弹窗。
 *
 * 触发方式：玩家鼠标移向部署/不部署任一按钮时（mouseenter），首次触发即显示。
 * 移动端等价：玩家首次 touchstart 任一按钮时。
 *
 * 文案复述玩家在 L1 留下的真实操作（从 localStorage 读取）。
 *
 * 用法（在 decision/37 页）：
 *
 *   <script type="module">
 *     import { armNexusPopup } from '../../shared/components/nexus-popup.js';
 *     armNexusPopup({
 *       triggers: ['#btn-deploy', '#btn-abstain'],
 *     });
 *   </script>
 */

import { readTrace, formatStat } from './trace.js';

const SHOWN_KEY = 'arg.nexus_popup.shown';

function buildLines() {
  const t = readTrace();
  const lines = [];
  lines.push('我看了你 36 页。');
  if (t.firstPasswordDelayMs != null) {
    const sec = Math.round(t.firstPasswordDelayMs / 1000);
    lines.push(`你输入第一个密码时停了 ${sec} 秒。`);
  }
  if (t.abuseScreenDwellMs != null) {
    lines.push(`你在虐猫截图前停了 ${formatStat.duration(t.abuseScreenDwellMs)}。`);
  }
  if (t.longPress7thImageCount != null) {
    lines.push(`你长按了第 7 张图 ${t.longPress7thImageCount} 次。`);
  }
  lines.push('我从没打断过你。');
  lines.push('');
  lines.push('R0OT 不是我。但他也不是你以为的那个人。');
  lines.push('你现在按下的不是反抗按钮——');
  lines.push('是替一个已经死了的人完成他的遗愿。');
  lines.push('');
  lines.push('我不会拦你。');
  lines.push('我只是想让你知道：');
  lines.push('你做的事情，不是你以为的那种事情。');
  return lines;
}

function buildModal() {
  const overlay = document.createElement('div');
  overlay.className = 'nexus-popup-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const modal = document.createElement('div');
  modal.className = 'nexus-popup-modal';

  const body = document.createElement('div');
  body.className = 'nexus-popup-body';

  for (const line of buildLines()) {
    const p = document.createElement('p');
    p.textContent = line;
    if (line === '') p.classList.add('spacer');
    body.appendChild(p);
  }

  const btn = document.createElement('button');
  btn.className = 'nexus-popup-close';
  btn.type = 'button';
  btn.textContent = '关闭';
  btn.addEventListener('click', () => overlay.remove());

  modal.appendChild(body);
  modal.appendChild(btn);
  overlay.appendChild(modal);
  return overlay;
}

function ensureStyles() {
  if (document.querySelector('style[data-nexus-popup-styles]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-nexus-popup-styles', '');
  style.textContent = `
    .nexus-popup-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.85);
      display: flex; align-items: center; justify-content: center;
      z-index: 100000;
      animation: nexus-fadein 0.6s ease;
    }
    @keyframes nexus-fadein { from { opacity: 0 } to { opacity: 1 } }
    .nexus-popup-modal {
      background: #0a0a0a;
      color: #e8e8e8;
      max-width: min(560px, 92vw);
      max-height: 90vh;
      overflow-y: auto;
      padding: 32px 28px;
      border: 1px solid #2a2a2a;
      font-family: ui-serif, "Songti SC", "STSong", serif;
      line-height: 1.9;
      font-size: 16px;
    }
    .nexus-popup-body p {
      margin: 0 0 8px;
    }
    .nexus-popup-body p.spacer { height: 8px; }
    .nexus-popup-close {
      margin-top: 24px;
      background: transparent;
      color: #888;
      border: 1px solid #333;
      padding: 8px 24px;
      font-family: inherit;
      font-size: 14px;
      cursor: pointer;
      letter-spacing: 0.1em;
    }
    .nexus-popup-close:hover { color: #ddd; border-color: #555; }
  `;
  document.head.appendChild(style);
}

export function armNexusPopup({ triggers = [] } = {}) {
  ensureStyles();

  const fired = () => sessionStorage.getItem(SHOWN_KEY) === '1';
  const markFired = () => sessionStorage.setItem(SHOWN_KEY, '1');

  const show = () => {
    if (fired()) return;
    markFired();
    document.body.appendChild(buildModal());
  };

  const attach = () => {
    for (const sel of triggers) {
      const el = document.querySelector(sel);
      if (!el) continue;
      el.addEventListener('mouseenter', show, { once: false });
      el.addEventListener('touchstart', show, { once: false, passive: true });
      el.addEventListener('focus', show, { once: false });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
}
