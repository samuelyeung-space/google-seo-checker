---
title: "如何结合使用站点地图扩展"
source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions?hl=zh_CN
slug: search__docs__crawling-indexing__sitemaps__combine-sitemap-extensions
path: /search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions
---

# 如何结合使用站点地图扩展

> 来源: https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 如何结合使用站点地图扩展

 站点地图扩展是将您在网站上使用的各类内容及其元数据告知 Google 的绝佳方式。您网页上的内容通常适合多种扩展；例如，您可能会发布嵌入图片和视频的新闻报道。此外，您的网页还可能会进行本地化，这可能意味着您可以为本地化网页添加 `hreflang` 注释。

## 命名空间

 对于您要在站点地图中使用的每个站点地图扩展，您需要指定相应命名空间来声明扩展支持的标记。您可以借助 `urlset` 标记的 `xmlns` 属性来完成该步骤。Google 支持的站点地图扩展的命名空间包括：

扩展标记及其命名空间定义

`image:`

 [`http://www.google.com/schemas/sitemap-image/1.1`](http://www.google.com/schemas/sitemap-image/1.1?hl=zh-cn)

`news:`

 [`http://www.google.com/schemas/sitemap-news/0.9`](http://www.google.com/schemas/sitemap-news/0.9?hl=zh-cn)

`video:`

 [`http://www.google.com/schemas/sitemap-video/1.1`](http://www.google.com/schemas/sitemap-video/1.1?hl=zh-cn)

`xhtml:`（适用于 `hreflang`）

 [`http://www.w3.org/1999/xhtml`](http://www.w3.org/1999/xhtml)

### 声明多个命名空间

 如需声明多个命名空间，请按照对应扩展的文档中的说明，将相应的命名空间引用添加到您的站点地图中。以下示例演示了如何向站点地图添加新闻、视频和 xhtml（适用于 `hreflang`）扩展：

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
           xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
           xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
<!-- rest of the sitemap -->
```

## 结合使用站点地图扩展

声明完命名空间后，请遵循您要使用的相应站点地图扩展的文档中的实现详情。

- [图片站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=zh-cn)
- [Google 新闻站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap?hl=zh-cn)
- [视频站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn)
-  [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn#sitemap)

 如需结合使用扩展，请按照各站点地图扩展的文档中的说明，将所使用的站点地图扩展中的标记逐一添加到相应的 `<url>` 标记中。

 例如，要向站点地图添加新闻、视频和 xhtml (`hreflang`) 扩展，请按以下步骤操作：

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.example.com/english/page.html</loc>
    <!-- Starting with the news extension tags -->
    <news:news>
      <news:publication>
        <news:name>The Example Times</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2008-12-23</news:publication_date>
      <news:title>Companies A, B in Merger Talks</news:title>
    </news:news>
    <!-- Next we add video extension tags -->
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
      <video:title>Lizzi is painting the wall</video:title>
      <video:description>
        Gary is watching the paint dry on the wall Lizzi painted.
      </video:description>
      <video:player_loc>
        https://player.example.com/video/987654321
      </video:player_loc>
    </video:video>
    <!-- And finally the xhtml tags for hreflang -->
    <xhtml:link
                rel="alternate"
                hreflang="de"
                href="https://www.example.de/deutsch/page.html"/>
    <xhtml:link
                rel="alternate"
                hreflang="de-ch"
                href="https://www.example.de/schweiz-deutsch/page.html"/>
    <xhtml:link
                rel="alternate"
                hreflang="en"
                href="https://www.example.com/english/page.html"/>
  </url>
<!-- Add more <url> tags -->
```

 站点地图中扩展的顺序在 `<loc>` 标记之后并不相关。请遵循[站点地图常规最佳实践](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#general-guidelines)，尤其是注意文件大小限制。组合使用站点地图扩展会大幅增加站点地图的文件大小。

## 站点地图问题排查

 如果您在站点地图方面遇到问题，可以使用 Google Search Console 调查错误。 如需帮助，请参阅 Search Console 的[站点地图问题排查指南](https://support.google.com/webmasters/answer/7451001?hl=zh-cn#errors)。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-02-20。
