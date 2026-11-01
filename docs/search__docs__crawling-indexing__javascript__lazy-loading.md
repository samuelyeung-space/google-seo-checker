---
title: "修正延迟加载的内容"
source: https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading?hl=zh_CN
slug: search__docs__crawling-indexing__javascript__lazy-loading
path: /search/docs/crawling-indexing/javascript/lazy-loading
---

# 修正延迟加载的内容

> 来源: https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 修正延迟加载的内容

 推迟加载非关键性内容或不可见内容（通常也称为“延迟加载”）是一种常见的提升性能和用户体验的最佳实践。如需了解详情，请参阅 [web.dev 上有关延迟加载图片和视频的资源](https://web.dev/fast?hl=zh-cn#lazy-load-images-and-video)。但是，如果实现不当，此技术可能会在无意中使内容对 Google 不可见。本文档介绍了如何确保 Google 可以抓取延迟加载的内容并将其编入索引。

## 当内容在视口中可见时对其进行加载

若要确保 Google 能看到您网页上的所有内容，请确保每当相关内容在视口中可见时，延迟加载实现策略便会加载所有这些内容。以下是实现延迟加载的一些方法：

- [浏览器内置延迟加载](https://web.dev/articles/browser-level-image-lazy-loading?hl=zh-cn)图片和 iframe
- [IntersectionObserver API](https://web.dev/articles/intersectionobserver?hl=zh-cn) 和 [polyfill](https://github.com/GoogleChromeLabs/intersection-observer)
- 支持在数据进入视口时加载数据的 JavaScript 库

上述方法不依赖于用户操作（例如滚动或点击）来加载内容，这一点很重要，因为 Google 搜索不会与您的网页互动。

请勿对用户打开网页时可能立即看到的内容添加延迟加载机制。这可能会导致内容在浏览器中加载和显示所需的时间更长，这对用户来说会非常明显。

请务必[测试您的实现效果](#test)。

## 支持分页加载以实现无限滚动

 从大体上讲，无限滚动是一种技术，可在用户向下滚动长网页时加载更多内容、更多不同的网页。这可能是一篇被拆分为多个段落的长文章，也可能是一组被类似地拆分为多个分块的内容。如需以可编入索引的方式实现无限滚动，请确保您的网站支持分页加载这些分块，方法如下：

- 为每个分块提供自己的永久性独特网址。
- 确保每次在浏览器中加载每个网址时，显示的内容都保持不变。 一种方法是在网址中使用绝对页码，例如使用 `?page=12` 作为查询参数。
- 请避免在这些网址中使用 `?date=yesterday` 等相对元素。这样一来，搜索引擎和用户就可以在给定网址下始终找到相同的内容，搜索引擎更容易将内容正确编入索引，用户也可以分享并重新与相应内容互动。
- 依次链接到各个网址，以便搜索引擎能够在分页集合中发现网址。详细了解[实现分页时的最佳实践](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading?hl=zh-cn#best-practices-when-implementing-pagination)。
- 当系统加载新的网页块以响应用户滚动操作，并且该块成为主要用户可见元素时，请使用 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 更新显示的网址。 这样一来，用户就可以刷新、分享和链接到浏览器中显示的当前网址。

## 测试

 配置好实现策略后，请确保该策略能够正常运行。您可以使用 Search Console 中的[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)查看系统是否已加载所有内容。 检查渲染的 HTML，确保您的内容位于渲染的 HTML 中，方法是在网址检查工具中查找相应内容。如果您的图片或视频网址显示在渲染的 HTML 中 `<img>` 或 `<video>` 元素的 `src` 属性中，则表示您的设置正确无误。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
