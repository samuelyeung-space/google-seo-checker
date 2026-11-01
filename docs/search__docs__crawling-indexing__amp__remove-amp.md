---
title: "从 Google 搜索结果中移除 AMP 网页"
source: https://developers.google.com/search/docs/crawling-indexing/amp/remove-amp?hl=zh_CN
slug: search__docs__crawling-indexing__amp__remove-amp
path: /search/docs/crawling-indexing/amp/remove-amp
---

# 从 Google 搜索结果中移除 AMP 网页

> 来源: https://developers.google.com/search/docs/crawling-indexing/amp/remove-amp?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 从 Google 搜索结果中移除 AMP 网页

本页为 Web 开发者介绍了从 Google 搜索结果中移除 AMP 网页的方法。

**要点**：在这一页中，我们会提到规范网页、AMP 网页和非 AMP 网页。规范网页可以是网页的非 AMP 版本，也可以是 AMP 网页本身。您可以选择以下两种可能的网页设置之一：

- **AMP 规范网页**：网页只有一个 AMP 版本，AMP 网页便是规范网页。
- **非 AMP 规范网页**：网页有两个版本，包括 AMP 网页和非 AMP 规范网页。

您可以通过以下三种方式来移除 AMP 内容：

- [快速移除网页的所有版本](#remove-all-content)，包括 AMP 网页和非 AMP 规范网页
- [仅移除与规范的非 AMP 网页对应的 AMP 网页](#remove-only-amp)，同时使规范的非 AMP 网页保持有效状态
- [通过 CMS 移除 AMP 内容](#remove-amp-with-cms)（可选择移除网页的所有版本，或仅移除 AMP 版本）

## 移除 AMP 内容的所有版本，包括 AMP 和非 AMP 版本

此部分介绍了如何从 Google 搜索结果中移除 AMP 内容的所有版本（包括 AMP 和非 AMP 网页）。

**注意**：使用此方法可能会导致向用户显示错误消息。 因此，除非需要尽快从 Google 搜索结果中移除 AMP 网页，否则请不要使用此方法。

如需从 Google 搜索结果中移除 AMP 和非 AMP 网页，请按以下步骤操作：

1. 将网页的 AMP 和非 AMP 版本从您的服务器或 CMS 中删除。
2. 使用[移除过期内容](https://www.google.com/webmasters/tools/removals?hl=zh-cn)工具请求移除您的网页。输入要移除网页的 AMP 和非 AMP 版本对应的网址。
3. 在 Google 搜索中搜索您的内容，验证您的 AMP 网页是否已移除。如需验证大量 AMP 网页是否已移除，您可以查看 Search Console 中的[AMP 状态报告](https://search.google.com/search-console/amp?hl=zh-cn)， [并在“已编入索引的 AMP 网页数”图表中查看是否有下降趋势线。](https://support.google.com/webmasters/answer/7450883?hl=zh-cn)

您可以在[移除过期内容](https://www.google.com/webmasters/tools/removals?hl=zh-cn)页面中查看请求的处理状态。

**注意**：当您删除 AMP 网页后，Googlebot 要过一段时间才能发现该网页已被移除。在此期间，Google 搜索会向用户显示错误消息。

## 仅移除 AMP 网页，同时保留非 AMP 规范网页

此部分介绍了如何从 Google 搜索结果中仅移除 AMP 网页，同时仍保留非 AMP 规范网页。

**注意**：请勿通过删除文件中的内容来移除 AMP 内容。缺少所有标记的空文档会被视为无效文档。当 Google 搜索识别出文档无效时，会继续提供最旧的可用有效版本。

如需从 Google 搜索结果中移除网页的 AMP 版本（同时保留非 AMP 规范网页），请按以下步骤操作：

1. 从非 AMP 规范网页的源代码中移除 `rel="amphtml"` 链接。
2. 设置您的服务器，让其针对已移除的 AMP 网页返回 `HTTP 301 Moved Permanently` 或 `302 Found` 响应。
3. 配置从已移除的 AMP 网页到规范的非 AMP 网页的重定向。
4. 从 Google 搜索结果中移除 AMP 网页后，如果您还想从非 Google 平台中移除该 AMP 网页，请完成以下步骤：

  1. 将服务器配置为针对已移除的 AMP 网页发送 `HTTP 404 Not Found`，从而移除 AMP 网页，使其无法再被访问。
  2. 在 Google 搜索中搜索您的内容，验证您的 AMP 网页是否已移除。如需验证大量 AMP 网页是否已移除，可以查看 Search Console 中的[AMP 状态报告](https://search.google.com/search-console/amp?hl=zh-cn)， [并在“已编入索引的 AMP 网页数”图表中查看是否出现下降趋势线。](https://support.google.com/webmasters/answer/7450883?hl=zh-cn)
  3. 如需使固定链接保持有效状态，请将服务器配置为针对已移除的 AMP 网页发送 `HTTP 301 Redirect`，以便跳转到非 AMP 规范网页。

## 通过 CMS 移除 AMP 和非 AMP 网页

一般来说，CMS 提供商会同时发布 AMP 和非 AMP 网页。要移除单个网页，请取消发布或删除该网页，这样做会同时移除该网页的 AMP 和非 AMP 版本。

### 删除单个网页

要删除某个网页，并阻止以 AMP 和非 AMP 形式发布该网页，请使用 CMS 界面。要详细了解如何停止提供 AMP，请查看 CMS 提供商的帮助页面：

- [WordPress.com 帮助页面](https://en.support.wordpress.com/google-amp-accelerated-mobile-pages/)
- [Drupal 帮助页面](https://cgit.drupalcode.org/amp/tree/README.md?h=8.x-1.x)
- [SquareSpace 帮助](https://support.squarespace.com/hc/en-us/articles/223766868-Using-AMP-with-Squarespace)

### 移除所有 AMP 网页

 另一种方法是通过 CMS 停用 AMP。

**警告**：使用该方法时，您将从网站中移除所有 AMP 网页。

如需停用 AMP，请查看 CMS 提供商的帮助页面，或与 CMS 提供商联系。如果您的网站托管在 CMS 网域上，则 CMS 可以在 AMP 停用后将用户重定向到规范的非 AMP 网页。如果未发生重定向，请向 CMS 提供商寻求帮助。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-07-08。
