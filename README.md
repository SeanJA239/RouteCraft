# RouteCraft

**Smarter routing for Ikuuu on Mihomo, powered by [SukkaW rulesets](https://github.com/SukkaW/Surge).**

RouteCraft 是面向 **Ikuuu 机场订阅**设计的非官方 [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) 扩展脚本。它会基于机场订阅中的节点，动态构建地区和业务策略组，并使用 SukkaW 维护的在线规则进行分流。

> 本项目与 Ikuuu、SukkaW 无官方关联。节点名称匹配针对当前 Ikuuu 风格设计，其他机场不保证兼容。

## 功能

- 按节点名称整理香港、日本、新加坡、美国、台湾、欧洲及其他地区节点。
- 提供 `🚀 Proxy`、`🤖 AI`、`📱 Telegram`、`🎬 Media`、`⬇️ Download` 等分层策略组，并保留专项业务分流。
- 识别低倍率、下载专用和免费节点，方便将大流量任务与常规代理分开。
- 通过 Mihomo `rule-providers` 引用 SukkaW 在线规则，无需将上千条规则硬编码进订阅。
- 在原机场订阅的基础上加工配置；不在本脚本中写入机场订阅地址、密码或 UUID。

## 安装与使用

1. 安装 **Clash Verge Rev**，添加并更新自己的 **Ikuuu 机场订阅**，先确认原始订阅能够正常连接。
2. 下载或打开本仓库的 [`routecraft.js`](./routecraft.js)，复制**全部内容**。
3. 在 Clash Verge Rev 的 **订阅**页面，找到这份机场订阅卡片，右键选择 **编辑扩展/脚本**（不同版本界面文字可能略有不同）。
4. 选择该订阅专属的 **扩展脚本（JavaScript / Script）**，粘贴内容并保存。**不要贴到扩展覆写配置（YAML / Merge）中，也不要直接把 JS 作为 Mihomo 配置导入。**
5. 选中/应用原机场订阅，并根据需要手动更新订阅。进入 **代理（Proxies）** 页面，查看新增的地区组、业务组和 `🚀 Proxy` 主选择组。
6. 将代理模式设为 **规则（Rule）**，为 `🚀 Proxy`、`🤖 AI` 等策略选择合适的地区或节点；在 **连接 / 日志** 页面检查实际命中规则。

[Clash Verge Rev 官方扩展配置与脚本文档](https://www.clashverge.dev/guide/extend.html)

## 使用后的效果

```text
机场原始订阅（每个人自己的账号与节点）
       │
       ▼
routecraft.js（订阅扩展脚本）
       ├─ 地区组：HK / JP / SG / US / TW / EU / Other
       ├─ 业务组：AI / Telegram / Media / Apple / Microsoft / CDN / Download …
       └─ SukkaW 在线分流规则（rule-providers）
       │
       ▼
Mihomo 最终配置 → Clash Verge Rev「代理」界面
```

## 自动更新与注意事项

- **机场节点更新**：仍由 Clash Verge Rev 原来的订阅更新功能负责。脚本在配置重新生成时，会使用更新后的节点重新构建策略组；**脚本本身不会替你定时拉取机场订阅**。
- **规则数据更新**：由脚本中定义的 SukkaW `rule-providers` 按设定间隔下载；首次使用需要能访问相应规则地址。
- **兼容性**：主要针对 `proxies` 节点列表设计，同时包含 `proxy-providers` 的处理逻辑。节点命名不符合识别模式时，可能不会被分入预期国家；可从 `🧰 Manual Nodes` 或 `🚀 Proxy` 检查。
- **现有配置**：脚本会重建 `proxy-groups`、`rules`、`rule-providers`，因此原机场自带的这些自定义项会被替换；其他字段尽量沿用原订阅。
- **备份**：建议保留未应用脚本的原机场订阅或其他已知可用配置，出现问题时可先禁用扩展脚本并切回原配置。
- **安全**：不要公开上传个人完整订阅 YAML、订阅链接、SS 密码、VMess UUID 或 Token。

## 技术来源与版权

- **RouteCraft**：负责将节点按地区归类、生成策略组、映射业务规则及适配 Clash Verge Rev 脚本接口。
- **[SukkaW/Surge](https://github.com/SukkaW/Surge)**：提供本项目引用的规则数据。其规则、代码和相关文件仍受 SukkaW 项目各自的许可约束；本仓库的许可不改变第三方文件许可。
- **[Mihomo](https://github.com/MetaCubeX/mihomo)**、**[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)**：运行内核与客户端。

如为自有原创代码选择 MIT License，可在仓库添加 `LICENSE`；该许可仅覆盖你有权授权的内容。发布前仍应检查是否包含第三方受限代码。

## 状态

当前为 **V3 试用版**。已做基础 JavaScript 语法与配置结构检查，但不能替代所有 Clash Verge Rev / Mihomo 版本及真实机场环境的功能测试。欢迎通过 Issues 反馈节点识别、规则命中和兼容性问题。
