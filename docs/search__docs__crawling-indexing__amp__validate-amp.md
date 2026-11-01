---
title: "验证 AMP 内容"
source: https://developers.google.com/search/docs/crawling-indexing/amp/validate-amp?hl=zh_CN
slug: search__docs__crawling-indexing__amp__validate-amp
path: /search/docs/crawling-indexing/amp/validate-amp
---

# 验证 AMP 内容

> 来源: https://developers.google.com/search/docs/crawling-indexing/amp/validate-amp?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 验证 AMP 内容

[创建 AMP 内容](https://developers.google.com/search/docs/guides/enhance-amp?hl=zh-cn)后，您可以通过以下几种方式验证 AMP 内容：

- 使用 [AMP 测试工具](https://search.google.com/test/amp?hl=zh-cn)确保您的 AMP 内容有效。
- 对于[适用的 AMP 内容类型](https://developers.google.com/search/docs/guides/about-amp?hl=zh-cn)，请使用[富媒体搜索结果测试](https://search.google.com/test/rich-results?hl=zh-cn)验证结构化数据能否正确解析。
- 使用 [AMP 状态报告](https://search.google.com/search-console/amp?hl=zh-cn)监控您网站上所有 AMP 网页的性能。

## 修正常见的 AMP 错误

 如果您的 AMP 网页没有在 Google 搜索结果中显示，请尝试以下步骤：

**注意**：Google 可能需要一段时间才能将您的 AMP 内容编入索引。

1. 关联相关网页，[使您的 AMP 网页可被轻松发现](https://www.ampproject.org/docs/guides/discovery)。

  - 您是否向规范网页添加了 `rel="amphtml"`？
  - 您是否向其他非 AMP 网页（例如移动版网页）添加了 `rel="amphtml"`？
  - 您是否向 AMP 网页添加了 `rel="canonical"`？

2. 遵循[针对 AMP 网页的 Google 搜索指南](https://developers.google.com/search/docs/crawling-indexing/amp?hl=zh-cn)。
3. 使您的 AMP 内容可供 Googlebot 访问：

  - 修改网站的 robots.txt，允许 Googlebot 抓取规范网页、AMP 网页以及结构化数据中的链接（若适用）。
  - 从规范内容和 AMP 内容中移除所有 robots`meta` 标记和 `X-Robots-Tag` HTTP 标头。如需了解详情，请参阅 [Robots`meta` 标记和 `X-Robots-Tag` HTTP 标头规范](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn)。

4. 确保您的结构化数据遵循适用于[您的网页和功能类型](https://developers.google.com/search/docs/guides/search-gallery?hl=zh-cn)的结构化数据指南。如需详细了解 AMP 的结构化数据要求，请参阅 [Google 搜索中的 AMP 网页简介](https://developers.google.com/search/docs/guides/about-amp?hl=zh-cn)。

完成相应步骤后，如果您的 AMP 网页仍然无法在 Google 搜索结果中显示，请参考下面列出的一些其他原因：

- 您所在的国家/地区可能无法使用某些 Google 搜索功能。
- 您的网站可能尚未编入索引。若要详细了解抓取和索引编制功能，请参阅[抓取和索引编制常见问题解答](https://developers.google.com/search/help/crawling-index-faq?hl=zh-cn)。

## 资源

如需调试验证错误，请参阅以下 [ampproject.org](https://www.ampproject.org/) 资源：

- [AMP 验证错误](https://www.ampproject.org/docs/reference/validation_errors)
- [如何修复验证错误？](https://www.ampproject.org/docs/guides/validate#how-do-i-fix-validation-errors?)

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-07-08。
