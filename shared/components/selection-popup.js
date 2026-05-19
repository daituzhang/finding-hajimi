/**
 * 选中文字气泡：复制 / 在 find.cn 中搜索。
 * 自动通过 page-footer.js 在非 find.cn 页面挂载。
 */

const FIND_URL = (q) => {
  // find.cn 在仓库根目录
  const here = location.pathname;
  // 推算根：移除 末尾文件 + 一层目录（每个页面都在子目录里）
  const segs = here.split('/').filter(Boolean);
  // 去掉最后一段（文件）
  if (segs.length) segs.pop();
  // 去掉所在目录
  if (segs.length) segs.pop();
  const base = '/' + (segs.length ? segs.join('/') + '/' : '');
  return base + 'find-cn/?q=' + encodeURIComponent(q);
};

const ID = 'arg-selection-popup';
let popup;

function ensurePopup() {
  if (popup) return popup;
  popup = document.createElement('div');
  popup.id = ID;
  popup.style.cssText = `
    position: fixed; z-index: 99999; display: none;
    background: #1f2937; color: #fff; border-radius: 6px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.35);
    font: 12px/1.4 -apple-system, "PingFang SC", sans-serif;
    padding: 0; overflow: hidden;
    transform: translate(-50%, -100%); margin-top: -8px;
    user-select: none; -webkit-user-select: none;
  `;
  popup.innerHTML = `
    <button data-act="copy"   style="background:transparent;border:0;border-right:2px solid #6b7280;color:#fff;padding:8px 14px;cursor:pointer;font:inherit;">📋 复制</button>
    <button data-act="search" style="background:transparent;border:0;color:#fbbf24;padding:8px 14px;cursor:pointer;font:inherit;">🔍 在 find.cn 搜索</button>
  `;
  popup.style.display = 'none';
  popup.dataset.flex = '1';
  // 让 display:flex 生效（show 时再设）
  popup.querySelectorAll('button').forEach(b => {
    b.addEventListener('mouseenter', () => { b.style.background = 'rgba(255,255,255,0.12)'; });
    b.addEventListener('mouseleave', () => { b.style.background = 'transparent'; });
  });
  // 防止 mousedown 时清掉选区
  popup.addEventListener('mousedown', e => e.preventDefault());
  popup.addEventListener('click', e => {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const text = (window.getSelection()?.toString() || '').trim();
    if (!text) { hidePopup(); return; }
    if (btn.dataset.act === 'copy') {
      try { navigator.clipboard.writeText(text); } catch {}
      flash(btn, '已复制');
    } else if (btn.dataset.act === 'search') {
      window.open(FIND_URL(text), '_blank', 'noopener');
      hidePopup();
    }
  });
  document.body.appendChild(popup);
  return popup;
}

function flash(btn, txt) {
  const old = btn.textContent;
  btn.textContent = txt;
  setTimeout(() => {
    btn.textContent = old;
    hidePopup();
  }, 700);
}

function hidePopup() {
  if (popup) popup.style.display = 'none';
}

function showPopup() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return hidePopup();
  const text = sel.toString().trim();
  if (text.length < 1 || text.length > 200) return hidePopup();
  const rect = sel.getRangeAt(0).getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) return hidePopup();
  // 排除来自输入框/textarea 的选择（浏览器原生菜单更顺手）
  const ae = document.activeElement;
  if (ae && (ae.tagName === 'TEXTAREA' || ae.tagName === 'INPUT' || ae.isContentEditable)) return hidePopup();
  const p = ensurePopup();
  p.style.left = (rect.left + rect.width / 2) + 'px';
  p.style.top  = (rect.top) + 'px';
  p.style.display = 'flex';
}

export function mountSelectionPopup() {
  // find.cn 自身页面不需要
  if (/\/find-cn\//.test(location.pathname)) return;
  document.addEventListener('mouseup', () => {
    // 等下一拍，确保选区已更新
    setTimeout(showPopup, 0);
  });
  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    if (!sel || !sel.toString().trim()) hidePopup();
  });
  document.addEventListener('mousedown', e => {
    if (popup && popup.contains(e.target)) return;
    // 点击 popup 之外 → 让 selectionchange 自然处理
  });
  window.addEventListener('scroll', hidePopup, true);
  window.addEventListener('blur', hidePopup);
}
