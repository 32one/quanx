/*
PandaTV / live-video.net anti-hotlink fix for Quantumult X

功能：给 live-video.net 请求补 Origin/Referer，解决 PandaTV 直播源防盗链。

Quantumult X 配置示例：

[rewrite_local]
^https?:\/\/.*live-video\.net\/.* url script-request-header pandalive_origin.js

[mitm]
hostname = *.live-video.net

#如使用远程脚本，把 pandalive_origin.js 替换为脚本 URL。
*/

const TARGET_ORIGIN = "https://www.pandalive.co.kr";

let headers = $request.headers || {};

// 兼容不同客户端/大小写，先清理可能存在的同名头
for (const key of Object.keys(headers)) {
  const lower = key.toLowerCase();
  if (lower === "origin" || lower === "referer" || lower === "referrer") {
    delete headers[key];
  }
}

headers["Origin"] = TARGET_ORIGIN;
headers["Referer"] = TARGET_ORIGIN + "/";

$done({ headers });
