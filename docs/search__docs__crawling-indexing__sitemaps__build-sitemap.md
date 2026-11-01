---
title: "创建和提交站点地图"
source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh_CN
slug: search__docs__crawling-indexing__sitemaps__build-sitemap
path: /search/docs/crawling-indexing/sitemaps/build-sitemap
---

# 创建和提交站点地图

> 来源: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 创建和提交站点地图

 本页面旨在介绍如何创建站点地图并将其提供给 Google。如果您刚开始接触站点地图，请[先阅读我们的简介](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=zh-cn)。

 Google 支持由[站点地图协议](https://www.sitemaps.org/protocol.html#otherformats)定义的站点地图格式。每种格式都有各自的优势和不足之处；请选择最适合您的网站和设置的站点地图格式（Google 没有偏好）。下表比较了不同的站点地图格式：

站点地图比较

 [XML 站点地图](#xml)

 XML 站点地图是用途最广的站点地图格式。该格式易于扩展，可用于提供关于[图片](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=zh-cn)、[视频](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn)和[新闻](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap?hl=zh-cn)内容的其他数据，以及网页的[本地化版本](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)。

 **优点：**

- 可扩展且用途广泛。
- 它可以提供有关网址的最详细信息。
- 大多数内容管理系统 (CMS) 会自动生成站点地图，或者 CMS 用户可以找到大量站点地图插件。

 **缺点：**

- 处理起来可能会很麻烦。
-  在大型网站或网址经常改变的网站上维护映射可能会比较复杂。

[RSS、mRSS 和 Atom 1.0](#rss)

 RSS、mRSS 和 Atom 1.0 站点地图在结构上与 XML 站点地图类似，但它们通常最容易提供，因为 CMS 会自动创建这些站点地图。

 **优点：**

- 大多数 CMS 会自动生成 RSS 和 Atom Feed。
- 可用于向 Google 提供有关您视频的信息。

 **缺点：**

-  除了 [HTML 和其他可编入索引的文本内容](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types?hl=zh-cn)之外，它只能提供视频相关信息，而不能提供图片或新闻相关信息。
- 处理起来可能会很麻烦。

[文本站点地图](#text)

 这是最简单的站点地图格式，只能列出指向 HTML 和其他可编入索引的网页的网址。

**优点**：

- 易于执行和维护，尤其是在大型网站上。

**缺点**：

-  仅限 HTML 和其他可编入索引的文本内容。

## 站点地图最佳做法

 站点地图最佳做法由[站点地图协议](https://www.sitemaps.org/protocol.html)定义。最容易被忽略的最佳做法与大小限制、站点地图位置以及站点地图中包含的网址相关。

 **站点地图大小限制**：无论采用哪种格式，单个站点地图的文件大小一律不得超过 50MB（未压缩），并且其中包含的网址数量不得超过 50,000 个，否则必须将站点地图拆分成多个较小的站点地图。您也可以选择创建[站点地图索引](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps?hl=zh-cn)文件，然后将这个索引文件提交给 Google。您可以向 Google 提交多个站点地图和站点地图索引文件。如果您想在 Search Console 中跟踪各个站点地图的搜索效果，这么做可能会很有用。

 **站点地图文件编码和位置**：站点地图文件必须采用 UTF-8 编码。您可以将站点地图托管在网站的任何位置，但除非您通过 [Search Console](#addsitemap) 提交站点地图，否则站点地图只会影响父级目录中的下级目录。因此，如果站点地图发布在网站的根目录下，则可以影响网站上的所有文件，所以我们建议将站点地图发布在此目录下。

 **引用网址的属性**：请在站点地图中使用完全限定的绝对网址。Google 会尝试抓取您列出的网址。例如，如果网站位于 `https://www.example.com/`，请不要指定诸如 `/mypage.html`（相对网址）这样的网址，而是使用完整的绝对网址：`https://www.example.com/mypage.html`。

 在站点地图中添加您希望在 Google 搜索结果中看到的网址。Google 通常会在其搜索结果中显示[规范网址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)，而您可以通过站点地图加以影响。如果您为网页的移动版和桌面版提供了不同的网址，建议在站点地图中仅指向一个版本。但是，如果您认为需要同时指向这两个网址，请为网址[添加注解](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing?hl=zh-cn#additional-best-practices)，指明桌面版和移动版分别是哪个。

 如需查看完整的最佳做法列表，请参阅[站点地图协议](https://www.sitemaps.org/protocol.html)。

## XML 站点地图

 XML 站点地图是用途最广的受支持站点地图格式。借助 Google 支持的站点地图扩展，您还可以提供有关[图片](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=zh-cn)、[视频](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn)和[新闻](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap?hl=zh-cn)内容的更多信息以及网页的[本地化版本](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)。

下方是一个非常基本的 XML 站点地图，其中仅包含 1 个网址的位置信息：

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/foo.html</loc>
    <lastmod>2022-06-04</lastmod>
  </url>
</urlset>
```

 您可以在 [sitemaps.org](https://www.sitemaps.org/protocol.html) 上找到更复杂的示例和完整文档。

### 关于 XML 站点地图的其他说明

-  和所有 XML 文件一样，所有标记值都必须[实体转义](https://www.sitemaps.org/protocol.html#escaping)。
-  Google 会忽略 `<priority>` 和 `<changefreq>` 值。
-  如果 `<lastmod>` 值始终准确并可验证（例如通过与网页的最后修改日期进行比较），Google 会使用该值。
 该 `<lastmod>` 值应反映对网页的最后一次重大更新的日期和时间。例如，对网页上的主要内容、结构化数据或链接的更新通常被视为重大更新，但对版权日期的更新则不属于重大更新。

## RSS、mRSS 和 Atom 1.0

 如果您的 CMS 会生成 RSS 或 Atom Feed，您可以将该 Feed 的网址作为站点地图提交。 大多数 CMS 都会为您创建 Feed，但请注意，此类 Feed 仅提供近期网址的相关信息。

### 关于 RSS、mRSS 和 Atom 1.0 的其他说明

-  Google 支持 RSS 2.0 Feed 和 Atom 1.0 Feed。
-  您可以使用 [mRSS（媒体 RSS）Feed](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn) 向 Google 提供有关您网站上视频内容的详情。
-  和所有 XML 文件一样，所有标记值都必须[实体转义](https://www.sitemaps.org/protocol.html#escaping)。

## 文本站点地图

 如果您只想提供网页网址，您可以创建一个通用的文本文件（每行包含一个网址），然后将该文件提交给 Google。例如，如果您的网站有两个网页，您可以将它们添加到位于 `https://www.example.com/sitemap.txt` 的文本站点地图中，如下所示：

```
https://www.example.com/file1.html
https://www.example.com/file2.html
```

### 文本文件站点地图的其他说明

- 请勿在站点地图文件中添加除网址以外的任何其他内容。
- 您可以随意对该文本文件进行命名，但前提是要确保它的扩展名为 `.txt`（例如，sitemap.txt）。

## 如何创建站点地图

 创建站点地图，就是在告诉搜索引擎您希望让哪些网址显示在搜索结果中。这些就是[规范网址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)。如果不同网址下可供访问的内容相同，请选择您偏好的网址并将其加入站点地图，而不是将所有指向相同内容的网址都加入站点地图。

 在确定要将哪些网址加入站点地图后，选择下列方式之一来创建站点地图，具体取决于您网站的架构和大小：

-  [让您的 CMS 为您生成站点地图](#cmssitemap)。
-  如果要创建的站点地图包含的网址不到几十个，您可以[手动创建站点地图](#manualsitemap)。
-  如果要创建的站点地图包含的网址超过几十个，请[自动生成站点地图](#autositemap)。

### 让您的 CMS 为您生成站点地图

 如果您使用的是 WordPress、Wix 或 Blogger 等 CMS，那么您的 CMS 可能已经向搜索引擎提供了站点地图。尝试搜索以下方面的信息：您的 CMS 如何生成站点地图，或者在您的 CMS 没有自动生成站点地图时如何创建站点地图。例如，如果您使用的是 Wix，请搜索“wix 站点地图”；如果您使用的是 Blogger，请搜索“Blogger RSS”。

### 手动创建站点地图

 如果要创建的站点地图包含的网址不到几十个，您或许能够手动创建站点地图。 为此，请打开 [Windows Notepad](https://www.microsoft.com/en-us/search?q=windows+notepad)、[Nano（Linux、MacOS）](https://www.nano-editor.org/)等文本编辑器，然后按照[站点地图格式](#sitemapformat)部分中所述的语法创建站点地图。您可以随意对该文件命名，只要[网址中允许使用相应字符](https://developers.google.com/maps/url-encoding?hl=zh-cn)即可。

 您可以手动创建较大的站点地图，但此过程非常繁琐，而且长期难以维护。

### 使用工具自动生成站点地图

 如果要创建的站点地图包含的网址超过几十个，您需要自动生成站点地图。有很多工具可以[生成站点地图](https://www.google.com/search?q=generate+sitemap&hl=zh-cn)。不过，最好是让您的网站制作软件为您生成站点地图。例如，您可以从您网站的数据库中提取网站的网址，然后将网址导出到屏幕上或网络服务器的实际文件中。请与您的开发者或服务器管理员讨论此解决方案。如果您需要代码方面的指导，不妨看看我们以前汇总的[第三方站点地图生成器](http://code.google.com/p/sitemap-generators/wiki/SitemapGenerators?hl=zh-cn)列表（已停止维护）。

 您不必担心站点地图中的网址顺序，这些顺序对 Google 而言无关紧要。请注意[站点地图的大小要求](#general-guidelines)；如果站点地图过大，您必须将其拆分为多个较小的站点地图。详细了解如何[管理大型站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps?hl=zh-cn)。

## 将站点地图提交给 Google

 请注意，提交站点地图只是给 Google 一个提示：我们无法保证 Google 一定会下载该站点地图或使用站点地图抓取网站上的网址。您可通过以下几种不同方法将站点地图提交给 Google：

-  使用[站点地图报告](https://support.google.com/webmasters/answer/7451001?hl=zh-cn)**在 Search Console 中提交站点地图**。 这样，您就可以查看 Googlebot 何时访问了站点地图，以及潜在的处理错误。
-  **使用 Search Console API** 程序化地[提交站点地图](https://developers.google.com/webmaster-tools/v1/sitemaps/submit?hl=zh-cn)。
-  **将下面这行内容插入到 robots.txt 文件中的任意位置**，指定站点地图的路径。我们会在下次抓取 robots.txt 文件时找到该站点地图：

```
Sitemap: https://example.com/my_sitemap.xml
```

您可以指定多行站点地图，并且 robots.txt 文件中包含的站点地图数量没有限制。

-  如果您使用 Atom 或 RSS，则可以使用 [WebSub](https://www.w3.org/TR/websub/) 向搜索引擎（包括 Google）广播您的更改。

## 如何跨网站提交多个网站的站点地图

 如果您拥有多个网站，您可以创建一个或多个站点地图，其中包含您所有经过验证的网站对应的网址，然后将这些站点地图保存到同一位置，从而简化站点地图提交过程。您可以选用：

-  包含多个网站（包括不同网域中的网站）网址的单个站点地图。例如，位于 `https://host1.example.com/sitemap.xml` 的站点地图可以包含以下网址。

  - `https://host1.example.com`
  - `https://host2.example.com`
  - `https://host3.example.com`
  - `https://host1.example1.com`
  - `https://host1.example.ch`

-  位于同一位置的多个站点地图（每个网站各一个）。 例如，`https://host1.example.com` 可以托管以下所有站点地图：

  - `https://host1.example.com/host1-example-sitemap.xml`
  - `https://host1.example.com/host2-example-sitemap.xml`
  - `https://host1.example.com/host3-example-sitemap.xml`
  - `https://host1.example.com/host1-example1-sitemap.xml`
  - `https://host1.example.com/host1-example-ch-sitemap.xml`

 如需提交在同一位置托管的跨网站站点地图，您可以使用 Search Console 或 robots.txt。

### 使用 Search Console 跨网站提交站点地图

1. 对于您要添加到站点地图中的所有网站，请确保您已[验证所有权](https://support.google.com/webmasters/answer/35181?hl=zh-cn)。
2.  [创建一个站点地图](#createsitemap)（如果您愿意，也可以创建多个），其中包含要涵盖的所有网站的网址。如果您愿意，可以将站点地图添加到[站点地图索引](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps?hl=zh-cn)文件中，并从此开始使用该站点地图索引。
3.  使用 Google Search Console [提交站点地图或站点地图索引文件](https://support.google.com/webmasters/answer/7451001?hl=zh-cn)。

### 使用 robots.txt 跨网站提交站点地图

1.  为每一个网站[创建一个或多个站点地图](#createsitemap)。对于每一个站点地图文件，请确保其中仅包含来自特定网站的网址。
2.  将所有站点地图上传到您可控制的单个网站，例如 `https://sitemaps.example.com`。
3.  对于每一个网站，请确保相应 robots.txt 文件引用的是该网站的站点地图。例如，您为 `https://example.com/` 创建了站点地图，并将站点地图托管在 `https://sitemaps.example.com/sitemap-example-com.xml`，请在 robots.txt 文件（网址为 `https://example.com/robots.txt`）中引用该站点地图。

```
# robots.txt file of https://example.com/
sitemap: https://sitemaps.example.com/sitemap-example-com.xml
```

## 站点地图问题排查

 如果您在站点地图方面遇到问题，可以使用 Google Search Console 调查错误。 如需帮助，请参阅 Search Console 的[站点地图问题排查指南](https://support.google.com/webmasters/answer/7451001?hl=zh-cn#errors)。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-07-15。
