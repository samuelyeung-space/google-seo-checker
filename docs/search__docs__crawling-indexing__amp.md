---
title: "Google 搜索中的 AMP 简介"
source: https://developers.google.com/search/docs/crawling-indexing/amp?hl=zh_CN
slug: search__docs__crawling-indexing__amp
path: /search/docs/crawling-indexing/amp
---

# Google 搜索中的 AMP 简介

> 来源: https://developers.google.com/search/docs/crawling-indexing/amp?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# Google 搜索中的 AMP 简介

Google 搜索会将 [AMP](https://developers.google.com/amp?hl=zh-cn) 网页与其他网页一样编入索引，并且无论网页是采用何种技术构建而成，Google 搜索都会对所有网页采用统一标准。本页介绍了 AMP 网页在搜索结果中的显示方式、将 AMP 与 Google 搜索搭配使用的指南，以及有关 AMP 和 Google 搜索的常见问题。如需详细了解使用 AMP 的好处，请参阅 [AMP 项目成功案例](https://amp.dev/success-stories/)。

## AMP 网页在搜索结果中的显示方式

 AMP 网页可以在 Google 搜索中显示为[富媒体搜索结果](https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=zh-cn)，就像其他网页一样。为了帮助 Google 更好地了解您的网页，您可以向网页中添加[结构化数据](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn)。添加结构化数据并不能保证您的网页一定会以富媒体搜索结果的形式显示在搜索结果中。有关详情，请参阅[结构化数据常规指南](https://developers.google.com/search/docs/guides/sd-policies?hl=zh-cn)。

 AMP 网页也可以显示为网络故事。详细了解如何[在 Google 搜索中启用网络故事](https://developers.google.com/search/docs/appearance/enable-web-stories?hl=zh-cn)。

## 与 Google 搜索中的 AMP 网页相关的指南

我们所有关于如何使网站便于 Google 处理的[最佳实践](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=zh-cn)均适用于 AMP 网页。本部分将介绍我们专为 Google 搜索中的 AMP 网页制定的一些其他指南。

- AMP 网页必须遵守 [AMP HTML 规范](https://www.ampproject.org/docs/reference/spec.html)。如果您是新手，请了解如何[创建您的首个 AMP HTML 网页](https://www.ampproject.org/docs/get_started/create.html)。
- 在可能的情况下，用户在 AMP 网页上获得的内容体验和可执行的操作，必须与其在对应的规范网页上完全一致。
- AMP 的 URL scheme 必须易于用户理解。
例如，如果规范网页是 `example.com/giraffes`，请将 AMP 网页托管在 `amp.example.com/giraffes` 或 `example.com/amp/giraffes` 这样的位置，而不是托管在 `test.com/giraffes` 上。 这是因为当用户在 Google 搜索结果中点击某个指向 AMP 网页的链接时，浏览器即会像显示任何网页的网址一样显示相应的 AMP 网址；倘若所显示的网址与主网站完全不相关，则可能会令用户感到困惑。

-  您的 AMP 网页必须[有效](https://search.google.com/test/amp?hl=zh-cn)，才能按预期向用户呈现。
-  如果您向网页中添加结构化数据，请务必遵守我们的[结构化数据政策](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn)。

## 其他 AMP 主题

以下主题介绍了如何在 Google 搜索中使用 AMP。

主题

[增强在 Google 搜索结果中显示的 AMP 内容](https://developers.google.com/search/docs/crawling-indexing/amp/enhance-amp?hl=zh-cn)

了解如何增强和监控 AMP 网页。

[验证 AMP 内容](https://developers.google.com/search/docs/crawling-indexing/amp/validate-amp?hl=zh-cn)

本文档包含关于如何验证 AMP 网页的提示和建议。

[从 Google 搜索结果中移除 AMP 网页](https://developers.google.com/search/docs/crawling-indexing/amp/remove-amp?hl=zh-cn)

了解如何从 Google 搜索结果中移除 AMP 网页。

## 常见问题解答

### AMP 网页只能在移动设备上显示吗？

不是。AMP 网页可在所有类型的设备上查看，因此请使用[自适应设计](https://www.ampproject.org/docs/guides/author-develop/responsive_amp)构建 AMP 网页。

### AMP 网页在桌面设备上的呈现效果如何？

AMP 网页在移动设备屏幕和桌面设备屏幕上的显示效果一样好。如果 AMP 支持您所需的全部功能，您不妨考虑将网页创建为[独立的 AMP 网页](https://www.ampproject.org/docs/guides/deploy/discovery#what-if-i-only-have-one-page)，以满足使用桌面设备的访问者和使用移动设备的访问者对同一网页的不同需求。但是，当桌面设备上的 AMP 网页出现在 Google 搜索结果中时，它们无法使用搜索专用功能。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-07-08。
