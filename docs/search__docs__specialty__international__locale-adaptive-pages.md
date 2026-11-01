---
title: "Google 如何抓取语言区域自适应网页"
source: https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages?hl=zh_CN
slug: search__docs__specialty__international__locale-adaptive-pages
path: /search/docs/specialty/international/locale-adaptive-pages
---

# Google 如何抓取语言区域自适应网页

> 来源: https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# Google 如何抓取语言区域自适应网页

如果您的网站包含*语言区域自适应*网页（也就是说，您的网站会根据检测到的访问者所在国家/地区或访问者首选语言返回不同的内容），Google 可能不会将您的不同语言区域网页的所有内容都纳入抓取/索引/排名范围。这是因为，Googlebot 抓取工具的默认 IP 地址看起来是位于美国境内的。另外，该抓取工具在发送 HTTP 请求时并不会在请求标头中设置 `Accept-Language`。

**重要提示**：我们建议使用单独的语言区域网址配置，并为它们添加 [`rel="alternate"` hreflang 注解](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)。

## 基于地理位置的抓取

除了使用美国境内的 IP 地址之外，Googlebot 还会使用美国境外的 IP 地址进行抓取。

正如我们一直建议的，当 Googlebot 看似来自特定国家/地区时，请像对待来自该国家/地区的任何其他用户一样对待它。这意味着，如果您阻止位于美国的用户访问您的内容，但允许来自澳大利亚的用户访问，那么您的服务器就应该阻止看似来自美国的 Googlebot 访问，但允许看似来自澳大利亚的 Googlebot 访问。

### 其他注意事项

- Googlebot 对所有抓取配置使用相同的用户代理字符串。详细了解 [Google 抓取工具使用的用户代理字符串](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=zh-cn)。
- 您可以使用 DNS 反向查找来[验证 Googlebot 基于地理位置的抓取](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn)。
- 如果您的网站使用的是 [*robots 协议*](https://www.rfc-editor.org/rfc/rfc9309.html)，请确保在所有语言区域内一致地应用该协议。这意味着，[漫游器 `meta` 标记](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn)和 [robots.txt 文件](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=zh-cn)必须为每个语言区域指定相同的规则。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
