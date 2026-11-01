---
title: "创建网络故事的最佳做法"
source: https://developers.google.com/search/docs/appearance/web-stories-creation-best-practices?hl=zh_CN
slug: search__docs__appearance__web-stories-creation-best-practices
path: /search/docs/appearance/web-stories-creation-best-practices
---

# 创建网络故事的最佳做法

> 来源: https://developers.google.com/search/docs/appearance/web-stories-creation-best-practices?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 创建网络故事的最佳做法

 为了持续吸引您的读者，请遵循创建[网络故事](https://developers.google.com/search/docs/appearance/enable-web-stories?hl=zh-cn)的最佳做法。我们建议您先专注于完成关键任务。如果您有更多时间，还可以遵循推荐的最佳做法。

##  故事讲述

**关键的故事讲述最佳做法**

 视频优先

 视频比文字或图片更吸引人。尽可能多地使用视频，并使用图片和文字作为补充。

### 更多故事讲述最佳做法

**推荐的故事讲述最佳做法**

 提出您的观点

 不要局限于事实。分享您的看法。成为您自己的故事的主角。让故事能够引起共鸣。

 有叙事弧

 在故事的各个网页之间制造悬念。通过提供背景信息和叙事内容，引导用户阅读故事。向坚持读完作品的读者提供回报。

##  设计

**关键的设计最佳做法**

 减少字符数

 避免包含多个文字过多的网页。考虑将文字数量减少到每个网页约 280 个字符（Twitter 微博的长度）。

 不要遮挡文字

 确保文字未被网页中的其他内容遮挡。避免使用烧入文字，这样可以防止文字在调整大小以便适应不同的设备尺寸时被其他内容遮挡。

 让文字始终在界限内显示

 确保读者能够看到网络故事中的所有文字。避免使用烧入文字，这样可以防止文字在调整大小以便适应不同的设备尺寸时溢出容器边缘。

 谨慎使用动画

 利用动画让故事跃然纸上。避免使用可能会导致用户疲劳的分散注意力或重复性的动画。

### 更多设计最佳做法

**推荐的设计最佳做法**

 使用网络故事专用的号召性用语

 在重新创作最初针对某个社交平台（例如 Instagram、Snapchat 或 YouTube）创作的故事时，请务必移除所有针对特定平台的读者号召性用语。确保用户能够按照您的网络故事中推荐的任何措施操作。

 使用全出血视频和图片

 在故事中添加全出血素材资源，为读者打造沉浸感更强的体验。

 避免使用低分辨率或失真的图片和视频

 使用高画质图片，并在重新调整图片大小以适应纵向模式时保持谨慎。

 向封面页添加徽标

 添加代表您品牌的高分辨率徽标。

 缩短视频时长

 我们建议每个网页包含的视频长度不超过 15 秒，或最多 60 秒。

 添加音频

 使用时长至少为 5 秒且音量均衡的高品质音频剪辑，并确保用户能够听到语音内容。

 考虑针对仅含视频的故事使用自动播放功能

 基于视频的网络故事自动播放体验可能适合营造悠闲的体验。

##  搜索引擎优化 (SEO)

**注意**：针对网页的 [SEO 最佳做法](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=zh-cn)也适用于[网络故事](https://developers.google.com/search/docs/appearance/enable-web-stories?hl=zh-cn)，因为网络故事仍然属于网页。

**关键的 SEO 最佳做法**

 提供高品质的内容

 与任何网页一样，为读者提供实用且有趣的高品质内容是您可以做的最重要的工作。请添加完整的叙事内容，并遵循[故事讲述最佳做法](#storytelling)以持续吸引您的读者。

 标题保持较短的长度

 标题保持少于 90 个字符的长度。我们建议您使用少于 70 个字符的描述性标题。

 确保 Google 搜索可以找到您的故事

 不要在故事中添加 `noindex` 属性；该属性会阻止 Google 将相应网页编入索引，并阻止其显示在 Google 中。此外，请将网络故事添加到您的站点地图中。您可以使用 Search Console 中的[“索引涵盖范围”报告](https://support.google.com/webmasters/answer/7440203?hl=zh-cn)和[“站点地图”报告](https://support.google.com/webmasters/answer/7451001?hl=zh-cn)查看 Google 能否找到您的网络故事。

 让故事自身即是规范网页

 所有网络故事都必须是规范网页。确保每个网络故事都有自己的 [`link rel="canonical"`](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery/)。例如：`<link rel="canonical" href="https://www.example.com/url/to/webstory.html">`
**注意**：如果同一个故事有多个语言版本，请务必[告知 Google 本地化版本](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)。

 附加元数据

 确保您的网络故事遵循 [AMP 故事元数据指南](https://amp.dev/documentation/components/amp-story/#metadata-guidelines)。添加您通常在网页中添加的标记，例如：

- [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) 和 [`description`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)`meta` 标记
- [结构化数据](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn)
- [OGP](https://ogp.me/)
-  [Twitter 卡片](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards)

### 更多 SEO 最佳做法

**推荐的 SEO 最佳做法**

 添加结构化数据

 我们建议您在网络故事中[添加结构化数据](https://developers.google.com/search/docs/appearance/structured-data/article?hl=zh-cn#amp-sd)，帮助 Google 搜索了解您的网络故事的结构和内容。

 在图片中添加替代文本

 建议您在图片中添加替代文本，以便让您的故事更容易被发现。

 将故事集成到您的网站中

 我们建议您将网络故事集成到您的网站中，例如从您的首页或类别页面（如果适用）链接到您的网络故事。例如，如果您的网络故事以某个旅游目的地为主题，并且您的一个网页中列出了您的所有旅游类文章，那么您也可以在该类别页面中添加指向此网络故事的链接。使用 `www.example.com/stories` 等其他专用着陆页（可从首页等关键网页链接到此类着陆页）或许也能奏效。

 您无需在网络故事的网址中指明其采用网络故事格式或 AMP 故事技术。理想情况下，您的网络故事会集成在更广泛的网址策略中。 例如，如果您的 "New York Travel" 文章使用的是 `"/new-york/travel/title-of-article.html"` 等格式，则可以考虑为您的网络故事使用完全相同的目录结构和网址格式。

 使用 AMP 故事网页附加内容

 [AMP 故事网页附加内容](https://amp.dev/documentation/components/amp-story-page-attachment/)可用于在您的网络故事旁边显示其他信息。这有助于为您的网络故事中所呈现的内容提供额外的详细信息、深入探讨或后续历程。

 在视频中添加字幕

 [在视频中添加字幕](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)，帮助读者更好地理解您的故事。避免使用烧入视频中的字幕，以确保字幕不会与其他内容重叠或溢出屏幕边缘。

 优化仅包含视频的故事

 我们建议您使用语义 HTML 制作网络故事。不过，某些网络故事编辑器工具可能会导出将每张幻灯片的格式都设为视频文件（将所有文字都烧入视频）的故事。在这种情况下，我们建议您将视频内部显示的确切文字作为 [`amp-video`](https://amp.dev/documentation/components/amp-video/?format=stories) 元素的 `title` 属性进行添加。同样，只有在您无法在网络故事中使用语义标记时才可以这样操作。

 添加对横向显示屏的支持

 若要让网络故事能够显示在桌面版 Google 搜索结果中，请添加[对横向显示屏的支持](https://amp.dev/documentation/examples/style-layout/desktop_and_landscape_mode_support/)。

##  技术

**关键的技术最佳做法**

 让网络故事成为有效网页

 网络故事必须是有效的 AMP 网页。为避免出现无效 AMP 问题，请使用 [AMP 验证器工具](https://validator.ampproject.org/)测试您的故事，并修复检测到的所有错误。

 不要将文字添加到海报图片中

 避免使用包含烧入文字的图片，因为这样可能会在用户在 Google 搜索中预览您的故事时遮挡故事标题。如果无法清晰地阅读标题，用户继续阅读的可能性就会降低。

 设置合适的海报图片大小和宽高比

 确保与 `<amp-story> poster-portrait-src` 属性相关联的图片至少为 640x853 像素，并使用 3:4 的宽高比。

 为徽标添加合适的宽高比

 确保与 `<amp-story> publisher-logo-src` 属性相关联的徽标图片至少为 96x96 像素，并且宽高比为 1:1。

### 更多技术最佳做法

**推荐的技术最佳做法**

 添加 `og:image`

 我们建议在 `<meta>` 标记中添加 `og:image`，以便让您的故事更容易被发现。

##  其他资源

- [网络故事](https://amp.dev/about/stories)：AMP 项目提供的网络故事制作资源。
- [在 Google 搜索上启用网络故事](https://developers.google.com/search/docs/appearance/enable-web-stories?hl=zh-cn)：面向开发者的指南，其中介绍了如何制作网络故事，使其符合在 Google 搜索中显示需要遵循的技术指南。
- [AMP 故事网站](https://amp.dev/about/stories/)：以开发者为中心的网络故事格式功能。
- [网络无障碍功能](https://developers.google.com/web/fundamentals/accessibility?hl=zh-cn)：关于如何确保网络故事可供所有用户访问的提示。
- [结构化数据指南](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn)：详细介绍如何添加结构化数据，帮助 Google 搜索理解您的内容。

 [
上一页
  arrow_back   在 Google 上启用网络故事  ](https://developers.google.com/search/docs/appearance/enable-web-stories?hl=zh-cn)

 [
下一页
  网络故事内容政策   arrow_forward  ](https://developers.google.com/search/docs/appearance/web-stories-content-policy?hl=zh-cn)

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-06-15。
