# RouteCraft

面向 **Clash Verge Rev / Mihomo** 的订阅扩展脚本，使用 [SukkaW 规则集](https://github.com/SukkaW/Surge)分流。每个版本均可独立粘贴使用。

| 版本       | 脚本                                                           | 使用说明                                 | 策略与 DNS                                                       |
| ---------- | -------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| **Ikuuu**  | [profiles/ikuuu/routecraft.js](profiles/ikuuu/routecraft.js)   | [Ikuuu 指南](profiles/ikuuu/README.md)   | 原有完整业务分组、低倍率/免费节点识别、XJTLU 校园 DNS 与路由适配 |
| **Sakura** | [profiles/sakura/routecraft.js](profiles/sakura/routecraft.js) | [Sakura 指南](profiles/sakura/README.md) | 地区组 + 8 个业务组，保留原订阅 DNS                              |

两套版本分别维护，不能互相替代。根目录的 [routecraft.js](routecraft.js) 继续提供 **Ikuuu 版本**，与 profiles/ikuuu/routecraft.js 内容一致，以兼容已有链接。

## 安装

1. 在 Clash Verge Rev 添加自己的机场订阅，确认原始订阅可以连接。
2. 根据上表打开对应脚本，复制全部 JavaScript 内容。
3. 在该订阅的 **编辑扩展/脚本** 中粘贴并保存，然后重新应用该订阅。不要粘贴到 YAML/Merge 覆写，也不要把 JS 当成完整 Mihomo 配置导入。
4. 使用 **Rule / 规则** 模式，在代理页选择业务组与地区；通过连接日志检查规则命中。

[Clash Verge Rev 扩展配置文档](https://www.clashverge.dev/guide/extend.html)

订阅更新会重新执行已安装的脚本，但不会自动从本仓库更新脚本。在线规则由 rule-providers 更新。两套脚本都会替换订阅的策略组、规则与规则提供者；迁移前保留原配置。

## 仓库结构

```text
profiles/
  ikuuu/
    routecraft.js       # Ikuuu 主维护入口
    README.md           # Ikuuu / 校园网络说明
  sakura/
    routecraft.js       # Sakura 精简版，独立可用
    README.md           # 分组、默认路由与测试边界
routecraft.js           # Ikuuu 兼容副本
scripts/
  sync-legacy.js        # 同步 Ikuuu 兼容副本
test/
  routecraft.test.js    # Ikuuu 行为与兼容副本检查
  sakura.test.js        # Sakura 分组、规则优先级及配置保持检查
```

## 开发与验证

```sh
npm ci
npm run check
```

修改 Ikuuu 时编辑 profiles/ikuuu/routecraft.js，再执行 `npm run sync:legacy` 更新根目录兼容副本。修改 Sakura 时只编辑 profiles/sakura/routecraft.js。提交前可运行 `npm run format`，然后运行 `npm run check`；CI 对两套脚本执行格式、lint、测试和语法检查。

测试使用虚构节点，不包含订阅地址、密码、UUID 或真实出口 IP。自动测试验证配置生成行为，不能替代当前网络上的节点连通性、服务可用性或 IP 信誉检查。

## 来源与许可

- RouteCraft：节点分组与策略生成，使用 [MIT 许可证](LICENSE)。
- [SukkaW/Surge](https://github.com/SukkaW/Surge)：在线规则数据，遵循上游许可。
- [Mihomo](https://github.com/MetaCubeX/mihomo)、[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)：代理内核与客户端。

本项目与 Ikuuu、Sakura、SukkaW 无官方关联。不要向仓库提交个人订阅、完整节点配置或含凭据的测试文件。
