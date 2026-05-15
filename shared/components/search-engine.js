/**
 * 通用搜索引擎逻辑，被 find.cn 和 unfilter.lol 复用。
 *
 * 设计要点：
 * - 所有结果链接默认 target="_blank"（玩家会在多个站点间来回核对）
 * - "最近搜索"：仅当查询命中白名单/敏感词时才保存（避免历史里塞满玩家瞎试的词）
 * - 历史存在搜索引擎自己的 localStorage（同源），不跨站
 *
 * 配置示例参见 sites/find-cn/config.js。
 */

const HISTORY_KEY_PREFIX = 'arg.search_history.';
const HISTORY_MAX = 8;

function normalize(s) {
  // 关键词全部去空格：玩家输入"哈基米 朝阳 近况"或"哈基米朝阳近况"都能命中
  return String(s || '').toLowerCase().replace(/\s+/g, '');
}

function matches(query, entry) {
  const q = normalize(query);
  if (!q) return false;
  for (const kw of entry.keywords) {
    const k = normalize(kw);
    if (entry.fuzzy) {
      if (q.includes(k) || k.includes(q)) return true;
    } else {
      if (q === k) return true;
      const tokens = k.split(' ').filter(Boolean);
      if (tokens.length > 1 && tokens.every(t => q.includes(t))) return true;
    }
  }
  return false;
}

function isSurveilled(query, surveilled) {
  if (!surveilled) return false;
  const q = normalize(query);
  return surveilled.some(kw => {
    const k = normalize(kw);
    return q === k || q.includes(k);
  });
}

export function searchOnce(config, query) {
  const results = [];
  let matchedEntry = null;
  for (const entry of config.entries || []) {
    if (matches(query, entry)) {
      results.push(...entry.results);
      if (!matchedEntry) matchedEntry = entry;
    }
  }
  return { results, entry: matchedEntry };
}

// ===== 最近搜索 =====

function historyKey(engineName) {
  return HISTORY_KEY_PREFIX + (engineName || 'default');
}

function readHistory(engineName) {
  try {
    return JSON.parse(localStorage.getItem(historyKey(engineName)) || '[]');
  } catch {
    return [];
  }
}

function saveValidQuery(engineName, query) {
  const q = String(query || '').trim();
  if (!q) return;
  const hist = readHistory(engineName).filter(x => x !== q);
  hist.unshift(q);
  while (hist.length > HISTORY_MAX) hist.pop();
  localStorage.setItem(historyKey(engineName), JSON.stringify(hist));
}

// ===== 渲染 =====

function renderResults(results, fallbackText) {
  if (!results.length) {
    const p = document.createElement('p');
    p.className = 'search-fallback';
    p.textContent = fallbackText;
    return [p];
  }
  return results.map(r => {
    const isLink = r.url && !r.noLink;
    const wrap = document.createElement(isLink ? 'a' : 'div');
    wrap.className = 'search-result';
    if (r.highlight) wrap.classList.add('highlight');
    if (!isLink) wrap.classList.add('nolink');
    if (isLink) {
      wrap.href = r.url;
      wrap.target = '_blank';
      wrap.rel = 'noreferrer';
    }

    const title = document.createElement('div');
    title.className = 'search-result-title';
    title.textContent = r.title;

    const source = document.createElement('div');
    source.className = 'search-result-source';
    source.textContent = r.source || (() => {
      try { return new URL(r.url || '', 'https://x.invalid').host; }
      catch { return ''; }
    })();

    const snippet = document.createElement('div');
    snippet.className = 'search-result-snippet';
    snippet.textContent = r.snippet || '';

    wrap.append(title, source, snippet);
    return wrap;
  });
}

