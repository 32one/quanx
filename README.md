# quanx

个人自用的代理分流规则仓库，配合 [Quantumult X](https://apps.apple.com/app/quantumult-x/id1443988620) / [Loon](https://apps.apple.com/app/loon/id1373567447) 使用。

## 目录结构

| 文件 | 平台 | 用途 |
| --- | --- | --- |
| [`panda.plugin`](./panda.plugin) | Loon | PandaTV 直播流 Origin 头注入插件 |
| [`panda-origin.js`](./panda-origin.js) | Loon | ↑ 插件引用的改头脚本（勿单独使用） |
| [`panda-qx.conf`](./panda-qx.conf) | Quantumult X | 同功能的 QX rewrite 规则 |
| [`talkatone.list`](./talkatone.list) | 通用 | Talkatone 分流规则列表 |

## Panda Live Origin 注入

给 kbjgirl.com 加载的 PandaTV（韩国直播平台）FLV 直播流强制注入 `Origin: https://www.pandalive.co.kr` 请求头，绕过 CDN 的防盗链校验。

**原理**：PandaTV CDN 会校验请求的 Origin 头，网页端携带的是 kbjgirl.com 的域名而被拒绝。插件通过 MITM 解密 `pandatv.co.kr` / `pandalive.co.kr` / `live-video.net` 相关流量后，在 http-request 阶段改写请求头。

**Loon 用法**：

```ini
[Plugin]
https://raw.githubusercontent.com/32one/quanx/main/panda.plugin
```

**Quantumult X 用法**（引用远程配置）：

```
https://raw.githubusercontent.com/32one/quanx/main/panda-qx.conf
```

或在 `[rewrite_remote]` / `[mitm]` 中手动合并对应规则。

> QX 需在「MitM」中生成并安装 CA 证书、开启对应 hostname 的解密开关。

## Talkatone 分流

[Talkatone](https://talkatone.com)（免费美国号码通话 App）所需的代理规则：信令/媒体域名、STUN/TURN 服务器、4 个 IP 段。其中 `tktn.be` 直连已超时，必须走代理。

```ini
[filter_remote]
https://raw.githubusercontent.com/32one/quanx/main/talkatone.list, tag=Talkatone, enabled=true
```

## 说明

- 仓库内容仅自用，域名/规则可能随时调整，不保证长期有效
- 订阅请直接使用 [raw.githubusercontent.com](https://raw.githubusercontent.com/32one/quanx/main/) 下的文件链接
