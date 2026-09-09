// KBJ Panda Live - Origin 头注入脚本 (Loon http-request)
// 版本: 2.0.0
// 用途: 拦截发往 PandaTV CDN 的 FLV 流请求，强制加 Origin: https://www.pandalive.co.kr
// 触发: 由 panda.plugin 里 [Script] http-request 规则匹配后调用

console.log('[KBJ-Panda] script fired for URL:', $request.url);

// 复制原 headers（避免修改原对象引用）
let headers = Object.assign({}, $request.headers || {});

// 大小写不敏感地删除已有的 Origin 变体（HTTP 头 case-insensitive，
// 但 JS 对象 key 是 case-sensitive，Loon 内部按原始 key 存）
for (const k of Object.keys(headers)) {
  if (k.toLowerCase() === 'origin') delete headers[k];
}

// 加上我们要的 Origin
headers['Origin'] = 'https://www.pandalive.co.kr';

console.log('[KBJ-Panda] origin injected →', headers['Origin']);

// 把修改后的 headers 交回 Loon
$done({ headers: headers });