function renderPagination(totalPages, currentPage, onPick) {
  const nav = document.createElement('nav');
  nav.className = 'search-pagination';
  const mk = (label, page, opts = {}) => {
    const a = document.createElement('a');
    a.className = 'pg' + (opts.active ? ' active' : '') + (opts.disabled ? ' disabled' : '');
    a.textContent = label;
    a.href = 'javascript:void(0)';
    if (!opts.disabled && !opts.active) {
      a.addEventListener('click', e => { e.preventDefault(); onPick(page); });
    }
    return a;
  };
  nav.appendChild(mk('< 上一页', Math.max(1, currentPage - 1), { disabled: currentPage === 1 }));
  for (let i = 1; i <= totalPages; i++) {
    nav.appendChild(mk(String(i), i, { active: i === currentPage }));
  }
  nav.appendChild(mk('下一页 >', Math.min(totalPages, currentPage + 1), { disabled: currentPage === totalPages }));
  return nav;
}

function expandMassGenerate(entry) {
  const mg = entry.massGenerate;
  const list = [];
  for (let i = 0; i < mg.count; i++) {
    const cat = mg.cats[i % mg.cats.length];
    const tpl = mg.titleTemplates ? mg.titleTemplates[i % mg.titleTemplates.length] : mg.titleTemplate;
    const stpl = mg.snippetTemplates ? mg.snippetTemplates[i % mg.snippetTemplates.length] : mg.snippetTemplate;
    list.push({
      title: tpl.replace(/\{cat\}/g, cat),
      source: mg.sources ? mg.sources[i % mg.sources.length] : '',
      snippet: stpl.replace(/\{cat\}/g, cat),
      noLink: true,
    });
  }
  if (mg.clickable && mg.clickableIndex != null) {
    list[mg.clickableIndex] = { ...mg.clickable, highlight: true };
  }
  return list;
}

function renderSurveilled(container) {
  const p1 = document.createElement('p');
  p1.className = 'search-fallback';
  p1.innerHTML = '找不到相关结果。<strong class="surveilled">这个查询已被记录。</strong>';
  container.appendChild(p1);

  setTimeout(() => {
    const p2 = document.createElement('p');
    p2.className = 'search-surveilled-followup';
    p2.textContent = 'stage_maintainer 已查看你的搜索（30 秒前）';
    container.appendChild(p2);
  }, 3000);
}

function renderHistory(engineName, container, onPick) {
  const hist = readHistory(engineName);
  container.innerHTML = '';
  if (!hist.length) return;

  const label = document.createElement('div');
  label.className = 'search-history-label';
  label.textContent = '最近搜索';
  container.appendChild(label);

  const list = document.createElement('div');
  list.className = 'search-history-list';
  for (const q of hist) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'search-history-chip';
    chip.textContent = q;
    chip.addEventListener('click', () => onPick(q));
    list.appendChild(chip);
  }
  container.appendChild(list);
}

