---
title: "分页和增量加载以及它们对 Google 搜索的影响"
source: https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading?hl=zh_CN
slug: search__docs__specialty__ecommerce__pagination-and-incremental-page-loading
path: /search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
---

# 分页和增量加载以及它们对 Google 搜索的影响

> 来源: https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 分页和增量加载以及它们对 Google 搜索的影响

 您可以通过显示部分搜索结果来提升网页性能，从而改善网站用户的体验，但您可能需要采取措施，确保 Google 抓取工具能够找到您的所有网站内容。

 例如，在电子商务网站上，当用户使用搜索框进行搜索后，可以向用户显示一部分可以购买的商品。这是因为完整的匹配结果可能太多，无法在一个网页上显示，或者需要的检索时间过长。

 除了搜索结果，您还可以在电子商务网站上加载以下内容的部分结果：

-  链接到不同商品类别的网页（其中包含了对应类别的全部商品）
-  网站在一段时间内发布的博文或简报标题
-  商品网页上的用户评价
-  博文的评论

 让网站以增量方式加载内容来响应用户操作，就可以通过以下形式使用户受益：

-  改善用户体验，因为初始网页加载速度比一次性加载全部结果快。
-  减少网络流量，这对移动设备而言尤为重要。
-  减少从数据库或类似来源检索到的内容数量，提高后端性能。
-  避免因列表过长、达到资源上限而导致浏览器和后端系统出错，进而提高可靠性。

##  为网站选择最佳用户体验模式

 要显示某个较大列表的子集，您可以选择不同的用户体验模式：

-  **分页**：用户可以使用“下一页”、“上一页”和页码等链接在不同网页之间进行导航，一次显示一页结果。
-  **加载更多**：点击此按钮，用户即可展开一组初始的显示结果。
-  **无限滚动**：用户滚动到网页末尾，即可加载更多内容。 （详细了解[有关使无限滚动网页便于搜索的几项建议](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading?hl=zh-cn#paginated-infinite-scroll)）。

 在选择最适合您网站的用户体验时，请参考下表。

用户体验模式

 分页

 **优点**：

-  让用户深入了解结果总数和当前位置

 **缺点**：

-  用户在浏览结果时需要进行更复杂的操控
-  系统将内容拆分成多个网页，而不是形成单个连续列表
-  需要加载新网页才能查看更多内容

 加载更多

 **优点**：

-  所有内容都在同一个网页上
-  可（在按钮上或按钮附近）向用户显示结果总数

 **缺点**：

-  无法处理数量非常多的结果，因为所有结果都包含在一个网页上

 无限滚动

 **优点**：

-  所有内容都在同一个网页上
-  直观 – 用户只需不断滚动屏幕，即可查看更多内容

 **缺点**：

-  由于结果总数不明确，可能导致“滚动疲劳”
-  无法处理数量非常多的结果

##  Google 如何针对不同的策略编制索引

 为您的网站和搜索引擎优化 (SEO) 计划选择最合适的用户体验策略后，请确保 Google 抓取工具能够找到您的所有内容。

 例如，您可以使用指向电子商务网站上新网页的链接，或使用 JavaScript 更新当前网页，从而实现分页。“加载更多”功能和无限滚动模式通常使用 JavaScript 实现。在抓取网站以寻找要编入索引的网页时，Google 通常会抓取在 `<a>` 元素的 `href` 属性中找到的网址。Google 的抓取工具不会“点击”按钮，通常也不会触发需要用户操作才能更新当前网页内容的 JavaScript 功能。

 如果您的网站使用 JavaScript，请遵循 [JavaScript 搜索引擎优化 (SEO) 最佳实践](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=zh-cn)。 除了最佳实践，例如确保网站上的链接可被抓取，您还应考虑使用[站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn)文件或 [Google Merchant Center Feed](https://support.google.com/merchants/answer/7439058?hl=zh-cn)，帮助 Google 找到您网站上的所有商品。

##  实现分页时的最佳实践

 若要确保 Google 能够抓取您的分页内容并将其编入索引，请遵循以下最佳实践：

-  [依序链接网页](#sequentially)
-  [正确使用网址](#use-urls-correctly)
-  [避免将应用过滤器的网址或排列顺序不同的网址编入索引](#avoid-indexing-variations)

###  依序链接网页

 为确保搜索引擎理解分页内容的网页之间的关系，请使用 `<a href>` 标记在每个网页上添加指向下一页的链接。这有助于 Googlebot（Google 网页抓取工具）找到后续网页。

 此外，还可以考虑从某集合中的各个网页链接回该集合的第一页，向 Google 强调这是该集合的起始页。这样可以告知 Google，该集合中的第一页可能比其他网页更适合用作着陆页。

 注意：通常，我们建议您为网页指定不同的标题，以帮助区分网页。不过，分页序列中的网页不需要遵循此建议。您可以为序列中的所有网页使用相同的标题和说明。Google 会尝试识别序列中的网页，并将其相应地编入索引。

###  正确使用网址

-  **为每个网页提供唯一网址**。 例如，添加 `?page=n` 查询参数，因为 Google 会将分页序列中的网址视为不同的网页。
-  **不要将分页序列的第一个网页用作规范网页**。 应为每个网页提供各自的[规范网址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)。
-  **不要对集合中的页码使用网址片段标识符（网址中 `#` 后面的文本）**。 Google 会忽略片段标识符。如果 Googlebot 看到下一页的网址只有 `#` 后面的文本不同，则认为它已检索该网页，因此可能不会跟踪该链接。
-  **考虑使用[预加载、预连接或预提取功能](https://web.dev/learn/performance/resource-hints?hl=zh-cn)**，改善用户进入下一页时的体验。

 过去，Google 使用 `<link rel="next" href="...">` 和 `<link rel="prev" href="...">` 识别下一页和上一页的关系。Google 已不再使用这些标记，但其他搜索引擎可能仍在使用这些链接。

###  避免将应用过滤器的网址或排列顺序不同的网址编入索引

 对于较长的结果列表，您的网站可能支持应用过滤器或者按不同的条件对结果进行排序。例如，您可能支持对网址使用 `?order=price`，以返回按价格排序的同一结果列表。

 为避免将同一结果列表的变体编入索引，请使用 [`noindex`robots`meta` 标记](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=zh-cn)阻止 Google 将不需要的网址编入索引，也可以[使用 robots.txt 文件阻止 Google 抓取特定格式的网址](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt?hl=zh-cn#url-matching-based-on-path-values)。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
