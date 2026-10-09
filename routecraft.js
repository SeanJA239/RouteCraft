/**
 * SukkaW Mihomo Policy Extension
 *
 * Maintained by Sean
 * Compatible with Clash Verge Rev / Mihomo
 *
 * Inspired by:
 * - SukkaW/Surge (Sukka Ruleset)
 * - Mihomo Project
 *
 * Features:
 * - Dynamic proxy grouping by region
 * - Automatic node selection
 * - Service-based traffic routing
 * - Integration with Sukka Ruleset
 *
 * Built with assistance from OpenAI ChatGPT.
 *
 * This is an independent community project
 * and is not affiliated with the projects above.
 */

const SUKKA_PROVIDERS = {"reject_domainset":{"type":"http","behavior":"domain","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/domainset/reject.txt","path":"./sukkaw_ruleset/reject_domainset.txt"},"reject_non_ip_drop":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/reject-drop.txt","path":"./sukkaw_ruleset/reject-drop_non_ip.txt"},"reject_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/reject.txt","path":"./sukkaw_ruleset/reject_non_ip.txt"},"reject_non_ip_no_drop":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/reject-no-drop.txt","path":"./sukkaw_ruleset/reject-no-drop_non_ip.txt"},"reject_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/reject.txt","path":"./sukkaw_ruleset/reject_ip.txt"},"cdn_domainset":{"type":"http","behavior":"domain","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/domainset/cdn.txt","path":"./sukkaw_ruleset/cdn_domainset.txt"},"cdn_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/cdn.txt","path":"./sukkaw_ruleset/cdn_non_ip.txt"},"download_domainset":{"type":"http","behavior":"domain","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/domainset/download.txt","path":"./sukkaw_ruleset/download_domainset.txt"},"download_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/download.txt","path":"./sukkaw_ruleset/download_non_ip.txt"},"ai_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/ai.txt","path":"./sukkaw_ruleset/ai_non_ip.txt"},"ai_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/ai.txt","path":"./sukkaw_ruleset/ai_ip.txt"},"telegram_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/telegram.txt","path":"./sukkaw_ruleset/telegram_non_ip.txt"},"telegram_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/telegram.txt","path":"./sukkaw_ruleset/telegram_ip.txt"},"apple_cdn":{"type":"http","behavior":"domain","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/domainset/apple_cdn.txt","path":"./sukkaw_ruleset/apple_cdn_domainset.txt"},"apple_services":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/apple_services.txt","path":"./sukkaw_ruleset/apple_services_non_ip.txt"},"apple_cn_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/apple_cn.txt","path":"./sukkaw_ruleset/apple_cn_non_ip.txt"},"microsoft_cdn_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/microsoft_cdn.txt","path":"./sukkaw_ruleset/microsoft_cdn_non_ip.txt"},"microsoft_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/microsoft.txt","path":"./sukkaw_ruleset/microsoft_non_ip.txt"},"lan_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/lan.txt","path":"./sukkaw_ruleset/lan_non_ip.txt"},"lan_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/lan.txt","path":"./sukkaw_ruleset/lan_ip.txt"},"direct_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/direct.txt","path":"./sukkaw_ruleset/direct_non_ip.txt"},"domestic_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/domestic.txt","path":"./sukkaw_ruleset/domestic_non_ip.txt"},"domestic_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/domestic.txt","path":"./sukkaw_ruleset/domestic_ip.txt"},"global_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/global.txt","path":"./sukkaw_ruleset/global_non_ip.txt"},"china_ip":{"type":"http","behavior":"ipcidr","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/china_ip.txt","path":"./sukkaw_ruleset/china_ip_ip.txt"},"stream_us_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/stream_us.txt","path":"./sukkaw_ruleset/stream_us_non_ip.txt"},"stream_us_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/stream_us.txt","path":"./sukkaw_ruleset/stream_us_ip.txt"},"stream_eu_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/stream_eu.txt","path":"./sukkaw_ruleset/stream_eu_non_ip.txt"},"stream_eu_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/stream_eu.txt","path":"./sukkaw_ruleset/stream_eu_ip.txt"},"stream_jp_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/stream_jp.txt","path":"./sukkaw_ruleset/stream_jp_non_ip.txt"},"stream_jp_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/stream_jp.txt","path":"./sukkaw_ruleset/stream_jp_ip.txt"},"stream_kr_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/stream_kr.txt","path":"./sukkaw_ruleset/stream_kr_non_ip.txt"},"stream_kr_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/stream_kr.txt","path":"./sukkaw_ruleset/stream_kr_ip.txt"},"stream_hk_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/stream_hk.txt","path":"./sukkaw_ruleset/stream_hk_non_ip.txt"},"stream_hk_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/stream_hk.txt","path":"./sukkaw_ruleset/stream_hk_ip.txt"},"stream_tw_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/stream_tw.txt","path":"./sukkaw_ruleset/stream_tw_non_ip.txt"},"stream_tw_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/stream_tw.txt","path":"./sukkaw_ruleset/stream_tw_ip.txt"},"stream_non_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/non_ip/stream.txt","path":"./sukkaw_ruleset/stream_non_ip.txt"},"stream_ip":{"type":"http","behavior":"classical","format":"text","interval":43200,"url":"https://ruleset.skk.moe/Clash/ip/stream.txt","path":"./sukkaw_ruleset/stream_ip.txt"}};
const SUKKA_RULES = ["RULE-SET,lan_non_ip,DIRECT","RULE-SET,reject_non_ip_drop,REJECT-DROP","RULE-SET,reject_domainset,🛑 拦截广告","RULE-SET,reject_non_ip,🛑 拦截广告","RULE-SET,reject_non_ip_no_drop,🛑 拦截广告","DOMAIN,app.biliapi.net,🌏 爱奇艺&哔哩哔哩","DOMAIN,grpc.biliapi.net,🌏 爱奇艺&哔哩哔哩","DOMAIN,p-bstarstatic.akamaized.net,🌏 爱奇艺&哔哩哔哩","DOMAIN,p.bstarstatic.com,🌏 爱奇艺&哔哩哔哩","DOMAIN,upos-bstar-mirrorakam.akamaized.net,🌏 爱奇艺&哔哩哔哩","DOMAIN,upos-bstar1-mirrorakam.akamaized.net,🌏 爱奇艺&哔哩哔哩","DOMAIN,upos-hz-mirrorakam.akamaized.net,🌏 爱奇艺&哔哩哔哩","DOMAIN-SUFFIX,acgvideo.com,🌏 爱奇艺&哔哩哔哩","DOMAIN-SUFFIX,bilibili.com,🌏 爱奇艺&哔哩哔哩","DOMAIN-SUFFIX,bilibili.tv,🌏 爱奇艺&哔哩哔哩","IP-CIDR,45.43.32.234/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,103.151.150.0/23,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,128.1.62.200/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,128.1.62.201/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,150.116.92.250/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,164.52.33.178/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,164.52.33.182/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,164.52.76.18/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,203.107.1.33/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,203.107.1.34/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,203.107.1.65/32,🌏 爱奇艺&哔哩哔哩,no-resolve","IP-CIDR,203.107.1.66/32,🌏 爱奇艺&哔哩哔哩,no-resolve","DOMAIN,cache.video.iqiyi.com,🌏 爱奇艺&哔哩哔哩","DOMAIN-SUFFIX,iq.com,🌏 爱奇艺&哔哩哔哩","DOMAIN,bahamut.akamaized.net,📺 动画疯","DOMAIN,gamer-cds.cdn.hinet.net,📺 动画疯","DOMAIN,gamer2-cds.cdn.hinet.net,📺 动画疯","DOMAIN-SUFFIX,bahamut.com.tw,📺 动画疯","DOMAIN-SUFFIX,gamer.com.tw,📺 动画疯","DOMAIN-SUFFIX,steamserver.net,🎮 Steam 登录/下载","DOMAIN-SUFFIX,cm.steampowered.com,🎮 Steam 登录/下载","DOMAIN-KEYWORD,steampipe,DIRECT","DOMAIN-KEYWORD,steamcontent,DIRECT","DOMAIN-SUFFIX,steampipe-kr.akamaized.net,DIRECT","DOMAIN-SUFFIX,steampipe-partner.akamaized.net,DIRECT","DOMAIN-SUFFIX,steampipe.akamaized.net,DIRECT","DOMAIN-SUFFIX,steamcontent.com,DIRECT","DOMAIN-SUFFIX,csgo.wmsj.cn,DIRECT","DOMAIN-SUFFIX,dota2.wmsj.cn,DIRECT","DOMAIN-SUFFIX,wmsjsteam.com,DIRECT","DOMAIN-SUFFIX,dl.steam.clngaa.com,DIRECT","DOMAIN-SUFFIX,dl.steam.ksyna.com,DIRECT","DOMAIN-SUFFIX,st.dl.bscstorage.net,DIRECT","DOMAIN-SUFFIX,st.dl.eccdnx.com,DIRECT","DOMAIN-SUFFIX,st.dl.pinyuncloud.com,DIRECT","DOMAIN-SUFFIX,steampipe.steamcontent.tnkjmec.com,DIRECT","DOMAIN-SUFFIX,steampowered.com.8686c.com,DIRECT","DOMAIN-SUFFIX,steamstatic.com.8686c.com,DIRECT","DOMAIN-SUFFIX,steamchina.com,DIRECT","DOMAIN-SUFFIX,qtlglb.com,DIRECT","DOMAIN-SUFFIX,queniuqe.com,DIRECT","DOMAIN,steambroadcast.akamaized.net,🎮 Steam 商店/社区","DOMAIN,steamcdn-a.akamaihd.net,🎮 Steam 商店/社区","DOMAIN,steamcommunity-a.akamaihd.net,🎮 Steam 商店/社区","DOMAIN,steampipe.akamaized.net,🎮 Steam 商店/社区","DOMAIN,steamstore-a.akamaihd.net,🎮 Steam 商店/社区","DOMAIN,steamusercontent-a.akamaihd.net,🎮 Steam 商店/社区","DOMAIN,steamuserimages-a.akamaihd.net,🎮 Steam 商店/社区","DOMAIN-SUFFIX,fanatical.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,humblebundle.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,playartifact.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,steam-chat.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,steamcommunity.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,steamgames.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,steampowered.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,steamstat.us,🎮 Steam 商店/社区","DOMAIN-SUFFIX,steamstatic.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,underlords.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,valvesoftware.com,🎮 Steam 商店/社区","DOMAIN-SUFFIX,steamusercontent.com,🎮 Steam 商店/社区","DOMAIN-KEYWORD,1drv,☁️ OneDrive","DOMAIN-KEYWORD,onedrive,☁️ OneDrive","DOMAIN-KEYWORD,skydrive,☁️ OneDrive","DOMAIN-SUFFIX,livefilestore.com,☁️ OneDrive","DOMAIN-SUFFIX,oneclient.sfx.ms,☁️ OneDrive","DOMAIN-SUFFIX,onedrive.com,☁️ OneDrive","DOMAIN-SUFFIX,onedrive.live.com,☁️ OneDrive","DOMAIN-SUFFIX,photos.live.com,☁️ OneDrive","DOMAIN-SUFFIX,sharepoint.com,☁️ OneDrive","DOMAIN-SUFFIX,sharepointonline.com,☁️ OneDrive","DOMAIN-SUFFIX,skydrive.wns.windows.com,☁️ OneDrive","DOMAIN-SUFFIX,spoprod-a.akamaihd.net,☁️ OneDrive","DOMAIN-SUFFIX,storage.live.com,☁️ OneDrive","DOMAIN-SUFFIX,storage.msn.com,☁️ OneDrive","DOMAIN-SUFFIX,webofscience.com,🎓 学术网站","DOMAIN-SUFFIX,sciencedirect.com,🎓 学术网站","DOMAIN-SUFFIX,webofknowledge.com,🎓 学术网站","DOMAIN-SUFFIX,clarivate.com,🎓 学术网站","DOMAIN-SUFFIX,taylorandfrancis.com,🎓 学术网站","DOMAIN-SUFFIX,dl.acm.org,🎓 学术网站","DOMAIN,acm-prod.disqus.com,🎓 学术网站","DOMAIN-SUFFIX,sciencedirectassets.com,🎓 学术网站","DOMAIN-SUFFIX,readspeaker.com,🎓 学术网站","DOMAIN-SUFFIX,pubmed.ncbi.nlm.nih.gov,🎓 学术网站","DOMAIN-SUFFIX,ieee.org,🎓 学术网站","DOMAIN-SUFFIX,nature.com,🎓 学术网站","DOMAIN-SUFFIX,elsevier.com,🎓 学术网站","DOMAIN-SUFFIX,tandfonline.com,🎓 学术网站","DOMAIN-SUFFIX,springer.com,🎓 学术网站","DOMAIN-SUFFIX,onlinelibrary.wiley.com,🎓 学术网站","DOMAIN-SUFFIX,taylorfrancis.com,🎓 学术网站","DST-PORT,25,DIRECT","DST-PORT,57,DIRECT","DST-PORT,109,DIRECT","DST-PORT,110,DIRECT","DST-PORT,143,DIRECT","DST-PORT,158,DIRECT","DST-PORT,209,DIRECT","DST-PORT,220,DIRECT","DST-PORT,465,DIRECT","DST-PORT,587,DIRECT","DST-PORT,995,DIRECT","DST-PORT,993,DIRECT","DOMAIN-SUFFIX,office.com,DIRECT","DOMAIN,ocws.officeapps.live.com,DIRECT","DOMAIN-SUFFIX,events.data.microsoft.com,DIRECT","DST-PORT,3306,DIRECT","DOMAIN,yacd.haishan.me,DIRECT","DOMAIN,clash.razord.top,DIRECT","DOMAIN-SUFFIX,dcg.microsoft.com,DIRECT","DOMAIN-SUFFIX,dl.delivery.mp.microsoft.com,DIRECT","DOMAIN-SUFFIX,download.windowsupdate.com,DIRECT","DOMAIN,cn.bing.com,DIRECT","DOMAIN,b.c2r.ts.cdn.office.net,DIRECT","DOMAIN,f.c2r.ts.cdn.office.net,DIRECT","DOMAIN,bg.v4.a.dl.ws.microsoft.com,DIRECT","DOMAIN,bg4.v4.a.dl.ws.microsoft.com,DIRECT","DOMAIN,epicgames-download1.akamaized.net,DIRECT","DOMAIN,epicgames-download0.akamaized.net,DIRECT","DOMAIN,epicgames-download2.akamaized.net,DIRECT","DOMAIN,epicgames-download3.akamaized.net,DIRECT","DOMAIN,epicgames-download4.akamaized.net,DIRECT","DOMAIN,epicgames-download5.akamaized.net,DIRECT","DOMAIN,epicgames-download6.akamaized.net,DIRECT","DOMAIN,epicgames-download7.akamaized.net,DIRECT","DOMAIN,epicgames-download8.akamaized.net,DIRECT","DOMAIN,epicgames-download9.akamaized.net,DIRECT","DOMAIN,safebrowsing.googleapis.com,DIRECT","DOMAIN-SUFFIX,cloudflare-dns.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflare-ipfs.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflare-quic.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflare.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflare.net,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflareapps.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflarebolt.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflareclient.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflareinsights.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflareok.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflareresolve.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflaressl.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflarestatus.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflarestream.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflaretest.com,🌩️ Cloudflare","DOMAIN-SUFFIX,cloudflarewarp.com,🌩️ Cloudflare","DOMAIN-SUFFIX,one.one.one,🌩️ Cloudflare","DOMAIN-SUFFIX,pages.dev,🌩️ Cloudflare","DOMAIN-SUFFIX,videodelivery.net,🌩️ Cloudflare","DOMAIN-SUFFIX,warp.plus,🌩️ Cloudflare","DOMAIN-SUFFIX,workers.dev,🌩️ Cloudflare","DOMAIN-SUFFIX,local,DIRECT","IP-CIDR,192.168.0.0/16,DIRECT,no-resolve","IP-CIDR,10.0.0.0/8,DIRECT,no-resolve","IP-CIDR,172.16.0.0/12,DIRECT,no-resolve","IP-CIDR,127.0.0.0/8,DIRECT,no-resolve","IP-CIDR,100.64.0.0/10,DIRECT,no-resolve","IP-CIDR6,::1/128,DIRECT,no-resolve","IP-CIDR6,fc00::/7,DIRECT,no-resolve","IP-CIDR6,fe80::/10,DIRECT,no-resolve","IP-CIDR6,fd00::/8,DIRECT,no-resolve","IP-CIDR,173.245.48.0/20,🌩️ Cloudflare","IP-CIDR,103.21.244.0/22,🌩️ Cloudflare","IP-CIDR,103.22.200.0/22,🌩️ Cloudflare","IP-CIDR,103.31.4.0/22,🌩️ Cloudflare","IP-CIDR,141.101.64.0/18,🌩️ Cloudflare","IP-CIDR,108.162.192.0/18,🌩️ Cloudflare","IP-CIDR,190.93.240.0/20,🌩️ Cloudflare","IP-CIDR,188.114.96.0/20,🌩️ Cloudflare","IP-CIDR,197.234.240.0/22,🌩️ Cloudflare","IP-CIDR,198.41.128.0/17,🌩️ Cloudflare","IP-CIDR,162.158.0.0/15,🌩️ Cloudflare","IP-CIDR,104.16.0.0/13,🌩️ Cloudflare","IP-CIDR,104.24.0.0/14,🌩️ Cloudflare","IP-CIDR,172.64.0.0/13,🌩️ Cloudflare","IP-CIDR,131.0.72.0/22,🌩️ Cloudflare","RULE-SET,apple_cdn,🍎 Apple CDN","RULE-SET,microsoft_cdn_non_ip,🧑‍💻 Microsoft CDN","RULE-SET,download_domainset,⬇️ Download","RULE-SET,download_non_ip,⬇️ Download","RULE-SET,cdn_domainset,🚄 CDN","RULE-SET,cdn_non_ip,🚄 CDN","RULE-SET,ai_non_ip,🤖 AI","RULE-SET,telegram_non_ip,📱 Telegram","RULE-SET,stream_us_non_ip,🇺🇸 US","RULE-SET,stream_eu_non_ip,🇪🇺 EU","RULE-SET,stream_jp_non_ip,🇯🇵 JP","RULE-SET,stream_kr_non_ip,🇰🇷 韩国Z01","RULE-SET,stream_hk_non_ip,🇭🇰 HK","RULE-SET,stream_tw_non_ip,🇹🇼 TW","RULE-SET,stream_non_ip,🎬 Media","RULE-SET,apple_cn_non_ip,DIRECT","RULE-SET,apple_services,🍎 Apple","RULE-SET,microsoft_non_ip,🧑‍💻 Microsoft","RULE-SET,direct_non_ip,DIRECT","RULE-SET,domestic_non_ip,🇨🇳 Domestic","RULE-SET,global_non_ip,🚀 Proxy","RULE-SET,reject_ip,REJECT","RULE-SET,lan_ip,DIRECT","RULE-SET,ai_ip,🤖 AI","RULE-SET,telegram_ip,📱 Telegram","RULE-SET,stream_us_ip,🇺🇸 US","RULE-SET,stream_eu_ip,🇪🇺 EU","RULE-SET,stream_jp_ip,🇯🇵 JP","RULE-SET,stream_kr_ip,🇰🇷 韩国Z01","RULE-SET,stream_hk_ip,🇭🇰 HK","RULE-SET,stream_tw_ip,🇹🇼 TW","RULE-SET,stream_ip,🎬 Media","RULE-SET,domestic_ip,🇨🇳 Domestic","RULE-SET,china_ip,🇨🇳 Domestic","MATCH,🐟 漏网之鱼"];
const BUSINESS_GROUPS = {"🇨🇳 Domestic":["DIRECT","🚀 Proxy"],"🚄 CDN":["💸 Low Cost","🚀 Proxy","DIRECT","🇭🇰 HK","🇯🇵 JP","🇸🇬 SG","🇺🇸 US","🇹🇼 TW"],"⬇️ Download":["DIRECT","💸 Low Cost","🚀 Proxy","🇯🇵 JP","🇭🇰 HK","🇸🇬 SG","🇺🇸 US"],"🤖 AI":["🇺🇸 US","🇸🇬 SG","🇯🇵 JP","🚀 Proxy","DIRECT"],"📱 Telegram":["🇸🇬 SG","🇭🇰 HK","🇯🇵 JP","🚀 Proxy","DIRECT"],"🎬 Media":["🚀 Proxy","🇺🇸 US","🇯🇵 JP","🇸🇬 SG","🇭🇰 HK","🇹🇼 TW","🇪🇺 EU","DIRECT"],"🍎 Apple":["🚀 Proxy","DIRECT","🇭🇰 HK","🇯🇵 JP","🇸🇬 SG","🇺🇸 US"],"🍎 Apple CDN":["DIRECT","🍎 Apple","🚀 Proxy","🇭🇰 HK","🇯🇵 JP","🇸🇬 SG","🇺🇸 US"],"🧑‍💻 Microsoft":["🚀 Proxy","DIRECT","🇭🇰 HK","🇯🇵 JP","🇸🇬 SG","🇺🇸 US"],"🧑‍💻 Microsoft CDN":["DIRECT","🧑‍💻 Microsoft","🚀 Proxy","🇭🇰 HK","🇯🇵 JP","🇸🇬 SG","🇺🇸 US"],"☁️ OneDrive":["🧑‍💻 Microsoft","🇯🇵 JP","🇭🇰 HK","🇸🇬 SG","🇺🇸 US","DIRECT","🚀 Proxy"],"🌩️ Cloudflare":["🚀 Proxy","DIRECT","🇭🇰 HK","🇯🇵 JP","🇸🇬 SG","🇺🇸 US"],"🌏 爱奇艺&哔哩哔哩":["DIRECT","🇭🇰 HK","🇹🇼 TW","🚀 Proxy"],"📺 动画疯":["🇹🇼 TW","🚀 Proxy","DIRECT"],"🎮 Steam 登录/下载":["DIRECT","⬇️ Download","🚀 Proxy","🇦🇷 AR","🇷🇺 RU","🇹🇷 TR","🇮🇳 IN"],"🎮 Steam 商店/社区":["🚀 Proxy","🇦🇷 AR","🇷🇺 RU","🇹🇷 TR","🇮🇳 IN","DIRECT"],"🎓 学术网站":["DIRECT","🚀 Proxy"],"🛑 拦截广告":["REJECT","DIRECT","🚀 Proxy"],"🐟 漏网之鱼":["🚀 Proxy","DIRECT"]};

