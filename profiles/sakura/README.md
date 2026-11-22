# RouteCraft · Sakura

用于 Sakura 订阅的 Clash Verge Rev / Mihomo JavaScript 扩展脚本。复制 [routecraft.js](routecraft.js) 全部内容到 Sakura 订阅的「编辑扩展/脚本」，保存后重新应用订阅。

策略组为 Proxy、CDN、Storage、AI、download、domestic、social media、xjtlu，以及按节点名称生成的香港、新加坡、台湾、日本、美国地区组。没有匹配的地区不生成；地区组使用 HTTPS 自动测速。流量余额、重置与到期提示不会作为节点。

AI 优先使用美国，其次新加坡、日本；`ampcode.com` 明确归入 AI，置于通用 CDN 等规则之前。这个域名来自本机 AMP 使用记录；未找到 Clash 配置中的其他 AMP 专项域名，因此没有扩大匹配范围。xjtlu 默认直连，校园认证始终直连。脚本保留原订阅节点和 DNS，重建策略组、规则和规则提供者。

开发前对 41 个 Sakura 节点进行了两轮短时连通性测试。结果波动明显，因此不固化节点排名、不永久剔除节点。检测站 HTTP 403 或单次握手失败不能等同于节点长期不可用；具体业务仍应在使用时验证。个人订阅与出口 IP 不进入仓库。

Ikuuu 版本请见 [独立说明](../ikuuu/README.md)。