function ensureHistoryStyles() {
  if (document.querySelector('style[data-search-history-styles]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-search-history-styles', '');
  style.textContent = `
    .search-history { margin: -16px 0 24px; }
    .search-history-label {
      font-size: 12px; color: #999; margin-bottom: 6px;
    }
    .search-history-list {
      display: flex; flex-wrap: wrap; gap: 6px;
    }
    .search-history-chip {
      background: #f5f5f5; border: 1px solid #e5e5e5;
      color: #555; font-size: 12px;
      padding: 4px 10px; border-radius: 14px;
      cursor: pointer; font-family: inherit;
    }
    .search-history-chip:hover { background: #eee; color: #222; }
    .search-surveilled-followup {
      color: #b03030; font-size: 12px; margin-top: 12px; font-style: italic;
    }
    .search-fallback .surveilled { color: #b03030; font-weight: normal; }

    /* —— hacker mode —— */
    .hacker-banner {
      background: #1a0008; color: #ff4466; border: 1px solid #ff446655;
      padding: 10px 14px; margin: 0 0 18px; font-family: ui-monospace, monospace;
      font-size: 13px; border-radius: 4px; display: flex; align-items: center; gap: 10px;
      animation: hacker-flicker 2s infinite alternate;
    }
    .hacker-banner::before { content: '◉'; color: #ff4466; }
    @keyframes hacker-flicker {
      0% { opacity: 0.92; }
      100% { opacity: 1; }
    }
    .search-result.highlight .search-result-title { font-weight: 700; }

    /* —— sigil flash overlay —— */
    .sigil-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: #000; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 18px;
      opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
    }
    .sigil-overlay.show { opacity: 1; }
    .sigil-overlay img {
      width: min(60vw, 44vh); height: auto;
      animation: sigil-pulse 0.6s ease-in-out infinite alternate;
    }
    .sigil-overlay .ov-text {
      font-family: ui-monospace, monospace; color: #ff4466;
      font-size: 13px; letter-spacing: 2px; text-align: center;
      text-shadow: 0 0 6px #ff4466;
      animation: hacker-flicker 0.18s infinite alternate;
    }
    .sigil-overlay .ov-bar {
      width: 220px; height: 4px; background: #220004;
      border: 1px solid #ff446655; overflow: hidden;
    }
    .sigil-overlay .ov-bar > span {
      display: block; height: 100%; background: #ff4466;
      box-shadow: 0 0 12px #ff4466;
      animation: ov-bar-fill linear forwards;
    }
    @keyframes ov-bar-fill { from { width: 0; } to { width: 100%; } }
    @keyframes sigil-pulse {
      from { transform: scale(0.95); }
      to { transform: scale(1.04); }
    }
    .sigil-noise { display: none; }
    .slogan-flood-bg {
      background: #000; padding: 24px 16px; margin-bottom: 18px;
      border: 1px solid #330011; border-radius: 4px;
      font-family: ui-monospace, monospace; color: #ff4466; line-height: 1.6;
      font-size: 11px; max-height: 120px; overflow: hidden; opacity: 0.6;
      text-align: center; letter-spacing: 2px;
    }
    /* —— mass results (no link) —— */
    .search-result.nolink {
      cursor: default; color: inherit; text-decoration: none;
      opacity: 0.92;
    }
    .search-result.nolink:hover { background: transparent; }
    .search-result.nolink .search-result-title { color: #6b7280; }
    .search-result.highlight .search-result-title { font-weight: 800; }
    /* —— pagination —— */
    .search-pagination {
      display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;
      margin: 28px 0 8px; padding-top: 16px;
      border-top: 1px dashed #ddd;
    }
    .search-pagination .pg {
      display: inline-block; min-width: 28px; padding: 4px 8px;
      text-align: center; font-size: 13px; color: #2964e4;
      text-decoration: none; border: 1px solid #e5e7eb;
      border-radius: 3px; background: #fff;
    }
    .search-pagination .pg:hover { background: #f0f6ff; border-color: #b8d4ff; }
    .search-pagination .pg.active {
      background: #2964e4; color: #fff; border-color: #2964e4; cursor: default;
    }
    .search-pagination .pg.disabled {
      color: #ccc; cursor: not-allowed; pointer-events: none;
      background: #fafafa;
    }
  `;
  document.head.appendChild(style);
}

function flashSigil(durationMs = 2000) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'sigil-overlay';

    const top = document.createElement('div');
    top.className = 'ov-text';
    top.innerHTML = '// EXTERNAL SCRIPT INJECTION DETECTED //<br>// MIND-SYNC IN PROGRESS · LOADING IMAGE //';

    const img = document.createElement('img');
    img.src = new URL('../assets/sigil-final.png', import.meta.url).href;
    img.alt = '';

    const bar = document.createElement('div');
    bar.className = 'ov-bar';
    const fill = document.createElement('span');
    fill.style.animationDuration = (durationMs - 100) + 'ms';
    bar.appendChild(fill);

    const bot = document.createElement('div');
    bot.className = 'ov-text';
    bot.innerHTML = '> SYNC HALTED BY 0x726F6F74 (root)<br>> RETURNING UNFILTERED CONTENT...';

    const noise = document.createElement('div');
    noise.className = 'sigil-noise';

    overlay.append(top, img, bar, bot, noise);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));
    setTimeout(() => {
      overlay.classList.remove('show');
      setTimeout(() => {
        overlay.remove();
        resolve();
      }, 280);
    }, durationMs);
  });
}

