/**
 * 页码 + 关键词 + extra/tool 标记的统一页脚组件。
 *
 * 用法（在每个页面 HTML 顶部加一段 script）：
 *
 *   <script type="module">
 *     import { mountFooter } from '../../shared/components/page-footer.js';
 *     mountFooter({
 *       page: 1,           // 数字。L1 为 1-14，L2 为 15-40
 *       total: 14,         // L1 用 14；L2 用 '??'；终页用 40
 *       keywords: ['哈基米', '朝阳寻猫'], // 可选
 *       extra: false,      // 红鲱鱼/彩蛋页设 true
 *       tool: false,       // 搜索工具页设 true
 *     });
 *   </script>
 *
 * 视觉：右下角固定灰字。被污染状态（body[data-nexus]）下变血红。
 *
 * 注意：L1 任何页面不应传入会暴露 L2 存在的 total（必须 14）。
 */

const SHARED_CSS_HREF = new URL('../styles/shared.css', import.meta.url).href;

const BAIDU_SITE_ID = 'e9e49227a9c6edd1242dfb661beb8d06';

function isLocalHost() {
  const h = location.hostname;
  return h === 'localhost' || h === '127.0.0.1' || h === '' || h.endsWith('.local');
}

function getAnonId() {
  try {
    let id = localStorage.getItem('arg.anon_id');
    if (!id) {
      const raw = (crypto && crypto.randomUUID) ? crypto.randomUUID() : (String(Date.now()) + Math.random());
      id = raw.replace(/-/g, '').slice(0, 8);
      localStorage.setItem('arg.anon_id', id);
    }
    return id;
  } catch (_) {
    return 'na';
  }
}

let analyticsInjected = false;
function injectAnalytics() {
  if (analyticsInjected) return;
  analyticsInjected = true;
  if (isLocalHost()) return; // 不污染开发数据
  window._hmt = window._hmt || [];
  try { window._hmt.push(['_setCustomVar', 1, 'anon_id', getAnonId(), 1]); } catch (_) {}
  const hm = document.createElement('script');
  hm.async = true;
  hm.src = 'https://hm.baidu.com/hm.js?' + BAIDU_SITE_ID;
  const s = document.getElementsByTagName('script')[0];
  if (s && s.parentNode) s.parentNode.insertBefore(hm, s);
  else document.head.appendChild(hm);
}

function trackEvent(category, action, label) {
  if (isLocalHost()) return;
  try {
    window._hmt = window._hmt || [];
    const lbl = label === undefined || label === null ? '' : String(label).slice(0, 60);
    window._hmt.push(['_trackEvent', String(category), String(action), lbl]);
  } catch (_) {}
}
// 暴露给 search-engine / shell-online 等无法 import 此模块的代码
try { window.__argTrack = trackEvent; } catch (_) {}

function reportReach({ page, extra, tool }) {
  if (typeof extra === 'number') {
    trackEvent('reach', 'extra', String(extra).padStart(2, '0'));
  } else if (tool) {
    trackEvent('reach', 'tool', location.pathname);
  } else if (typeof page === 'number') {
    trackEvent('reach', 'main', String(page).padStart(2, '0'));
  }
}

function reportFinishOnce() {
  const path = location.pathname;
  let label = null;
  if (/\/finale\/(index\.html?)?$/.test(path)) label = 'L1';
  else if (/\/finale-l2\/awake\.html?$/.test(path)) label = 'L2-A';
  else if (/\/finale-l2\/sync\.html?$/.test(path)) label = 'L2-B';
  if (!label) return;
  try {
    if (sessionStorage.getItem('arg.finish_reported') === label) return;
    sessionStorage.setItem('arg.finish_reported', label);
  } catch (_) {}
  trackEvent('finish', label, getAnonId());
}

function ensureSharedCss() {
  if (document.querySelector(`link[href="${SHARED_CSS_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = SHARED_CSS_HREF;
  document.head.appendChild(link);
}

export function mountFooter({ page, total, keywords, extra = false, tool = false } = {}) {
  ensureSharedCss();
  injectAnalytics();
  reportReach({ page, extra, tool });
  reportFinishOnce();

  // 全站挂载"选中文字 → 复制 / 在 find.cn 搜索"气泡（find.cn 自身会自动跳过）
  import('./selection-popup.js').then(m => m.mountSelectionPopup()).catch(() => {});

  const footer = document.createElement('div');
  footer.className = 'arg-footer';
  if (extra) footer.classList.add('extra');
  if (tool) footer.classList.add('tool');

  const pageEl = document.createElement('div');
  pageEl.className = 'page-number';
  if (extra) {
    if (typeof extra === 'number') {
      pageEl.textContent = `extra-${String(extra).padStart(2, '0')}`;
    } else {
      pageEl.textContent = 'extra';
    }
  } else if (tool) {
    pageEl.textContent = 'search · tool';
  } else {
    const totalStr = total === undefined || total === null ? '??' : String(total);
    const pageStr = String(page).padStart(2, '0');
    pageEl.textContent = `${pageStr} / ${totalStr}`;
  }
  footer.appendChild(pageEl);

  if (keywords && keywords.length && !extra) {
    const kw = document.createElement('div');
    kw.className = 'keyword';
    kw.textContent = `关键词: ${keywords.join(' / ')}`;
    footer.appendChild(kw);
  }

  // 等 DOM ready 再挂
  if (document.body) {
    document.body.appendChild(footer);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(footer));
  }

  return footer;
}
