---
title: "什么是规范化"
source: https://developers.google.com/search/docs/crawling-indexing/canonicalization?hl=zh_CN
slug: search__docs__crawling-indexing__canonicalization
path: /search/docs/crawling-indexing/canonicalization
---

# 什么是规范化

> 来源: https://developers.google.com/search/docs/crawling-indexing/canonicalization?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 什么是规范化

 规范化是指选择一段内容的有代表性的**规范**网址的过程。因此，规范网址是指 Google 从一组重复网页中选出的最具代表性的网页的网址。此过程通常称为重复信息删除，有助于 Google 在搜索结果中仅显示重复内容的一个版本。

网站包含重复内容的原因有很多：

-  **区域变体**：例如，带有 [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn) 的不同美国和英国网址，但实质上是同一语言的相同内容
- **设备变体**：例如，一个网页既有移动版又有桌面版
- **协议变体**：例如，网站的 HTTP 版本和 HTTPS 版本
- **网站函数**：例如，类别网页的排序函数和过滤函数的结果
- **意外变体**：例如，网站的演示版本意外仍可供抓取工具访问

 网站上的某些重复内容是正常的，并不违反 [Google 的垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies?hl=zh-cn)。但是，多个不同网址访问的是相同内容可能会导致用户体验不佳（例如，用户可能会想知道哪个是正确的网页，以及两者之间是否存在差异），可能会让您更难跟踪自己的**内容在搜索结果中的表现。

### Google 如何将网站编入索引并选择规范网址

 [Google 将网页编入索引](https://developers.google.com/search/docs/fundamentals/how-search-works?hl=zh-cn)时，会确定每个网页的主要内容（或“核心”）。**如果 Google 发现多个网页似乎相同或者主要内容非常相似，则会将它们归为一组。然后，Google 会根据索引编制流程收集的因素（或“信号”**），选择客观来说对搜索用户而言最完整、最实用的网页，并将其标记为规范网页。为了减少 Google 对网站的抓取工作量，我们会经常抓取规范网页，而不会频繁地抓取重复网页。

 有一些因素会影响规范化：网页是通过 HTTP 还是 HTTPS 提供、重定向、站点地图中是否出现了相应网址，以及 `rel="canonical"``link` 注释。您可运用上述方法[告知 Google 您更愿意使用哪个网页](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn#define-canonical)，但 Google 仍可能会因各种原因另选一个网页作为规范网页。也就是说，指明首选规范网页是一个提示，而非规则。

 对于同一网页的不同语言版本，仅当这些网页的主要内容采用相同的语言时，才会被视为重复网页（也就是说，如果仅网页的页眉、页脚和其他非重要文字翻译了，但其正文部分未变，那么这些网页会被视为重复网页）。对于使用相同语言的区域变体（例如，面向美国和英国的一段内容可通过不同的网址访问，但实质上是同一语言的相同内容），请同时使用规范化和 [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)，以帮助 Google 更好地了解应在搜索结果中显示哪个区域网址。如需了解详情，请参阅有关[在多区域网站上处理重复网页](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites?hl=zh-cn#dup-content)的文档。

 在评估内容和质量时，Google 会使用规范网页作为主要来源。Google 搜索结果通常会指向规范网页，除非某个重复网页明显与搜索用户的查询更相符。例如，如果用户使用的是移动设备，那么即使桌面版网页为规范网页，搜索结果也可能会指向移动版网页。

 详细了解[如何指明您的首选规范网址以及您是否需要指明](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-09-11。
