---
title: "视频站点地图和替代方案"
source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh_CN
slug: search__docs__crawling-indexing__sitemaps__video-sitemaps
path: /search/docs/crawling-indexing/sitemaps/video-sitemaps
---

# 视频站点地图和替代方案

> 来源: https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 视频站点地图和替代方案

 视频站点地图是[站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=zh-cn)的一种，其中包含有关托管在网页上的视频的更多信息。创建视频站点地图有助于 Google 找到并了解您网站上的视频内容，尤其是最近添加的内容或 Google 通过常规抓取机制可能发现不了的内容。

 Google 建议您使用视频站点地图，不过我们也支持 [mRSS Feed](#sitemap_alternatives)。

## 视频站点地图最佳实践

 由于视频站点地图基于常规站点地图，因此[常规站点地图最佳实践](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#general-guidelines)也适用于视频站点地图。您可以仅为视频创建单独的站点地图或 mRSS Feed，也可以在现有的[站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#xml)中添加视频站点地图标记，哪种方式更方便就选哪种。

此外，视频站点地图还需要满足以下要求：

-  请勿列出与托管网页的内容无关的视频。例如，视频是对网页的小补充或与主要文字内容无关。
-  视频站点地图中引用的所有文件都必须可供 Googlebot 访问。这意味着，视频站点地图中的所有网址：

  -  不得被 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=zh-cn) 规则禁止抓取，
  -  必须能够在没有元文件且无需登录的情况下可供访问，
  -  不得被防火墙或类似机制屏蔽，
  -  并且必须可通过受支持的协议（HTTP 和 FTP）访问（不支持流式传输协议）。

如果您想阻止垃圾内容发布者访问在 `<player_loc>` 或 `<content_loc>` 网址上的视频内容，请[验证访问您服务器的任何漫游器是否确实为 Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn)。

如需了解关于 Google 搜索中的视频的更多提示，请参阅我们的[视频最佳实践](https://developers.google.com/search/docs/appearance/video?hl=zh-cn)。

## 视频站点地图示例

 以下示例显示的是具有视频扩展的常规站点地图。它包含嵌套在单个 `<url>` 标记中的两个视频条目。第一个 `<video>` 条目包含 Google 可以使用的所有标记，而第二个条目仅包含必需的标记。

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://www.example.com/videos/some_video_landing_page.html</loc>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
      <video:title>Grilling steaks for summer</video:title>
      <video:description>
        Alkis shows you how to get perfectly done steaks every time
      </video:description>
      <video:content_loc>
        http://streamserver.example.com/video123.mp4
      </video:content_loc>
      <video:player_loc>
        https://www.example.com/videoplayer.php?video=123
      </video:player_loc>
      <video:duration>600</video:duration>
      <video:expiration_date>2021-11-05T19:20:30+08:00</video:expiration_date>
      <video:rating>4.2</video:rating>
      <video:view_count>12345</video:view_count>
      <video:publication_date>2007-11-05T19:20:30+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:restriction relationship="allow">IE GB US CA</video:restriction>
      <video:platform relationship="allow">web tv</video:platform>
      <video:requires_subscription>yes</video:requires_subscription>
      <video:uploader
        info="https://www.example.com/users/grillymcgrillerson">GrillyMcGrillerson
      </video:uploader>
      <video:live>no</video:live>
      <video:tag>steak</video:tag>
      <video:tag>meat</video:tag>
      <video:tag>summer</video:tag>
    </video:video>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/345.jpg</video:thumbnail_loc>
      <video:title>Grilling steaks for winter</video:title>
      <video:description>
        In the freezing cold, Roman shows you how to get perfectly done steaks every time.
      </video:description>
      <video:content_loc>
        http://streamserver.example.com/video345.mp4
      </video:content_loc>
      <video:player_loc>
        https://www.example.com/videoplayer.php?video=345
      </video:player_loc>
    </video:video>
  </url>
</urlset>
```

#### 更多示例

 以下示例演示了如何将 Vimeo 视频嵌入到视频站点地图中：

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://www.example.com/videos/some_video_landing_page.html</loc>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
      <video:title>Lizzi is painting the wall</video:title>
      <video:description>
        Gary is watching the paint dry on the wall Lizzi painted.
      </video:description>
      <video:player_loc>
        https://player.vimeo.com/video/987654321
      </video:player_loc>
    </video:video>
  </url>
</urlset>
```

 以下示例演示了如何将 YouTube 视频嵌入到视频站点地图中：

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://www.example.com/videos/some_video_landing_page.html</loc>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/345.jpg</video:thumbnail_loc>
      <video:title>John teaches cheese</video:title>
      <video:description>
        John explains the differences between a banana and cheese.
      </video:description>
      <video:player_loc>
        https://www.youtube.com/embed/1a2b3c4d
      </video:player_loc>
    </video:video>
  </url>
</urlset>
```

## 视频站点地图引用

 `video` 标记在视频站点地图命名空间中定义：[`http://www.google.com/schemas/sitemap-video/1.1`](http://www.google.com/schemas/sitemap-video/1.1?hl=zh-cn) 除非另有说明，否则每个视频只能添加一次每个标记。

 为确保 Google 能够使用您的视频站点地图，您必须使用以下必需的标记：

必需的标记

`<video:video>`

 在 `<loc>` 标记指定的网页上，单个视频的所有相关信息的父级元素。您可以添加嵌套在 `<loc>` 标记中的多个 `<video:video>` 标记，这些标记分别代表托管网页上的每个视频。

`<video:thumbnail_loc>`

 指向视频缩略图文件的网址。遵循[视频缩略图要求](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#thumbnails)。

`<video:title>`

 视频标题。所有 HTML 实体都必须进行转义或封装在一个 [`CDATA` 块](http://wikipedia.org/wiki/CDATA)中。我们建议此标题与嵌入该视频的网页上显示的视频标题一致。

`<video:description>`

 视频的说明。不得超过 2048 个字符。所有 HTML 实体都必须进行转义或封装在一个 [`CDATA` 块](http://wikipedia.org/wiki/CDATA)中。必须与嵌入该视频的网页上显示的说明一致，但不必逐字匹配。

`<video:content_loc>`

 指向实际视频媒体文件的网址。该文件必须采用其中一种[支持的格式](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#file-types)。

 必须提供 `<video:content_loc>` 或 `<video:player_loc>` 标记。我们建议您尽可能提供 `<video:content_loc>` 标记。这是 Google 提取视频内容文件的最有效方式。如果 `<video:content_loc>` 不可用，请提供 `<video:player_loc>` 作为替代方法。

**其他指南**

- 不支持 HTML 和 Flash 格式。
- 不得与父级 `<loc>` 标记中的网址相同。
- 此标记相当于结构化数据中的 `[VideoObject.contentUrl](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn)`。
-  **最佳实践：**如果您想对内容访问权限设定限制，但仍然希望 Googlebot 抓取该内容，请使用[验证 Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn) 功能确保 Googlebot 能够访问您的内容。

`<video:player_loc>`

 指向**特定**视频的播放器的网址。通常，该信息由 `<embed>` 标记的 `src` 属性提供。

 必须提供 `<video:content_loc>` 或 `<video:player_loc>` 标记。我们建议您尽可能提供 `<video:content_loc>` 标记。这是 Google 提取视频内容文件的最有效方式。如果 `<video:content_loc>` 不可用，请提供 `<video:player_loc>` 作为替代方法。

**其他指南**

- 不得与 `<loc>` 网址相同。
-  对于 Vimeo、YouTube 和其他允许通过 `iframe` 视频嵌入视频的视频托管平台，系统会使用此值而非 `video:content_loc`。此标记相当于结构化数据中的 `[VideoObject.embedUrl](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn)`。
-  **最佳实践：**如果您想对内容访问权限设定限制，但仍然希望 Googlebot 抓取该内容，请使用[验证 Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn) 功能确保 Googlebot 能够访问您的内容。

 此外，以下可选标记可能有助于 Google 更好地了解您的视频及其属性：

可选标记

`<video:duration>`

 视频的时长（以秒为单位）。值必须介于 `1` 和 `28800`（8 小时）之间。

`<video:expiration_date>`

视频的失效日期（采用 [W3C 格式](http://www.w3.org/TR/NOTE-datetime)）。如果您的视频不会失效，请不要添加此标记。如果存在此标记，则在此日期之后，Google 搜索将不会显示您的视频。对于同一网址上的周期性视频，请将失效日期更新为新的失效日期。

支持的值为完整日期 (`YYYY-MM-DD`)，或完整日期加时、分和秒以及时区 (`YYYY-MM-DDThh:mm:ss+TZD`)。

**示例**：`2012-07-16T19:20:30+08:00`

`<video:rating>`

 视频的评分。支持的值为介于 `0.0`（下限）到 `5.0`（上限）之间的浮点数。

`<video:view_count>`

视频的观看次数。

`<video:publication_date>`

 首次发布视频的日期（采用 [W3C 格式](http://www.w3.org/TR/NOTE-datetime)）。支持的值为完整日期 (`YYYY-MM-DD`)，或完整日期加时、分和秒以及时区 (`YYYY-MM-DDThh:mm:ss+TZD`)。

**示例**：`2007-07-16T19:20:30+08:00`

`<video:family_friendly>`

 用户能否在[SafeSearch](https://developers.google.com/search/docs/crawling-indexing/safesearch?hl=zh-cn)模式下搜到该视频。如果您省略了此标记，则开启安全搜索后也能搜到该视频。

**支持的值**：

- `yes`：开启安全搜索后也能搜到该视频。
- `no`：仅在关闭安全搜索的情况下才能搜到该视频。

 `<video:restriction>`

是否在特定国家/地区的搜索结果中显示或隐藏您的视频。

 请指定用空格隔开的国家/地区代码列表，采用 [ISO 3166 格式](http://wikipedia.org/wiki/ISO_3166)。如果未提供 `<video:restriction>` 标记，Google 会假定该视频可在所有地区显示。请注意，此标记仅会影响搜索结果；它不会阻止用户通过其他方式在受限制的地区查找或播放您的视频。**[详细了解如何应用国家/地区限制。](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#restrict_by_country)

**属性**：

 如果使用父标记 `<video:restriction>`，则必须提供以下属性：

-  `relationship`：指定是否允许视频在指定国家/地区的搜索结果中显示。支持的值包括：

  -  `allow`：允许在列出的国家/地区播放相应视频，不允许在未列出的国家/地区播放相应视频。
  -  `deny`：不允许在列出的国家/地区播放相应视频，允许在未列出的国家/地区播放相应视频。

 **示例：**本示例仅允许在加拿大和墨西哥显示相应视频搜索结果：

 `<video:restriction relationship="allow">CA MX</video:restriction>`

`<video:platform>`

 指定是否在所列类型的平台的搜索结果中显示或隐藏您的视频。其值是用空格隔开的平台类型列表。*请注意，此标记仅会影响指定类型的设备上的搜索结果；它不会阻止用户在受限平台上播放您的视频。*

 如果未提供 `<video:platform>` 标记，Google 会假定该视频可在所有平台上播放。[详细了解如何应用平台限制。](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#restrict_by_platform)

**支持的值**：

- `web`：桌面设备和笔记本电脑中的计算机浏览器。
- `mobile`：移动浏览器，例如手机或平板电脑中的浏览器。
- `tv`：电视浏览器，例如 Google TV 设备和游戏机上的浏览器。

**属性**：

 如果使用父标记 `<video:platform>`，则必须提供以下属性：

-  `relationship`：指定是否允许视频在特定平台上显示。支持的值包括：

  -  `allow`：不允许在所有未列出的平台上显示相应视频。
  -  `deny`：允许在所有未列出的平台上显示相应视频。

 **示例：**以下示例允许向使用传统计算机浏览器或电视浏览器的用户显示相应视频，但不允许向使用移动浏览器的用户显示相应视频：
`<video:platform relationship="allow">web tv</video:platform>`

`<video:requires_subscription>`

 指明是否需要订阅（收费或免费）才能观看视频。支持的值包括：

-  `yes`：需要订阅。
-  `no`：不需要订阅。

`<video:uploader>`

 视频上传者的名称。此字符串值最多可包含 255 个字符。

**属性**：

-  `info` [**可选]：指定其中包含有关此上传者的其他信息的网页对应的网址。此网址必须与 `<loc>` 标记的值位于同一网域中。

`<video:live>`

指明视频是否为直播视频。支持的值包括：

-  `yes`：视频是直播视频。
-  `no`：视频不是直播视频。

`<video:tag>`

 描述视频的任意字符串标记。标记通常是与视频或内容片段相关联的关键概念的极简短说明。一个视频可以有多个标记，但它可能只属于一个类别。例如，有关烧烤食物的视频可能属于“烧烤”类别，但可以带有“牛排”“肉类”“夏季”和“室外”标记。请为与视频相关的每个标记创建新的 `<video:tag>` 元素。每个视频最多允许使用 32 个标记。

### 已弃用的标记和属性

 我们从文档中移除了以下标记和属性：`<video:category>`、`<video:gallery_loc>`、`<video:player_loc>` 标记的 `autoplay` 和 `allow_embed` 属性、`<video:price>` 标记及其属性，以及 `<video:tvshow>` 标记及其属性。如需了解详情，请参阅[弃用公告](https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions?hl=zh-cn)。

## 站点地图替代方案：mRSS

 虽然 Google 建议您使用视频站点地图，但我们也支持 mRSS Feed。

Google 支持 [mRSS](http://www.rssboard.org/media-rss)，它是一个对 [RSS 2.0](http://cyber.law.harvard.edu/rss/rss.html) 的元素功能进行补充的 RSS 模块。mRSS Feed 与视频站点地图非常类似，可以像站点地图一样进行测试、提交和更新。

 如需详细了解媒体 Feed，请参阅[官方媒体 RSS 文档](http://www.rssboard.org/media-rss)。

**RSS 与 mRSS** - mRSS 是用于整合多媒体文件的 RSS 扩展。它对内容的描述比 RSS 标准要详细得多。

### mRSS 示例

下面是 mRSS 条目的示例，其中提供了 Google 使用的所有标记。

```
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
  <channel>
    <title>Example MRSS</title>
    <link>https://www.example.com/examples/mrss/</link>
    <description>MRSS Example</description>
    <item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
      <link>https://www.example.com/examples/mrss/example.html</link>
      <media:content url="https://www.example.com/examples/mrss/example.flv" fileSize="405321"
                        type="video/x-flv" height="240" width="320" duration="120" medium="video" isDefault="true">
        <media:player url="https://www.example.com/shows/example/video.swf?flash_params" />
        <media:title>Grilling Steaks for Summer</media:title>
        <media:description>Get perfectly done steaks every time</media:description>
        <media:thumbnail url="https://www.example.com/examples/mrss/example.png" height="120" width="160"/>
        <media:price price="19.99" currency="EUR" />
        <media:price type="subscription" />
      </media:content>
      <media:restriction relationship="allow" type="country">us ca</media:restriction>
      <dcterms:valid xmlns:dcterms="http://purl.org/dc/terms/">end=2020-10-15T00:00+01:00; scheme=W3C-DTF</dcterms:valid>
      <dcterms:type>live-video</dcterms:type>
    </item>
  </channel>
</rss>
```

### mRSS 引用

 [mRSS 的完整规范](http://www.rssboard.org/media-rss)包含更多可选标记、最佳做法和示例。

 为确保 Google 能够使用您的 mRSS Feed，您必须使用以下必需的标记：

必需的标记

`<media:content>`

附上视频的相关信息。

属性：

-  `medium`：内容类型。设为 `video`。
-  `url`：指向原始视频内容的直接网址。 **如果未指定此标记，则必须指定 `<media:player>` 标记。**
- `duration` [**可选，但建议提供]：视频的时长（以秒为单位）。

 若要了解 `<media:content>` 标记的所有其他可选属性和子字段，请参阅 [mRSS 规范](http://www.rssboard.org/media-rss)。

`<media:player>`

**您必须至少指定 `<media:player>` 或 `<media:content>` 中的 `url` 属性这两者中的一项。**

 指向**特定**视频的播放器的网址。通常，该信息由 `<embed>` 标记的 `src` 属性提供，不得与 `<loc>` 标记的内容相同，也不得与 `<link>` 标记的网址相同。`<link>` 标记指向视频托管网页的网址，而此标记指向播放器。

`<media:title>`

 视频标题。不得超过 100 个字符。所有 HTML 实体都必须进行转义或者封装在一个 [CDATA 块](http://wikipedia.org/wiki/CDATA)中。

`<media:description>`

 视频的说明。不得超过 2048 个字符。所有 HTML 实体都必须进行转义或者封装在一个 [CDATA 块](http://wikipedia.org/wiki/CDATA)中。

`<media:thumbnail>`

 指向预览缩略图的网址。遵循[视频缩略图要求](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#thumbnails)。

 此外，以下可选标记可能有助于 Google 更好地了解您的视频及其属性：

可选标记

`<dcterms:valid>`

 视频的发布日期和失效日期。以下是 [`dcterms:valid` 标记的完整规范](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/valid/)。

**示例**：

```
<dcterms:valid>
start=2002-10-13T09:00+01:00;
end=2002-10-17T17:00+01:00;
scheme=W3C-DTF
<dcterms:valid>
```

`<media:restriction>`

 可以播放视频或无法播放视频的国家/地区列表，其中各项用空格隔开（采用 [ISO 3166 格式](http://wikipedia.org/wiki/ISO_3166)）。如果未提供 `<media:restriction>` 标记，Google 会假定该视频可在所有国家/地区播放。

**属性**：

 如果使用父标记 `<media:restriction>`，则必须提供以下属性：

-  `type`：将 `type` 属性设置为 `country`。仅支持国家/地区限制。
-  `relationship`：指定视频是否可以在列出的特定国家/地区播放。支持的值：

  -  `allow`：允许在列出的国家/地区播放相应视频，不允许在未列出的国家/地区播放相应视频。
  -  `deny`：不允许在列出的国家/地区播放相应视频，允许在未列出的国家/地区播放相应视频。

 [详细了解如何使用国家/地区限制。](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#restrict_by_country)

示例：

```
<media:restriction relationship="allow" type="country">us ca</media:restriction>
```

`<media:price>`

 下载或观看视频需要支付的费用。如果是免费视频，请勿使用此标记。您可以列出多个 `<media:price>` 元素（例如，为了指定多个币种或购买选项）。

**属性**：

 如果使用父标记 `<media:price>`，则必须提供以下属性：

-  `currency`：以 [ISO 4217 格式](https://en.wikipedia.org/wiki/ISO_4217)指定的币种。
-  `type`：购买选项。支持的值包括：

  -  `rent`：视频可供租借。
  -  `purchase`：视频可供购买。
  -  `package`：视频属于成套交易的一部分。
  -  `subscription`：视频可供订阅。

## 站点地图问题排查

 如果您在站点地图方面遇到问题，可以使用 Google Search Console 调查错误。 如需帮助，请参阅 Search Console 的[站点地图问题排查指南](https://support.google.com/webmasters/answer/7451001?hl=zh-cn#errors)。

##  其他资源

 希望了解更多信息？请参阅以下资源：

-  [将站点地图提交给 Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#addsitemap)
-  [了解如何结合使用站点地图扩展](https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions?hl=zh-cn)

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-05-30。
