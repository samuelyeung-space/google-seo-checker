---
title: "site: 搜索运算符"
source: https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=zh_CN
slug: search__docs__monitor-debug__search-operators__all-search-site
path: /search/docs/monitor-debug/search-operators/all-search-site
---

# site: 搜索运算符

> 来源: https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# `site:` 搜索运算符

 `site:` 查询是一个搜索运算符，您可以使用它请求来自运算符中指定的特定网域、网址或网址前缀的搜索结果。例如：

`site:` 示例

`site:example.com`

 仅显示来自 `example.com` 网域（`www.example.com` 和 `recipes.example.com`）的结果。

`site:https://www.example.com/ramen` tsukemen

 显示包含以 `https://www.example.com/ramen` 开头的网址并与 tsukemen 一词相关的网页的结果。

`site:` 搜索运算符适用于所有 Google 搜索类产品和服务。

 如果某个网址已被 Google 编入索引，那么它可以显示在与该网址相关的 `site:` 查询的搜索结果中，但不能保证它一定会出现。如果网址未显示在 `site:` 查询的结果中，请使用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)确保该网址可编入索引并提交该网址以使其编入索引。此外，请仔细检查查询是否正确；`site:https://www.example.com` 返回的结果与 `site:https://example.com/` 返回的结果并不相同。

## 适合网站所有者的用途

您可以通过几种方式借助 `site:` 查询来调试网站。下面是一些示例：

`site:` 示例

`site:example.com`

返回已编入索引并呈现给用户的网址的列表。

 返回的网址列表不一定详尽无遗。如果网站的规模较大，结果中应该不会显示其所有网址。与使用更宽泛的前缀相比，在查询中使用更具体的前缀可能会产生更多结果。

`site:https://example.com/recipes/tsukemen.html`

可帮助您了解特定网址是否已编入索引并呈现给用户。

`site:example.com viagra casino`

有助于发现和监控网站上的垃圾内容问题。

`site:https://example.com/` lemon

显示查询“lemon”一词会显示网站上的哪些网址。

`site:https://example.com/recipes/tsukemen.html` lemon

显示是否已按照“lemon”一词将特定网址编入索引。

## 限制

 `site:` 运算符主要是为执行搜索的用户设计的，因此存在一些局限性，网站所有者可能会觉得受到限制。具体而言存在如下限制：

-  `site:` 运算符不一定会返回按照查询中指定的前缀编入索引的所有网址。如果您要使用 `site:` 运算符来完成某些任务（例如确定有多少网址已按照某个前缀编入索引并呈现给用户），请记住这一点。
-  如果只有 `site:` 运算符而不含查询字词（例如 `site:example.com`），系统不会对结果进行排名。系统通常会在顶部显示带有该前缀的最短网址，但除此之外则会相对随机地显示结果。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