function main(config) {
  if (!config || typeof config !== 'object') return config;
  const nodeNames = (Array.isArray(config.proxies) ? config.proxies : [])
    .filter(p => p && typeof p.name === 'string' && p.server && p.type)
    .map(p => p.name);
  const providerNames = Object.keys(config['proxy-providers'] || {});
  if (!nodeNames.length && !providerNames.length) {
    // Never overwrite a profile with no available nodes.
    return config;
  }
  const nodes = [...new Set(nodeNames)];
  const nodeSet = new Set(nodes);
  const providerMode = providerNames.length > 0;
  const testUrl = 'http://latency-test.skk.moe/endpoint';
  const groups = [];
  const groupSet = new Set();
  const add = g => { groups.push(g); groupSet.add(g.name); };
  const definitions = [
    ['🇭🇰 HK', /香港|Hong\s*Kong|(?:^|[\s_\-])HK(?:[\s_\-]|$)|🇭🇰/i],
    ['🇯🇵 JP', /日本|Japan|(?:^|[\s_\-])JP(?:[\s_\-]|$)|🇯🇵/i],
    ['🇸🇬 SG', /新加坡|Singapore|(?:^|[\s_\-])SG(?:[\s_\-]|$)|🇸🇬/i],
    ['🇺🇸 US', /美国|United\s*States|(?:^|[\s_\-])US(?:[\s_\-]|$)|🇺🇸|🇺🇲/i],
    ['🇹🇼 TW', /台湾|Taiwan|(?:^|[\s_\-])TW(?:[\s_\-]|$)|🇹🇼|🇨🇳\s*台湾/i],
    ['🇪🇺 EU', /英国|德国|法国|United\s*Kingdom|Germany|France|(?:^|[\s_\-])(?:UK|GB|DE|FR)(?:[\s_\-]|$)|🇬🇧|🇩🇪|🇫🇷/i],
    ['🇰🇷 KR', /韩国|Korea|(?:^|[\s_\-])KR(?:[\s_\-]|$)|🇰🇷/i],
    ['🇦🇷 AR', /阿根廷|Argentina|🇦🇷/i],
    ['🇷🇺 RU', /俄罗斯|Russia|🇷🇺/i],
    ['🇹🇷 TR', /土耳其|Turkey|Türkiye|🇹🇷/i],
    ['🇮🇳 IN', /印度|India|🇮🇳/i],
  ];
  const cheap = /x\s*0\.(?:01|8)\b|(?:^|[\s|])0\.(?:01|8)\s*[x×]|低倍率/i;
  const free = /免费|free/i;
  const downloadOnly = /下载专用|download\s*only/i;
  const regionMembers = {};
  for (const [name, pattern] of definitions) {
    const matched = nodes.filter(n => pattern.test(n) && (name === '🇯🇵 JP' || name === '🇭🇰 HK' ? !cheap.test(n) && !free.test(n) && !downloadOnly.test(n) : true));
    regionMembers[name] = matched;
    if (matched.length || providerMode) {
      const g = {name, type: 'url-test', url:testUrl, interval:1200, lazy:true, tolerance:50};
      if (providerMode) {
        g.use = providerNames;
        // Mihomo provider filters are regex strings, independent of JavaScript RegExp.
        const providerFilters = {
          '🇭🇰 HK':'香港|Hong.?Kong|HK|🇭🇰',
          '🇯🇵 JP':'日本|Japan|JP|🇯🇵',
          '🇸🇬 SG':'新加坡|Singapore|SG|🇸🇬',
          '🇺🇸 US':'美国|United.?States|US|🇺🇸|🇺🇲',
          '🇹🇼 TW':'台湾|Taiwan|TW|🇹🇼',
          '🇪🇺 EU':'英国|德国|法国|UK|GB|DE|FR|🇬🇧|🇩🇪|🇫🇷',
          '🇰🇷 KR':'韩国|Korea|KR|🇰🇷',
          '🇦🇷 AR':'阿根廷|Argentina|🇦🇷',
          '🇷🇺 RU':'俄罗斯|Russia|🇷🇺',
          '🇹🇷 TR':'土耳其|Turkey|🇹🇷',
          '🇮🇳 IN':'印度|India|🇮🇳'
        };
        g.filter = providerFilters[name];
        if (name === '🇯🇵 JP' || name === '🇭🇰 HK') g['exclude-filter']='免费|free|下载专用|download.?only|x0\.01|x0\.8';
      }
      if (matched.length) g.proxies = matched;
      add(g);
    }
  }
  const remaining = nodes.filter(n => !definitions.some(([name, re]) => re.test(n)));
  if (remaining.length) add({name:'🌍 Other Regions',type:'select',proxies:remaining});
  else if (providerMode) {
    // An all-providers fallback for new or uncommon countries.
    add({name:'🌍 Other Regions',type:'select',use:providerNames});
  }
  const cheapNodes = nodes.filter(n => cheap.test(n));
  if (cheapNodes.length || providerMode) {
    const g={name:'💸 Low Cost',type:'url-test',url:testUrl,interval:1200,lazy:true,tolerance:50};
    if (cheapNodes.length) g.proxies=cheapNodes;
    if (providerMode) {g.use=providerNames;g.filter='x0\.01|x0\.8|低倍率';}
    add(g);
  }
  const freeJP = nodes.filter(n => free.test(n) && definitions[1][1].test(n));
  if (freeJP.length) add({name:'🎁 Free JP',type:'select',proxies:freeJP});
  const manual={name:'🧰 Manual Nodes',type:'select'};
  if (nodes.length) manual.proxies=nodes;
  if (providerMode) manual.use=providerNames;
  add(manual);
  const mainOptions=['🇭🇰 HK','🇯🇵 JP','🇸🇬 SG','🇺🇸 US','🇹🇼 TW','🇪🇺 EU','🌍 Other Regions','💸 Low Cost','🎁 Free JP','🧰 Manual Nodes'].filter(n=>groupSet.has(n));
  add({name:'🚀 Proxy',type:'select',proxies:mainOptions});
  for (const [name, options] of Object.entries(BUSINESS_GROUPS)) {
    const unique=[...new Set(options.map(x => groupSet.has(x) || nodeSet.has(x) || ['DIRECT','REJECT','REJECT-DROP','PASS'].includes(x) ? x : '🚀 Proxy'))];
    // Preserve preferred policy ordering after resolving unavailable countries.
    add({name,type:'select',proxies:unique.length?unique:['🚀 Proxy']});
  }
  // Rules targeting a country with zero nodes fall back to main Proxy.
  const valid = new Set(groups.map(g=>g.name).concat(nodes,['DIRECT','REJECT','REJECT-DROP','PASS']));
  const rules = SUKKA_RULES.map(line => {
    const parts=line.split(',');
    const policyIndex=parts[0]==='MATCH' ? 1 : 2;
    if (parts.length>policyIndex && !valid.has(parts[policyIndex])) parts[policyIndex]='🚀 Proxy';
    return parts.join(',');
  });
  config['proxy-groups']=groups;
  config['rule-providers']=JSON.parse(JSON.stringify(SUKKA_PROVIDERS));
  config.rules=rules;
  config.mode='rule';
  return config;
}
