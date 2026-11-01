---
title: "图片站点地图"
source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=zh_CN
slug: search__docs__crawling-indexing__sitemaps__image-sitemaps
path: /search/docs/crawling-indexing/sitemaps/image-sitemaps
---

# 图片站点地图

> 来源: https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 图片站点地图

 图片站点地图可以告知 Google 您网站上的其他图片，尤其是 Google 可能无法通过其他方式找到的图片（例如，您的网站通过 JavaScript 代码获取的图片）。您可以创建单独的图片站点地图，也可以向现有站点地图添加图片站点地图标记；这两种方法对 Google 来说都没有问题。

 图片站点地图以常规站点地图为基础，因此[常规站点地图最佳实践](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#general-guidelines)也适用于图片站点地图。我们还建议您遵循[发布图片的常规最佳实践](https://developers.google.com/search/docs/appearance/google-images?hl=zh-cn)。

## 图片站点地图示例

 以下示例显示的是具有图片站点地图扩展的常规站点地图，其中包含两个 `<url>` 元素：

- `https://example.com/sample1.html`，其中包含两张图片
- `https://example.com/sample2.html`，其中包含一张图片

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/sample1.html</loc>
    <image:image>
      <image:loc>https://example.com/image.jpg</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://example.com/photo.jpg</image:loc>
    </image:image>
  </url>
  <url>
    <loc>https://example.com/sample2.html</loc>
    <image:image>
      <image:loc>https://example.com/picture.jpg</image:loc>
    </image:image>
  </url>
</urlset>
```

## 图片站点地图引用

`image` 标记在图片站点地图命名空间中定义：[`http://www.google.com/schemas/sitemap-image/1.1`](http://www.google.com/schemas/sitemap-image/1.1?hl=zh-cn)

 为了确保 Google 能使用您的图片站点地图，您必须使用以下必需的标记：

必需的标记

`<image:image>`

 包含单张图片的所有相关信息。每个 `<url>` 标记最多可包含 1,000 个 `<image:image>` 标记。

`<image:loc>`

图片的网址。

 某些情况下，图片网址可能与您的主网站不在同一个网域中。即便如此也不必担心，只要您在 Search Console 中已验证这两个网域即可。例如，当您使用内容分发网络（如 Google 协作平台）托管图片时，请确保在 Search Console 中验证相应托管网站。此外，您应确保 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=zh-cn) 文件允许抓取您想要编入索引的所有内容。

### 已弃用的标记和属性

 我们从文档中移除了以下标记和属性：`<image:caption>`、`<image:geo_location>`、`<image:title>`、`<image:license>`。如需了解详情，请参阅[弃用公告](https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions?hl=zh-cn)。

## 站点地图问题排查

 如果您在站点地图方面遇到问题，可以使用 Google Search Console 调查错误。 如需帮助，请参阅 Search Console 的[站点地图问题排查指南](https://support.google.com/webmasters/answer/7451001?hl=zh-cn#errors)。

##  其他资源

 希望了解更多信息？请参阅以下资源：

-  [将站点地图提交给 Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#addsitemap)
-  [了解如何结合使用站点地图扩展](https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions?hl=zh-cn)

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-02-20。
