---
title: "增强在 Google 搜索结果中显示的 AMP 内容"
source: https://developers.google.com/search/docs/crawling-indexing/amp/enhance-amp?hl=zh_CN
slug: search__docs__crawling-indexing__amp__enhance-amp
path: /search/docs/crawling-indexing/amp/enhance-amp
---

# 增强在 Google 搜索结果中显示的 AMP 内容

> 来源: https://developers.google.com/search/docs/crawling-indexing/amp/enhance-amp?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 增强在 Google 搜索结果中显示的 AMP 内容

 如要增强在 Google 搜索结果中显示的 [AMP](https://developers.google.com/amp?hl=zh-cn) 内容，您可以创建基本的 AMP 网页、添加结构化数据、监控网页以及通过 Codelab 进行练习。

## 创建基本的 AMP 网页

1. [创建您的第一个 AMP 网页](https://www.ampproject.org/docs/get_started/create)。
2.  遵循[针对 AMP 网页的 Google 搜索指南](https://developers.google.com/search/docs/crawling-indexing/amp?hl=zh-cn)。
3.  [链接您的网页，让您的内容更容易被发现](https://www.ampproject.org/docs/guides/discovery)。为便于抓取和索引编制，Google 搜索要求将 AMP 网页链接到[规范网页](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)。规范网页可以是网页的非 AMP 版本，也可以是 AMP 网页本身。
4.  在内容和可执行的操作方面，尽可能确保用户能在 AMP 网页上获得与在对应的规范网页上相同的体验。
5.  使用 [AMP 测试工具](https://search.google.com/test/amp?hl=zh-cn)确保您的网页符合 Google 搜索对有效 AMP HTML 文档的要求。
6.  在规范网页和 AMP 网页中使用相同的[结构化数据标记](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn)。
7.  采用通用的内容最佳做法：

  1. 确保 [robots.txt 文件](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt?hl=zh-cn)不会屏蔽 AMP 网页。在适当的情况下，使用 [robots`meta` 标记、`data-nosnippet` 和 `X-Robots-Tag`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn)。
  2.  遵循[语言和区域网址 hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn) 相关指南。有关 AMP 的具体示例，请参阅[国际化](https://amp.dev/documentation/examples/guides/internationalization/)。

## 使用 CMS 创建 AMP 网页

如果您通过内容管理系统 (CMS) 呈现网页内容，可以使用现有的 CMS 插件（例如 [WordPress](https://wordpress.org/plugins/amp/)、[Drupal](https://www.drupal.org/project/amp) 或 Joomla 插件）或在 CMS 中实现自定义功能以生成 AMP 内容。如果您打算自定义 CMS，那么除了参考[创建基本的 AMP 网页](#create-basic-amp)的说明之外，您还应遵循以下指南：

- 思考如何让 AMP HTML 文件符合您网站的网址路径方案。如果除了被用作规范版本的非 AMP 网页之外，您还要生成 AMP 网页，我们建议您选择以下网址方案之一：

  - https://www.example.com/myarticle/amp
  - https://www.example.com/myarticle.amp.html

- 开发一个结构化数据标记模板。以下是一些相关指南：

  - 根据您要发布的内容类型的要求构建模板。
  - 如需获取食谱、文章、视频和评价的示例模板，请参阅 [AMP 项目元数据示例](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples)。

## 针对富媒体搜索结果进行优化

 您可以使用结构化数据增强您的网页在搜索结果中的显示效果。采用结构化数据的 AMP 网页可以显示为[富媒体搜索结果](https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=zh-cn)，例如显示在“焦点新闻”轮播界面或托管内容轮播界面中。

1. [实现结构化数据](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn)。
2. 使用[富媒体搜索结果测试](https://search.google.com/test/rich-results?hl=zh-cn)验证结构化数据能否正确解析。
3. 使用 [AMP 测试工具](https://search.google.com/test/amp?hl=zh-cn)验证您的 AMP 设置是否完整。

## 监控和改进网页

 通过监控以下报告定期检查您的所有 AMP 网页：

- [AMP 状态报告](https://search.google.com/search-console/amp?hl=zh-cn)：发现网站模板实现问题和其他可能影响到大量 AMP 网页的网站级实现问题。
- [富媒体搜索结果状态报告](https://support.google.com/webmasters/answer/7552505?hl=zh-cn)：找出结构化数据存在的问题，发掘可提供更多结构化数据的机会。

如果您需要 AMP 网页不再出现在 Google 搜索结果中，请按照[从 Google 搜索结果中移除 AMP 网页](https://developers.google.com/search/docs/crawling-indexing/amp/remove-amp?hl=zh-cn)进行操作。

## 通过 Codelab 练习

 您可通过以下 Codelab 练习构建 AMP 网页：

- 学习 Codelab 中的 [AMP 基础课程](https://codelabs.developers.google.com/codelabs/accelerated-mobile-pages-foundations/?hl=zh-cn)，了解如何构建 AMP 网页。
- 完成 [AMP 高级概念](https://codelabs.developers.google.com/codelabs/accelerated-mobile-pages-advanced/?hl=zh-cn#0) Codelab，了解如何将分析、视频嵌入、社交媒体集成和图片轮播界面等功能添加到 AMP 网页中。
- 完成[美观的互动式规范 AMP 网页](https://developers.google.com/codelabs/amp-beautiful-interactive-canonical?hl=zh-cn#0) Codelab，学习如何构建囊括丰富 AMP 功能和扩展组件的 AMP 网页。
- 完成 [AMP+PWA](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/) Codelab，了解如何使用 AMP 组件打造 [PWA](https://developers.google.com/web/progressive-web-apps?hl=zh-cn) 体验。

## 资源

现在，您已经创建了自己的 AMP 网页；接下来，您便可参考下列资源来详细了解其他 Google 产品与 AMP 的集成：

- 了解如何[创建 AMP 广告单元](https://support.google.com/adsense/answer/7183212?hl=zh-cn)。
- 了解如何[通过 AMP 网页创收](https://support.google.com/dfp_premium/topic/7178122?hl=zh-cn)。
- 使用 [Google 跟踪代码管理器](https://support.google.com/tagmanager/answer/9205783?hl=zh-cn)优化和衡量营销活动效果。
- [向 AMP 网页添加分析工具](https://developers.google.com/analytics/devguides/collection/amp-analytics?hl=zh-cn)，以使用内置的 Google Analytics 功能跟踪用户互动情况。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-07-08。
