---
title: "排查 Google 搜索抓取错误"
source: https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors?hl=zh_CN
slug: search__docs__crawling-indexing__troubleshoot-crawling-errors
path: /search/docs/crawling-indexing/troubleshoot-crawling-errors
---

# 排查 Google 搜索抓取错误

> 来源: https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 排查 Google 搜索抓取错误

以下是排查和解决网站的 Google 搜索抓取问题的关键步骤：

1. [查看 Googlebot 是否在您的网站上遇到了可用性问题](#availability_issues)。
2. [查看您是否有未被抓取但应被抓取的网页](#not_crawled_should_be)。
3. [查看是否需要提高网站中某些部分被抓取的速度](#updates)。
4. [提高您网站的抓取效率](#improve_crawl_efficiency)。
5. [处理网站被过度抓取的问题](#emergencies)。

## 查看 Googlebot 是否在您的网站上遇到了可用性问题

改善网站的可用性不一定会增加抓取预算；如前所述，Google 会根据抓取需求来确定最佳抓取速度。但是，可用性问题确实会导致 Google 无法按照其期望的频率来抓取您的网站。

**诊断**：

 在[“抓取统计信息”报告](https://support.google.com/webmasters/answer/9679690?hl=zh-cn)中查看 Googlebot 对您网站的抓取历史记录。该报告会显示 Google 何时在您的网站上遇到了可用性问题。如果系统针对您的网站报告了可用性错误或警告，请在**主机可用性**图表中查找 Googlebot 请求超出上限（用红线表示）的实例，点击进入图表查看哪些网址不可用，并尝试将这些网址与您网站上的问题关联起来。

 此外，您还可以使用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)测试您网站上的多个网址。如果该工具返回[**已超出主机负载**](https://support.google.com/webmasters/answer/9012289?hl=zh-cn#live_indexable&zippy=,additional-response-data,url-status-live-test,site-wide-availability-issues,availability-live-test)警告，则表示 Googlebot 从您的网站中抓取的网址会少于它在其中发现的网址。

**解决方案**：

- 请查看[“抓取统计信息”报告文档](https://support.google.com/webmasters/answer/9679690?hl=zh-cn)，了解如何查找和处理一些可用性问题。
- **如果您不希望 Google 抓取您的网页，请禁止 Google 抓取该网页。**（请参阅**[管理您的网址目录](https://developers.google.com/crawling/docs/crawl-budget?hl=zh-cn#manage_inventory)）
- **提高网页加载和渲染速度**。（请参阅**[提高您的网站抓取效率](#improve_crawl_efficiency)）
- **增加服务器容量**。如果 Google 在抓取网站时似乎一直达到服务器容量上限，但您仍有一些重要网址的抓取和更新频率达不到其所需频率，那么，提供更多服务资源可能会使 Google 能够请求抓取您网站上的更多网页。请在[“抓取统计信息”报告](https://support.google.com/webmasters/answer/9679690?hl=zh-cn)中查看您的主机可用性历史记录，了解 Google 的抓取速度是否经常超出上限。如果是，请增加服务资源达一个月，并查看抓取请求数在这一时间段内是否增加了。

## 查看您网站中是否有应被抓取但未被抓取的部分

Google 会在您的网站上花费尽可能多的时间，以便将其能够找到的所有对用户有价值的高品质内容编入索引。如果您认为 Googlebot 遗漏了重要内容，可能是因为它不知道该内容、该内容已对 Google 屏蔽，或者您的网站可用性限制了 Google 的访问权限（或者 Google 在尽力不让您的网站负载过重）。

请注意抓取和索引编制之间的区别。**** 本页的主题是如何帮助 Google 高效地**抓取您的网站，而不是所发现的网页是否会编入索引。

**诊断**：

Search Console 不会为您的网站提供可以按网址或路径过滤的抓取历史记录，但您可以检查网站日志，看看特定网址是否已被 [Googlebot](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=zh-cn) 抓取。这些已抓取的网址是否已被编入索引就另当别论了。

请注意，对于大多数网站，新网页至少需要几天时间才能被发现；大多数网站的网址都不会在当天被抓取，但新闻网站等具有时效性的网站除外。

**解决方案**：

如果您向网站添加了网页，但这些网页未在合理的时间内被抓取，可能是因为 Google 不知道这些网页、相关内容已被屏蔽、您的网站已达到服务器容量上限，或者您[已超出抓取预算](https://developers.google.com/crawling/docs/crawl-budget?hl=zh-cn#more-crawl-budget)。

1. 将新网页告知 Google：更新站点地图以反映新网址。
2. 检查您的 robots.txt 规则，确认您没有意外屏蔽网页。
3. 查看抓取优先级（也就是明智地使用抓取预算）。[管理您的网址目录](https://developers.google.com/crawling/docs/crawl-budget?hl=zh-cn#manage_inventory)并[提高您的网站抓取效率](#improve_crawl_efficiency)。
4. [确保您没有用完服务器容量](#availability_issues)。 如果 Googlebot 检测到您的服务器在响应抓取请求时遇到问题，将会降低抓取速度。

请注意，如果相关内容没有足够的价值或用户需求，那么即使网页被抓取，也可能不会显示在搜索结果中。

## 查看更新内容的抓取速度是否足够快

如果我们遗漏了您网站上的新网页或更新过的网页，可能是因为我们没有发现这些网页，或者没有注意到这些网页已更新。您可以通过以下方式帮助我们了解网页更新。

请注意，Google 一直在努力及时检查网页并将其编入索引。对于大多数网站，此过程至少需要三天的时间。除非您的网站是新闻网站或包含其他高价值、极具时效性的内容，否则不要指望 Google 会在您发布网页的当天将其编入索引。

**诊断**：

检查您的网站日志，了解 [Googlebot](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=zh-cn) 何时抓取了特定网址。

若要了解编入索引的日期，请使用网址检查工具或搜索您更新的网址。

**解决方案**：

**正确做法**：

- 如果您的网站包含新闻内容，请使用 [Google 新闻站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap?hl=zh-cn)。
- 在站点地图中使用 `<lastmod>` 标记指明编入索引的网址的更新时间。
- 使用[可抓取的网址结构](https://developers.google.com/search/docs/crawling-indexing/url-structure?hl=zh-cn)帮助 Google 找到您的网页。
- 提供标准[可抓取的 `<a>` 链接](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=zh-cn#crawlable-links)，以便 Google 找到您的网页。
- 如果您的网站为移动版和桌面版使用了单独的 HTML，请在移动版上提供与桌面版相同的链接。如果无法在移动版上提供相同的链接，请确保将这些链接包含在[站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=zh-cn)文件中。 Google 只会[将网页的移动版编入索引](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing?hl=zh-cn)，限制在移动版中显示的链接可能会降低发现新网页的速度。

**应避免以下做法**：

- 每天多次提交同一个未更改的站点地图。
- 期望 Googlebot 抓取站点地图中的所有内容，或立即抓取这些内容。 站点地图可以为 Googlebot 提供实用的建议，但不是绝对要求。
- 在站点地图中添加[您不希望显示在搜索结果中](#hide_urls)的网址。 这可能会将您的抓取预算浪费在您不希望编入索引的网页上。

## 提高您网站的抓取效率

### 提高网页加载速度

 Google 的抓取过程受带宽、时间和 Googlebot 实例可用性的限制。 如果您的服务器能够更快地响应请求，我们或许可以抓取您网站上的更多网页。即便如此，Google 只想抓取优质内容，因此单靠提高质量低劣网页的加载速度并不能鼓励 Googlebot 抓取您网站上的更多内容；相反，如果我们认为我们遗漏了您网站上的优质内容，可能会增加预算来抓取这些内容。

您可以通过以下方法优化您的网页和资源以供抓取：

- 使用 robots.txt 阻止 Googlebot 加载较大而不重要的资源。 确保仅屏蔽非关键资源，即对理解网页含义无关紧要的资源（如装饰图片）。
- 确保网页能够快速加载。
- 留意很长的重定向链，以免对抓取产生负面影响。
- 响应服务器请求花费的时间以及渲染网页所需的时间都很重要，包括嵌入式资源（例如图片和脚本）的加载时间和运行时间。请注意需要编入索引的较大或加载速度缓慢的资源。

### 使用 HTTP 状态代码指定内容更改

 Google 通常支持使用 [`If-Modified-Since` 和 `If-None-Match` HTTP 请求标头](https://developer.mozilla.org/docs/Web/HTTP/Headers/If-Modified-Since)进行抓取。Google 抓取工具不会在每次尝试抓取时都发送标头；这取决于请求的用例（例如，[AdsBot](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=zh-cn#adsbot) 更有可能设置 `If-Modified-Since` 和 `If-None-Match` HTTP 请求标头）。如果我们的抓取工具发送 `If-Modified-Since` 标头，则该标头的值就是上次抓取相应内容的[日期和时间](https://www.rfc-editor.org/rfc/rfc9110#name-if-modified-since)。服务器可能会根据该值选择返回不含响应正文的 `304 (Not Modified)` HTTP 状态代码，在这种情况下，Google 会重复使用上次抓取的内容版本。如果内容晚于抓取工具在 `If-Modified-Since` 标头中指定的日期，服务器可能会返回包含响应正文的 `200 (OK)` HTTP 状态代码。

 如果自 Googlebot 上次访问相应网址后内容未发生更改，那么无论请求标头是什么，您都可以针对任何 Googlebot 请求发送没有响应正文的 `304 (Not Modified)` HTTP 状态代码。这样可以节省服务器处理时间和资源，可能会间接提高抓取效率。

## 隐藏您不希望显示在搜索结果中的网址

 将服务器资源浪费在不必要网页上会减少真正重要网页被抓取的机会，这可能会显著延迟我们在网站上发现精彩新内容或更新后内容的时间。

除非 Google 已达到您网站的服务上限，否则即使用屏蔽或隐藏的方式防止已抓取网页被重新抓取，也不会将您的抓取预算转移到网站的其他部分。

 如果 Google 搜索服务发现您网站上有很多不希望被抓取的网址，可能会对网站的抓取及索引编制造成不利影响。通常，这些网址分为以下类别：

-  [分面导航](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation?hl=zh-cn)和[会话标识符](https://developers.google.com/search/blog/2007/09/google-duplicate-content-caused-by-url?hl=zh-cn)：分面导航通常是来自网站的重复内容；会话标识符以及其他仅用于排序或过滤网页的网址参数不会提供新内容。了解如何[管理对分面导航网页的抓取](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation?hl=zh-cn)。
- [重复内容](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)：帮助 Google 识别重复内容，以避免不必要的抓取。
- [`soft 404` 网页](#soft-404-errors)：当网页不再存在时，返回 `404` 代码。
- [被黑网页](https://developers.google.com/search/docs/monitor-debug/security/what-is-hacked?hl=zh-cn)：请务必查看[“安全问题”报告](https://search.google.com/search-console/security-issues?hl=zh-cn)，并修正或移除所发现的所有被黑网页。
- [无限空间](https://developers.google.com/search/blog/2008/08/to-infinity-and-beyond-no?hl=zh-cn)和代理：使用 robots.txt 禁止 Googlebot 抓取这些内容。
- [低劣品质和垃圾内容](https://developers.google.com/search/docs/essentials/spam-policies?hl=zh-cn)：显然，最好避免此类内容。
- 购物车网页、无限滚动网页和执行某项操作的网页（例如“注册”或“立即购买”网页）。

**正确做法**：

- 如果您根本不希望 Google 抓取某项资源或某个网页，请使用 robots.txt。
- 如果在多个网页（例如共享的图片或 JavaScript 文件）中重复使用了相同的资源，请在每个网页中通过同一个网址引用该资源，以便 Google 可以缓存和重复使用同一项资源，而无需多次请求同一项资源。

**应避免以下做法**：

- 请不要为了重新为您的网站分配抓取预算，而定期在 robots.txt 中添加或从中移除网页或目录。请仅对您不想长时间在 Google 中显示的网页或资源使用 robots.txt。
- 切勿交换站点地图或使用其他临时隐藏机制重新分配预算。

### `soft 404` 个错误

 `soft 404` 错误是一个网址，会在返回的页面中向用户表明目标网页不存在，**同时还会返回 [`200 (success)`](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success) 状态代码**。在某些情况下，软 404 可能是一个不含任何主要内容的页面或是一个空页面。

 此类网页可能是由网站的网络服务器、内容管理系统或用户的浏览器出于各种原因生成的。例如：

- 缺少服务器端包含 (SSI) 文件。
- 与数据库的连接中断。
- 空的内部搜索结果页。
- 未加载或缺少 JavaScript 文件。

 返回 `200 (success)` 状态代码，但在网页上显示或建议了错误消息或某种类型的错误，这会导致糟糕的用户体验。用户可能会认为该网页是正常运行的网页，但之后却出现了某种错误。此类网页不会显示在搜索结果中。

 当 Google 算法根据网页的内容检测到该网页实际上是错误网页时，Search Console 会在网站的[“网页索引编制”报告](https://support.google.com/webmasters/answer/7440203?hl=zh-cn)中显示 `soft 404` 错误。

#### 修正 `soft 404` 错误

 您可以通过多种方式解决 `soft 404` 错误，具体取决于网页的状态和您想要的结果：

- [网页和内容已不再存在](#pagegone)。
- [网页或内容现已移到别处](#pagemoved)。
- [网页和内容仍然存在](#pageother)。

 请尝试确定最适合用户的解决方案。

##### 网页和内容已不再存在

 如果您移除了相应网页，并且您的网站上没有含类似内容的替换网页，请针对该网页返回 [`404 (not found)` 或 `410 (gone)`](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors) 响应（状态）代码。这些状态代码会告知搜索引擎：该网页不存在，并且您不希望搜索引擎将该网页编入索引。

 如果您有权访问服务器的配置文件，可以自定义这类错误页面，以便为用户提供帮助。一个好的自定义 `404` 页面会帮助用户找到所需信息，还会提供其他实用内容，促使用户进一步浏览您的网站。以下是一些技巧，帮助您设计实用的自定义 `404` 页面：

-  明确告诉访问者无法找到其要找的网页。采用友好并有吸引力的语言。
-  确保 `404` 页面的外观和风格（包括导航方式）与网站的其他网页一致。
-  考虑添加指向您的最热门文章/博文以及网站首页的链接。
- 不妨提供一种供用户报告链接损坏的方式。

 自定义 `404` 网页是专为用户创建的。由于从搜索引擎的角度来看，这些网页没有任何用处，因此请确保服务器返回 `404` HTTP 状态代码，以防止这些网页被编入索引。

##### 网页或内容现已移到别处

 如果您的网页已移走或有明确的替换网页，请返回 [`301 (permanent redirect)`](https://developers.google.com/search/docs/crawling-indexing/301-redirects?hl=zh-cn) 以重定向用户。这样做不会中断用户的浏览体验，还是一种将网页新位置告知搜索引擎的好办法。 请使用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)验证您的网址是否确实返回了正确的代码。

##### 网页和内容仍然存在

 如果系统将某个本身正常的网页标记为 `soft 404` 错误，可能是因为 Googlebot 无法加载该网页、该网页在渲染期间缺少重要资源或显示醒目的错误消息。请使用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)检查渲染的内容和返回的 HTTP 代码。如果渲染的是空白、几乎空白的网页或内容显示错误消息，可能是因为您的网页引用了许多无法加载的资源（图片、脚本和其他非文本元素），这种情况可解读为 `soft 404` 错误。无法加载资源的原因包括：资源被屏蔽（遭到 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=zh-cn) 屏蔽）、网页包含的资源过多/过大、各类服务器错误或者资源加载速度缓慢。

## 处理您的网站遭过度抓取的问题（紧急情况）

Googlebot 会采用相关算法，以免您的网站因抓取请求而负载过重。 不过，如果您发现 Googlebot 会让您的网站负载过重，可以采取一些应对措施。

**诊断**：

监控服务器，查看 Googlebot 向您网站发出的请求是否过多。

**解决方案**：

在紧急情况下，我们建议您按照以下步骤放慢 Googlebot 的抓取速度：

1. 当服务器负载过重时，针对 Googlebot 请求暂时返回 `503` 或 `429` HTTP 响应状态代码。**Googlebot 会重新尝试抓取这些网址大约 2 天。请注意，如果在数日内返回“no availability”代码，会导致 Google 永久减慢对您网站上网址的抓取速度或永久停止抓取这些网址，因此请按照接下来的后续步骤继续操作。
2.  当抓取速度变慢时，不再针对抓取请求返回 `503` 或 `429` HTTP 响应状态代码；返回 `503` 或 `429` 的时间超过 2 天会导致 Google 从索引中移除这些网址。
3. 持续监控抓取和主机容量。
4.  如果存在问题的抓取工具是某个 [AdsBot 抓取工具](https://developers.google.com/search/docs/crawling-indexing/google-special-case-crawlers?hl=zh-cn#adsbot-mobile-web)，那么问题可能在于您为 Google 尝试抓取的网站创建了[动态搜索广告定位条件](https://support.google.com/google-ads/answer/2497706?hl=zh-cn)。系统每 3 周会再次进行该抓取。如果您的服务器容量不足以处理这类抓取，请限制广告定位条件或增加服务器容量。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-22。
