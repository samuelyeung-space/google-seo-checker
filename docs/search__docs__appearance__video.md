---
title: "视频 SEO 最佳实践"
source: https://developers.google.com/search/docs/appearance/video?hl=zh_CN
slug: search__docs__appearance__video
path: /search/docs/appearance/video
---

# 视频 SEO 最佳实践

> 来源: https://developers.google.com/search/docs/appearance/video?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 视频 SEO 最佳实践

如果您的网站上有视频，遵循这些视频 SEO 最佳实践有助于更多用户通过 Google 上的视频结果找到您的网站。视频可以显示在 Google 上的多个不同位置，其中包括主搜索结果页、视频模式、Google 图片和 [Google 探索](https://developers.google.com/search/docs/appearance/google-discover?hl=zh-cn)。

 请按照以下最佳做法优化您的视频，使其显示在 Google 中：

1. [帮助 Google 查找您的视频](#help-google-find)
2. [确保您的视频可以被编入索引](#indexing-criteria)
3. [启用特定的视频功能](#enable-search-features)
4. [根据需要移除、限制或更新您的视频](#remove)
5. [使用 Search Console 监控视频](#monitor)
6. [排查视频问题](#troubleshoot)

## 帮助 Google 查找您的视频

若要使您的内容出现在 Google 的搜索结果中，需要遵守一些[技术要求](https://developers.google.com/search/docs/essentials/technical?hl=zh-cn)，这些要求同样适用于视频。要使您的视频符合 Google 搜索发现、抓取和编入索引的条件，还需要满足以下一些额外要求：

- 使用常用于嵌入视频的 HTML 元素。Google 可以找到由 `<video>`、`<embed>`、`<iframe>` 或 `<object>` 元素引用的视频。
- 请勿使用[片段标识符](https://wikipedia.org/wiki/URI_fragment)加载视频，因为 Google 搜索通常不支持网址片段。
- 如果您使用 JavaScript 注入视频，请使用网址检查工具确保视频[显示在渲染的 HTML 中](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=zh-cn)。
- 如果您使用的是媒体 API（例如 [Media Source API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)），请确保即使媒体 API 调用失败，也仍会注入 HTML 视频容器元素（除了提供有关视频的元数据之外）。这样，即使调用媒体 API 时出现问题，Google 仍可以找到视频容器的位置。
- 不要依赖用户操作（例如滑动、点击或输入）来加载视频。

 为了让 Google 更轻松地找到您的视频，我们建议您提供有关视频的元数据。 我们支持[结构化数据](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn)、[视频站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn)和[ Open Graph 协议 (OGP)](https://ogp.me/)。

## 确保您的视频可以被编入索引

 视频必须满足以下索引编制要求，才能使用视频功能：

- [观看页面](#watch-page)必须已编入索引。
- 已编入索引的观看页面必须在 Google 搜索中表现良好，其视频才有可能被考虑编入索引。
观看页面已编入索引并不表示视频也会被编入索引。

- 视频必须嵌入到观看页面中。
- 视频不能隐藏在其他元素后面。
如果您使用付费墙（例如，用户需要先登录或订阅才能观看视频），请添加[付费墙结构化数据](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content?hl=zh-cn)，以便 Google 仍能找到视频并编入索引。

- 视频必须具有[有效的缩略图](#valid-thumbnail)，且缩略图的网址必须为[稳定的网址](#stable-url)。

### 使用受支持的视频文件类型

 若要能够使用视频功能，请使用受支持的视频文件类型。Google 可处理以下类型的视频文件： 3GP、3G2、ASF、AVI、DivX、M2V、M3U、M3U8、M4V、MKV、MOV、MP4、MPEG、OGV、QVT、RAM、RM、VOB、WebM、WMV 和 XAP。

 不支持[数据网址](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)。

### 使用稳定的网址

 某些 CDN 会使用快速失效的网址。如果视频的缩略图网址更改过于频繁，Google 可能无法成功将您的视频编入索引。为确保视频可以编入索引，请为每个视频使用一个唯一且稳定的缩略图网址。

 若要使视频[符合使用特定功能](#enable-search-features)的条件，例如重要时刻和视频预览，请确保视频文件也能通过稳定的网址访问。这也有助于 Google 始终如一地发现并处理视频，确认它们是否仍可访问，并收集视频信号。

 如果您担心不良之徒（例如黑客或垃圾内容发布者）访问您的内容，可以在显示稳定版媒体网址之前[验证 Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn)。例如，您可以选择仅向 Googlebot 等可信客户端提供 [`contentUrl`](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#content-url) 属性，而访问您网页的其他客户端将看不到该字段。采用这种设置时，只有受信任的客户端才能访问您的视频文件所在的位置。

### 为每个视频创建专用观看页面

 若要能够使用视频功能（包括主搜索结果页上的视频结果、视频模式、[重要时刻](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#key-moments)、[“直播”标记](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#live-badge)和其他富媒体格式），请为每个视频创建专用观看页面（如果适合您的业务）。

 **观看页面的主要用途是向用户展示单个视频。以下页面属于观看页面，因为用户访问这些页面的主要原因是观看个别视频：

- 视频着陆页
- 电视剧集视频播放器页面
- 新闻视频观看页面
- 体育赛事集锦页面
- 事件剪辑页面

 以下网页不是观看页面，因为视频对网页上的其余内容起到了补充作用：

- 一篇评价嵌入式视频的博文
- 包含商品 360 度视频的商品页面
- 一个视频类别网页，其中列出了多个显眼程度相同的视频
- 包含嵌入式电影预告片的影评页面

 确保每个观看页面都具有该视频独一无二的网页标题和说明。如需相关提示，请参阅我们关于撰写优质[标题](https://developers.google.com/search/docs/appearance/title-link?hl=zh-cn#page-titles)和[说明](https://developers.google.com/search/docs/appearance/snippet?hl=zh-cn#meta-descriptions)的最佳实践。

您可以在观看页面和包含其他信息的其他网页（例如新闻报道或商品详情页）中加入相同的视频；非观看页面仍有资格显示为[文字结果](https://developers.google.com/search/docs/appearance/visual-elements-gallery?hl=zh-cn#text-result)和[带有视频标记的 Google 图片搜索结果](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn)。

### 使用第三方嵌入式播放器

 如果您的网站嵌入了来自 YouTube、Vimeo 或 Facebook 等第三方平台的视频，Google 可能会将您的网页及第三方平台中对等网页上的视频同时编入索引。这两个版本可能都会出现在 Google 的视频功能中，前提是网页符合[视频索引编制条件](#indexing-criteria)。

 对于您自己的嵌入了第三方播放器的观看页面，我们仍建议您[提供结构化数据](#structured-data)，此外，您还可以将这些网页添加到[视频站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn)中。若要能够使用更多视频功能，请与您的视频托管服务提供商联系，确保他们允许 Google [提取您的视频文件](#allow-fetch)。

## 如何区分各个网址？

一个视频有多个相关联的网址。下面总结了主要类型的网址：

与视频相关的网址

 **1. 观看页面**

嵌入视频的观看页面的网址。如果您使用的是视频站点地图，则此网址是 `<loc>` 视频站点地图标记的值。

```

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url>
<loc>**https://example.com/videos/some_video_landing_page.html**</loc>
  <video:video>
  ...

```

 **2. 视频播放器**

视频的特定播放器的网址。这通常是观看页面 HTML 中的 `<iframe>` 元素的 `src` 值：

```
<iframe src="**https://example.com/videoplayer.php?video=123**" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
```

---

**如何提供网址**

如果您使用的是结构化数据，请以 `VideoObject.embedUrl` 属性的值提供视频播放器网址。

```
"embedUrl": "**https://example.com/videoplayer.php?video=123**"
```

如果您使用的是视频站点地图，请以 `<video:player_loc>` 标记的值提供视频播放器网址。

```

<video:player_loc>**https://example.com/videoplayer.php?video=123**</video:player_loc>

```

 **3. 视频文件**

视频文件实际内容字节的网址，这些内容可能托管在嵌入网站、CDN 或在线媒体服务上。

在 `<object>` 元素中，视频文件的网址是 `data` 属性的值：

```
<object data="**https://streamserver.example.com/video/123/file.mp4**" width="400" height="300"></object>
```

在 `<video>` 元素中，视频文件的网址是 `<source>` 元素的 `src` 属性的值：

```
<video controls width="250">
  <source src="**https://streamserver.example.com/video/123/file.webm**" type="video/webm" />
  <source src="**https://streamserver.example.com/video/123/file.mp4**" type="video/mp4" />
</video>
```

在 `<embed>` 元素中，视频文件的网址是 `src` 属性的值：

```
<embed type="video/webm" src="**https://streamserver.example.com/video/123/file.mp4**" width="400" height="300"></embed>
```

---

**如何提供网址**

如果您使用的是结构化数据，请以 `VideoObject.contentUrl` 属性的值提供视频文件的网址。

```
"contentUrl": "**https://streamserver.example.com/video/123/file.mp4**"
```

如果您使用的是视频站点地图，请以 `<video:content_loc>` 标记的值提供视频文件的网址。

```

<video:content_loc>**https://streamserver.example.com/video/123/file.mp4**</video:content_loc>

```

### 提供高品质视频缩略图

 视频必须具有有效的缩略图，才能出现在视频功能中。如果您[允许 Google 提取您的视频文件](#allow-fetch)，Google 会尝试自动为您生成缩略图。

 不过，您可以通过以下某个元数据来源提供首选缩略图，从而影响视频功能中显示的缩略图：

- 如果使用 `<video>` HTML 元素，请指定 `poster` 属性。
- 在视频站点地图（包括 mRSS）中，指定 `<video:thumbnail_loc>` 标记（或 `<media:thumbnail>`）。
- 对于结构化数据，请指定 `[`thumbnailUrl`](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#thumbnail-url)` 属性。
- 对于 [OGP](https://ogp.me/)，请指定 `og:video:image` 属性。

 如果您选择指定多个元数据来源（例如，在站点地图和结构化数据中都指定缩略图），请确保在所有元数据中为每个视频使用相同的缩略图网址。

视频缩略图规范

 **支持的缩略图格式**

 BMP、GIF、JPEG、PNG、WebP、SVG 和 AVIF

 **大小**

最小 60x30 像素（尽可能更大）。

 **位置**

 缩略图文件必须可供 Googlebot 和 Googlebot 图片访问（请勿通过 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=zh-cn) 或登录要求屏蔽文件）。确保文件链接始终为[稳定的网址](#stable-url)。

 **透明度**

缩略图至少有 80% 的像素的 alpha（透明度）值大于 250。

### 在结构化数据中提供一致且独特的信息

 如需影响您的视频在 Google 上的显示方式，请使用[结构化数据](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn)描述视频。确保您在结构化数据中提供的任何信息与实际视频内容以及您提供的其他元数据一致。请务必在您网站上的每个视频的 `thumbnailUrl`、`name` 和 `description` 属性中提供独特的信息。

## 启用特定的视频功能

并非所有功能都可以在全部查询中触发。Google 不能保证添加标记一定会在搜索结果中显示特定的视频功能；请参阅我们的[结构化数据常规指南](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn)，了解具体原因。

### 视频预览

 Google 会从您的视频中选择几秒钟的片段作为动态预览，便于用户更好地了解视频中的内容。若要使您的视频符合使用此功能的条件，请[允许 Google 提取您的视频文件](#allow-fetch)。您可以使用 [`max-video-preview`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn#max-video-preview)robots`meta` 标记设置这些视频预览的时长上限。

###  重要时刻

 “重要时刻”功能是一种视频浏览方式，能让用户像翻看图书章节那样在视频片段间跳转，有助于用户更深入地与您的内容互动。Google 搜索会尝试自动检测视频中的片段，并向用户显示重要时刻，您无需采取任何措施。或者，您也可以手动告知 Google 视频中的重要时间点。我们将优先显示您通过结构化数据或 YouTube 说明设置的重要时刻。

- **如果您的视频托管在您的网页上**，您可以通过以下两种方式启用重要时刻功能：

  - [`Clip` 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#clip)：指定每个片段确切的起点和终点，以及要为每个片段显示的标签。此方式适用于 Google 搜索支持的所有语言。
  - [`SeekToAction` 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#seek)：告知 Google 时间戳通常位于网址结构中的什么位置，以便 Google 可以自动识别重要时刻，并将用户链接到视频中的这些时间点。 目前支持以下语言：英语、西班牙语、葡萄牙语、意大利语、中文、法语、日语、德语、土耳其语、韩语、荷兰语和俄语。我们的目标是逐步将此功能扩展到更多语言。即使是对于受支持的语言，并非所有视频都会标出重要时刻，但我们希望随着时间的推移也能改善这一功能。

- **如果您的视频托管在 YouTube 上**，您可以在 YouTube 上的视频说明中指定确切的时间戳和标签。请查看[在 YouTube 说明中标记时间戳的最佳实践](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#best-practices-youtube)。此方式适用于 Google 搜索支持的所有语言。

如果您想在 YouTube 上启用视频章节功能，请遵循这些[其他指南](https://support.google.com/youtube/answer/9884579?hl=zh-cn)。

若要完全停用“重要时刻”功能（包括 Google 为了自动为您的视频显示重要时刻而付出的所有努力），请使用 [`nosnippet`](https://developers.google.com/search/docs/appearance/snippet?hl=zh-cn#nosnippet)`meta` 标记。

###  “直播”徽章

 对于直播视频，您可以使用 [`BroadcastEvent` 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#broadcast-event)，使视频搜索结果显示红色“LIVE”标记。

## 允许 Google 提取您的视频文件

 Google 需要成功提取视频文件的实际字节，才能启用[视频预览](#video-previews)和[重要时刻](#key-moments)等功能。

Google 不会直接在搜索结果中显示视频文件，点击视频结果的用户将转到您的网站观看视频。您还可以验证访问您服务器的网页抓取工具是否[确实是 Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn)。

请遵循以下最佳做法，使 Google 能够查找和提取您的视频文件：

- 允许 Google 提取视频的流式传输文件网址（例如 M3U8）。请勿使用 [`noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=zh-cn) 规则或 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=zh-cn) 文件屏蔽实际视频字节的网址。
- 视频文件链接必须为[稳定的网址](#stable-url)。
- 使用结构化数据提供[支持的文件类型](#supported-video-files)的 [`contentURL`](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#content-url) 值。
- 视频观看页面的托管服务器和流式传输实际视频的服务器必须有足够的服务器资源来支持抓取。因此，如果位于 `example.com/puppies.html` 的着陆页具有通过 `streamserver.example.com` 提供的嵌入式小狗视频，则 `example.com` 和 `streamserver.example.com` 必须均符合 [Google 搜索的技术要求](https://developers.google.com/search/docs/essentials/technical?hl=zh-cn)，并且二者都具有[足够的服务器容量](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors?hl=zh-cn#availability_issues)。
如果您使用了 CDN，则可能会收到有关抓取错误的 Search Console 通知。您需要能够针对在 CDN 上分配的网址空间（为您的内容预留的子网域或子目录）[验证所有权](https://support.google.com/webmasters/answer/9008080?hl=zh-cn)。

##  移除或限制您的视频

###  移除视频

**如果您需要尽快从搜索结果中移除视频**，请针对嵌入视频的观看页面[提交移除请求](https://developers.google.com/search/docs/crawling-indexing/remove-information?hl=zh-cn)。若要永久移除，则该观看页面不能存在，也不能可供 Google 访问，即返回 `404` 代码、使用 `noindex`robots`meta` 标记，或需要服务器端身份验证。如果视频嵌入在其他网页或网站上，那么除非您为每个嵌入该视频的网页另行提交移除请求，否则这些网页不会被移除。

 若要从您的网站中移除视频，请执行以下任一操作：

- 对于嵌入已移除或已失效视频的任何观看页面，请**返回 `404 (Not found)`**。除了 `404` 响应代码之外，您仍可返回网页的 HTML，以便让大多数用户了解实际变化。
- 在嵌入已移除或已失效视频的任何观看页面上，添加 **[`noindex`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn)robots`meta` 标记**。这样做可阻止 Google 将该观看页面编入索引。
- 在结构化数据（使用 [`expires`](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#expires) 属性）或视频站点地图（使用 `<video:expiration_date>` 元素）中**指明失效日期**。下面这个视频站点地图示例包含一个已于 2009 年 11 月失效的视频：

```
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url>
<loc>https://example.com/videos/some_video_landing_page.html</loc>
<video:video>
  <video:thumbnail_loc>
      https://example.com/thumbs/123.jpg
  </video:thumbnail_loc>
  <video:title>
      Grilling steaks for summer
  </video:title>
  <video:description>
      Bob shows you how to grill steaks perfectly every time
  </video:description>
  <video:player_loc>
      https://example.com/videoplayer?video=123
  </video:player_loc>
  **<video:expiration_date>2009-11-05T19:20:30+08:00</video:expiration_date>**
</video:video>
</url>
</urlset>
```

 如果某个视频的失效日期已过，该视频将不会显示在视频搜索结果中。观看页面可能仍会出现在文字搜索结果中，不过没有视频缩略图。这包括站点地图、结构化数据以及 [`meta` 标记](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn#unavailable-after)中的失效日期。 确保每个视频的失效日期都正确无误。虽然此方法对于视频在失效日期之后不再显示的情形非常有用，但您往往会在无意中将可观看视频的失效日期设为过去的日期。如果视频不会失效，请不要包含任何失效信息。

###  根据用户的位置限制视频

 您可以根据用户的位置限制视频的搜索结果。如果您的视频没有任何国家/地区限制，请勿添加国家/地区限制标记。

####  使用结构化数据进行限制

 如果您使用 [`VideoObject` 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn)描述视频，请设置 [`regionsAllowed`](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#regions-allowed) 属性，指定哪些区域内的用户可看到相应视频搜索结果。如果不添加此属性，所有区域内的用户都可在搜索结果中看到该视频。

 或者，您也可以使用 [`ineligibleRegion`](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn#ineligible-region) 属性指定哪些区域内的用户无法看到相应视频搜索结果。

####  使用视频站点地图进行限制

 您可以在视频站点地图中使用 [`<video:restriction>`](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn#country-restriction) 标记允许或禁止视频在特定国家/地区显示。每个视频条目只能有 1 个 `<video:restriction>` 标记。

 `<video:restriction>` 标记必须包含一个或多个用空格分隔的 [ISO 3166-1 国家/地区代码（两个或三个字母）](https://en.wikipedia.org/wiki/ISO_3166-1)。`relationship` 属性是必需项，可指定限制的类型。

- `relationship="allow"`：视频只能在指定的国家/地区显示。 如果未指定国家/地区，视频不会在任何地方显示。
- `relationship="deny"`：视频可在除指定国家/地区外的所有其他地方显示。如果未指定国家/地区，视频将在所有地方显示。

 在本视频站点地图示例中，视频仅出现在加拿大和墨西哥的搜索结果中。

```
<url>
  <loc>https://example.com/videos/some_video_landing_page.html</loc>
  <video:video>
    <video:thumbnail_loc>
            https://example.com/thumbs/123.jpg
    </video:thumbnail_loc>
    <video:title>Grilling steaks for summer</video:title>
    <video:description>
        Bob shows you how to get perfectly done steaks every time
    </video:description>
    <video:player_loc>
          https://example.com/player?video=123
    </video:player_loc>
    <video:restriction relationship="allow">ca mx</video:restriction>
  </video:video>
</url>
```

## 针对安全搜索进行优化

安全搜索是 Google 用户账号中的一项设置，用于指定是要在 Google 搜索结果中显示还是要从中屏蔽包含露骨内容的图片、视频和网站。请确保 Google 了解网站的性质，以便 Google 酌情为网站应用安全搜索过滤条件。[详细了解如何标记安全搜索网页](https://developers.google.com/search/docs/crawling-indexing/safesearch?hl=zh-cn)。

## 使用 Search Console 监控视频观看页面

 以下 Search Console 报告和工具可帮助您监控和优化视频内容在 Google 搜索中的表现：

- [视频索引编制报告](https://support.google.com/webmasters/answer/9495631?hl=zh-cn)：查看有多少个已编入索引的观看页面中包含已编入索引的视频，以及其他视频未编入索引的原因。
- [视频富媒体搜索结果报告](https://support.google.com/webmasters/answer/7552505?hl=zh-cn)：查看并修正 `VideoObject` 结构化数据实施问题。
- [效果报告](https://support.google.com/webmasters/answer/7576553?hl=zh-cn#by_search_appearance&zippy=,search-appearance)：使用“视频搜索结果呈现”过滤条件监控您的视频在 Google 搜索中的表现。

## 排查视频问题

 您可以使用 Search Console 排查视频问题。如需帮助，请参阅[视频问题排查指南](https://support.google.com/webmasters/answer/9495631?hl=zh-cn#troubleshooting)。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-02-20。
