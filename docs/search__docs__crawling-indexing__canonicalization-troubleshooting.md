---
title: "解决规范化问题"
source: https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting?hl=zh_CN
slug: search__docs__crawling-indexing__canonicalization-troubleshooting
path: /search/docs/crawling-indexing/canonicalization-troubleshooting
---

# 解决规范化问题

> 来源: https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 解决规范化问题

 即使您明确指定了规范网页，Google 也可能会出于各种原因（例如内容质量或技术信号）而选择其他网页作为规范网页。如需排查规范化问题，请按以下步骤操作：

1.  **检查 Google 将哪个网页视为规范网页**：使用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn#google-selected-canonical)可了解 [Google 会将哪个网页视为规范网页](https://developers.google.com/search/docs/crawling-indexing/canonicalization?hl=zh-cn)，并思考对来自 Google 搜索的用户而言，Google 选择的规范网址是否比您的首选规范网址更有意义。
 **重要提示**：如果规范网址所在的 Search Console 资源不归您所有，您将无法查看重复网页的任何流量。

2.  **查找技术性规范化问题**：验证是否因技术配置错误而导致系统检测到出乎预料的首选规范网址。查看[常见规范化问题表格](#common-issues)，检查是否存在不正确的规范元素、服务器配置错误或缺少本地化注释等问题。
3.  **确保集群在一起的网页足够不同**：从技术上讲，解决规范化问题归根结底就是确保[集群在一起](https://developers.google.com/search/docs/crawling-indexing/canonicalization?hl=zh-cn#canonical-how)的网页足够不同。注意事项：

  -  **重新评估需要时间**：即使在修正内容问题后，Google 也可能会将重复集群中的网页保留**最多两周**。
  -  **内容差异很重要**：如果新内容与其他集群网页之间的差异明显且显著，网页通常会更快地拆分出来。

4.  **请求重新编入索引**：修正内容问题后，请使用 Search Console [网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn#request_indexing)中的“请求编入索引”功能，让 Google 重新评估集群中的网页。不过，由于此功能受配额限制，请将其留给最重要的网址。

## 常见的规范化问题

 有多种原因会造成 Google 选择的规范网址不同于您希望在 Google 搜索中显示的规范网址。最常见的问题有：

常见的规范化问题

## 没有本地化注释的语言版本

 如果您有多个网站会向世界各地的不同用户显示实质相同的本地化内容，请务必[遵循我们的本地化网站指南](https://developers.google.com/search/docs/specialty/international?hl=zh-cn)。例如，如果您为美国、英国和澳大利亚的英语用户分别创建了不同的网站，但内容相同，那么为网页添加 `hreflang` 注释有助于向不同地区的用户显示正确的网页。

## 不正确的规范元素

 某些内容管理系统 (CMS) 或 CMS 插件可能会错误地使用规范化技术指向不需要的网址。请使用浏览器的开发者工具来检查您的 HTML，确认是否如此。如果您的网站显示了意外的规范网址偏好设置，可能是由于错误地使用了 `rel="canonical"` 或 `3xx` 重定向，请与您的 CMS 提供商联系并向其报告此错误。

## 服务器配置不正确

 某些托管配置错误可能会导致非预期的跨网域网址选择。例如：

-  服务器可能被错误地配置为：针对 `other.example` 上某个网址的请求返回 `example.com` 的内容
-  两个毫无关联的网络服务器可能会返回相同的 [`soft 404` 网页](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors?hl=zh-cn#soft-404-errors)，而 Google 未能将其识别为错误网页。如果您发现是这种情况，请与您的托管服务提供商联系。

## 恶意攻击

 某些针对网站的攻击会引入返回 HTTP [`3xx` 重定向](https://developers.google.com/search/docs/crawling-indexing/301-redirects?hl=zh-cn)的代码，或者会在 HTML `<head>` 或 HTTP 标头中插入跨网域 `rel="canonical"``link` 注释（通常会指向托管恶意内容或垃圾内容的网址）。在这些情况下，我们的算法可能会选择恶意或垃圾网址，而不是[被入侵网站](https://web.dev/articles/hacked?hl=zh-cn)上的网址。

## 转载内容

 对于希望避免转载合作伙伴造成重复内容的网站，建议不要使用规范 link 元素，因为网页通常有很大差异。最有效的解决方案是让合作伙伴阻止将您的内容编入索引。如需了解详情，请参阅[避免在 Google 新闻中出现重复报道](https://support.google.com/news/publisher-center/answer/9606800?hl=zh-cn)，其中还提到了从 Google 搜索结果中屏蔽转载内容的建议。

## 仿冒网站

 在极少数情况下，我们的算法选择的网址可能来自未经您允许擅自使用您的内容的外部网站。如果您认为其他网站违反版权法抄袭了您的内容，可以与该网站的站长联系，要求其移除相关内容。此外，您还可以[根据《数字千年版权法案》提交请求](https://support.google.com/legal/answer/1120734?hl=zh-cn)，请求 Google 从搜索结果中移除涉嫌侵权的网页。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-09-11。
