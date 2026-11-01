---
title: "了解站点地图"
source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=zh_CN
slug: search__docs__crawling-indexing__sitemaps__overview
path: /search/docs/crawling-indexing/sitemaps/overview
---

# 了解站点地图

> 来源: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 了解站点地图

 *站点地图*是一种文件，您可在其中提供与您网站中的网页、视频或其他文件有关的信息，也可以说明这些内容之间的关系。Google 等搜索引擎会读取此文件，以便更高效地抓取您的网站。站点地图会告诉搜索引擎您认为网站中的哪些网页和文件比较重要，还会提供与这些文件有关的重要信息。例如，网页上次更新的时间和网页是否有任何备用的语言版本。

 您可以使用站点地图提供与特定类型的网页内容（包括[视频](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn)、[图片](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=zh-cn)和[新闻](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap?hl=zh-cn)内容）有关的信息。例如：

-  站点地图视频条目可以指定视频的时长、评分以及适合哪些年龄段的受众。**
-  站点地图图片条目中可包含网页中所含图片的位置。**
-  站点地图新闻条目中可包含报道标题和发布日期。**

如果您使用的是 WordPress、Wix 或 Blogger 等 CMS，那么您的 CMS 可能已经[向搜索引擎提供了站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#cmssitemap)，您无需采取任何措施。

## 我需要站点地图吗？

 如果您网站上的网页链接得当，那么 Google 通常能够发现其中的大多数网页。 链接得当是指您认为重要的所有网页都可以通过某些形式的导航（例如您网站的菜单，或您放入网页中的链接）抵达。即便如此，站点地图仍有助于我们更加高效地抓取规模更大、更复杂的网站或更特殊的文件。

 站点地图可帮助搜索引擎发现网站上的网址，但并不保证 Google 能抓取站点地图中的所有内容并将其编入索引。但在大多数情况下，您的网站都会因使用站点地图而受益。

**在以下情况下，您可能需要站点地图**：

-  **您的网站很大。**一般来说，在大型网站上，要确保网站上的每个网页都至少被另外一个网页链接更为困难。因此，[Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot?hl=zh-cn) 更有可能发现不了您的某些新网页。
-  **网站为新网站且指向该网站的外部链接不多。**Googlebot 及其他网页抓取工具通过访问之前抓取过的网页中找到的网址来抓取网页。因此，如果没有其他网站链接到您的网页，Googlebot 可能发现不了您的网页。
-  **您的网站包含大量富媒体内容（视频、图片）或显示在 Google 新闻中。** Google 可将站点地图中的其他信息纳入搜索范围。

**在以下情况下，您可能不需要站点地图**：

-  **您的网站规模“较小”。**规模较小是指网站上的网页数不超过 500 个。只有您认为需要纳入搜索结果中的网页才会计入此总数。
-  **您的网站已在内部全面建立链接。**这意味着，Googlebot 可以沿着首页的链接找到您网站上的所有重要网页。
-  您想在搜索结果中显示的**媒体文件（视频、图片）或新闻网页不多**。站点地图可帮助 Google 找到并了解您网站上的视频和图片文件或新闻报道。如果您不希望这些结果显示在 Google 搜索中，则可能不需要站点地图。

## 创建站点地图

 如果您确定需要站点地图，请[详细了解如何创建站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn)。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
