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

function ensureSharedCss() {
  if (document.querySelector(`link[href="${SHARED_CSS_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = SHARED_CSS_HREF;
  document.head.appendChild(link);
}

export function mountFooter({ page, total, keywords, extra = false, tool = false } = {}) {
  ensureSharedCss();

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
