/**
 * 玩家行为追踪：把 L1 中的关键操作写入 localStorage，
 * 供 37 页 NEXUS 弹窗在最后复述。
 *
 * 跨域问题：每个站点是独立域，localStorage 不共享。
 * 解决方案：所有跨站行为都通过 URL query string 串联（玩家点链接进下一站时携带）。
 * 在最终的 decision/ 站点上，从 URL query 接收所有 trace 字段并写本地。
 *
 * 设计精神：尽量轻量，只记录"有戏剧价值"的操作。
 */

const KEY = 'arg.trace.v1';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function write(obj) {
  localStorage.setItem(KEY, JSON.stringify(obj));
}

export function recordTrace(patch) {
  const cur = read();
  write({ ...cur, ...patch });
}

export function readTrace() {
  return read();
}

export function clearTrace() {
  localStorage.removeItem(KEY);
}

/**
 * 把当前 trace 序列化进一个 URL（用于跨站点传递）。
 * 注意：仅传一些关键字段，避免 URL 过长。
 */
export function appendTraceToUrl(url) {
  const t = read();
  const u = new URL(url, window.location.href);
  for (const [k, v] of Object.entries(t)) {
    if (v == null) continue;
    u.searchParams.set(`t_${k}`, String(v));
  }
  return u.toString();
}

/**
 * 从当前 URL 接收 trace 字段（用于跨站点接收）。
 */
export function ingestTraceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const patch = {};
  for (const [k, v] of params.entries()) {
    if (!k.startsWith('t_')) continue;
    const real = k.slice(2);
    const n = Number(v);
    patch[real] = Number.isFinite(n) && /^-?\d+(\.\d+)?$/.test(v) ? n : v;
  }
  if (Object.keys(patch).length) recordTrace(patch);
}

// 测页面停留时长的小工具
export function trackDwell(key) {
  const start = Date.now();
  const flush = () => {
    const dur = Date.now() - start;
    const cur = read();
    cur[key] = (cur[key] || 0) + dur;
    write(cur);
  };
  window.addEventListener('beforeunload', flush);
  // pagehide 在 iOS Safari 上更可靠
  window.addEventListener('pagehide', flush);
}

// 给 nexus-popup 用的小工具：把毫秒格式化为人话
export const formatStat = {
  duration(ms) {
    if (ms == null) return '一会儿';
    const sec = Math.round(ms / 1000);
    if (sec < 60) return `${sec} 秒`;
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return s === 0 ? `${min} 分钟` : `${min} 分 ${s} 秒`;
  },
};