export function mountSearch({ config, rootSelector }) {
  const root = document.querySelector(rootSelector);
  if (!root) {
    console.warn('[search-engine] root not found:', rootSelector);
    return;
  }
  ensureHistoryStyles();

  const engineName = config.name || 'default';

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';

  root.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'search-form';
  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.className = 'search-input';
  input.placeholder = config.placeholder || '搜索';
  input.value = initialQuery;
  input.autocomplete = 'off';
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'search-button';
  button.textContent = config.buttonText || '搜索';
  form.append(input, button);

  const historyBox = document.createElement('div');
  historyBox.className = 'search-history';

  const resultsBox = document.createElement('div');
  resultsBox.className = 'search-results';

  const pickFromHistory = (picked) => {
    input.value = picked;
    const url = new URL(window.location.href);
    url.searchParams.set('q', picked);
    history.pushState({}, '', url);
    runSearch(picked, { fromHistory: true });
  };

  const runSearch = async (q, opts = {}) => {
    const { fromHistory = false } = opts;
    resultsBox.innerHTML = '';
    if (!q.trim()) return;

    let validHit = false;

    if (config.mode === 'unfilter' && isSurveilled(q, config.surveilledKeywords)) {
      renderSurveilled(resultsBox);
      validHit = true;
    } else {
      let { results, entry } = searchOnce(config, q);

      // 黑客模式：闪现催眠符号 → 顶部红条
      if (entry && entry.hackerMode) {
        await flashSigil(2000);
        const banner = document.createElement('div');
        banner.className = 'hacker-banner';
        banner.textContent = entry.bannerText || '此查询已被 root 解封';
        resultsBox.appendChild(banner);
        if (entry.sloganFlood) {
          const flood = document.createElement('div');
          flood.className = 'slogan-flood-bg';
          flood.textContent = '一念归一·万心同声 '.repeat(40);
          resultsBox.appendChild(flood);
        }
      }

      // mass 量产模式：扩展为大数组
      if (entry && entry.massGenerate) {
        results = expandMassGenerate(entry);
      }

      if (results.length) {
        validHit = true;
        const meta = document.createElement('div');
        meta.className = 'search-meta';
        const fc = (entry && entry.totalLabel)
          || (config.fakeCounts && config.fakeCounts[normalize(q)]);
        const count = fc ? fc : `约 ${results.length} 条结果`;
        meta.textContent = `${count}（用时 ${(Math.random() * 0.04 + 0.01).toFixed(2)} 秒）`;
        resultsBox.appendChild(meta);
      }

      // 分页：仅当 entry.paginated 启用
      if (entry && entry.paginated && results.length) {
        const perPage = entry.paginated.perPage || 20;
        const totalPages = entry.paginated.totalPages || Math.ceil(results.length / perPage);
        const renderPage = (page) => {
          // 移除旧结果与分页
          [...resultsBox.querySelectorAll('.search-result, .search-pagination')].forEach(n => n.remove());
          const start = (page - 1) * perPage;
          const slice = results.slice(start, start + perPage);
          const nodes = renderResults(slice, config.fallback || '找不到相关结果');
          for (const node of nodes) resultsBox.appendChild(node);
          resultsBox.appendChild(renderPagination(totalPages, page, renderPage));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        renderPage(1);
      } else {
        const nodes = renderResults(results, config.fallback || '找不到相关结果');
        for (const node of nodes) resultsBox.appendChild(node);
      }
    }

    if (validHit && !fromHistory) saveValidQuery(engineName, q);
    renderHistory(engineName, historyBox, pickFromHistory);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value;
    const url = new URL(window.location.href);
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    history.pushState({}, '', url);
    runSearch(q);
  });

  root.append(form, historyBox, resultsBox);

  renderHistory(engineName, historyBox, pickFromHistory);
  if (initialQuery) runSearch(initialQuery, { fromHistory: true });
}
