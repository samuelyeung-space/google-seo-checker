---
title: "解决与 Google 搜索相关的 JavaScript 问题"
source: https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript?hl=zh_CN
slug: search__docs__crawling-indexing__javascript__fix-search-javascript
path: /search/docs/crawling-indexing/javascript/fix-search-javascript
---

# 解决与 Google 搜索相关的 JavaScript 问题

> 来源: https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 解决与 Google 搜索相关的 JavaScript 问题

 本指南介绍了如何识别和解决一些 JavaScript 问题，这些问题可能会导致您的网页（或 JavaScript 网页上的特定内容）无法显示在 Google 搜索结果中。虽然 Google 搜索可以运行 JavaScript，但您在设计网页和应用时需要考虑一些差异和限制，以顺应抓取工具访问和呈现您的内容的方式。我们的 [JavaScript SEO 基础知识指南](https://developers.google.com/search/docs/guides/javascript-seo-basics?hl=zh-cn)详细介绍了如何针对 Google 搜索优化 JavaScript 网站。

Googlebot 经过精心设计，是一名优秀的网上公民。它的[主要任务](https://developers.google.com/search/blog/2017/01/what-crawl-budget-means-for-googlebot?hl=zh-cn)是抓取网站，同时确保其抓取操作不会导致网站的用户体验下降。Googlebot 及其网页渲染服务 (WRS) 组件会不断分析和识别对基本网页内容没有贡献的资源，并且可能不会抓取此类资源。例如，对基本网页内容没有贡献的报告和错误请求，以及在提取基本网页内容时不使用或没必要使用的其他类似类型的请求。客户端分析可能无法完整或准确地体现您网站上的 Googlebot 和 WRS 活动。使用 [Google Search Console 中的“抓取统计信息”报告](https://support.google.com/webmasters/answer/9679690?hl=zh-cn)可监控您网站上的 Googlebot 和 WRS 活动及反馈。

 如果您怀疑 JavaScript 问题可能会导致您的网页或 JavaScript 网页上的特定内容无法显示在 Google 搜索结果中，请按以下步骤操作。如果您不确定 JavaScript 是否是主要原因，请按照我们的[一般调试指南](https://developers.google.com/search/docs/guides/debug?hl=zh-cn)确定具体问题。

1. **如需测试 Google 抓取和渲染网址的效果**，请使用 Search Console 中的[富媒体搜索结果测试](https://search.google.com/test/rich-results?hl=zh-cn)或[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)。您可以查看已加载的资源、JavaScript 控制台输出和异常、渲染的 DOM 以及更多信息。

 此外，我们还建议您收集和审核用户（包括 Googlebot）在您网站上遇到的 JavaScript 错误，确定可能会影响内容渲染效果的潜在问题。 以下示例演示了如何记录[全局 onerror 处理程序](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)中记录的 JavaScript 错误。请注意，某些类型的 JavaScript 错误（如解析错误）无法使用此方法进行记录。

```
window.addEventListener('error', function(e) {
    var errorText = [
        e.message,
        'URL: ' + e.filename,
        'Line: ' + e.lineno + ', Column: ' + e.colno,
        'Stack: ' + (e.error && e.error.stack || '(no stack trace)')
    ].join('\n');

    // Example: log errors as visual output into the host page.
    // Note: you probably don't want to show such errors to users, or
    //       have the errors get indexed by Googlebot; however, it may
    //       be a useful feature while actively debugging the page.
    var DOM_ID = 'rendering-debug-pre';
    if (!document.getElementById(DOM_ID)) {
        var log = document.createElement('pre');
        log.id = DOM_ID;
        log.style.whiteSpace = 'pre-wrap';
        log.textContent = errorText;
        if (!document.body) document.body = document.createElement('body');
        document.body.insertBefore(log, document.body.firstChild);
    } else {
        document.getElementById(DOM_ID).textContent += '\n\n' + errorText;
    }

    // Example: log the error to remote service.
    // Note: you can log errors to a remote service, to understand
    //       and monitor the types of errors encountered by regular users,
    //       Googlebot, and other crawlers.
    var client = new XMLHttpRequest();
    client.open('POST', 'https://example.com/logError');
    client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    client.send(errorText);

});
```

2. **请务必防范 [`soft 404` 错误](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors?hl=zh-cn#soft-404-errors)。** 在单页应用 (SPA) 中，这可能会非常困难。 为防止将错误网页编入索引，您可以使用以下一种或两种策略：

  - 重定向至服务器响应 `404` 状态代码的网址。

```
fetch(`https://api.kitten.club/cats/${id}`)
 .then(res => res.json())
 .then((cat) => {
   if (!cat.exists) {
     // redirect to page that gives a 404
     window.location.href = '/not-found';
   }
 });
```

  -  添加 robots`meta` 标记或将其更改为 `noindex`。

```
fetch(`https://api.kitten.club/cats/${id}`)
 .then(res => res.json())
 .then((cat) => {
   if (!cat.exists) {
     const metaRobots = document.createElement('meta');
     metaRobots.name = 'robots';
     metaRobots.content = 'noindex';
     document.head.appendChild(metaRobots);
   }
 });
```

 SPA 使用客户端 JavaScript 处理错误时，通常会报告 `200` HTTP 状态代码，而不是[相应的状态代码](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=zh-cn#use-meaningful-http-status-codes)。 这会导致错误网页被编入索引并可能会显示在搜索结果中。

3. **Googlebot 可能会拒绝[用户权限请求](https://w3c.github.io/permissions/#permission-registry)。**
 需要用户权限的功能不适用于 Googlebot 或所有用户。例如，如果您需要 `Camera API`，而 Googlebot 无法向您提供相机。在这种情况下，应为用户提供一种方式，使其无需授予相机访问权限便能访问您的内容。
4. **请勿使用网址片段加载不同的内容。**
SPA 可能会使用网址片段（例如 https://example.com/#/products）加载不同的视图。自 2015 年起，[我们已弃用 AJAX 抓取方案](https://developers.google.com/search/blog/2015/10/deprecating-our-ajax-crawling-scheme?hl=zh-cn)，因此您不能提供网址片段让 Googlebot 抓取。我们建议您使用 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History)，以根据 SPA 中的网址加载不同的内容。
5. **不要依赖数据持久性来提供内容。**
和常规浏览器一样，WRS 会加载每个网址（请参阅 [Google 搜索的工作原理](https://developers.google.com/search/docs/fundamentals/how-search-works?hl=zh-cn)，简要了解 Google 如何发现内容），并执行服务器和客户端重定向。不过，在网页加载过程中，WRS 不会保留状态：

  - 在网页加载过程中，系统会清除本地存储空间和会话存储空间中的数据。
  - 在网页加载过程中，系统会清除 HTTP Cookie。

6. **使用内容指纹避免 Googlebot 缓存问题。**
 Googlebot 会主动缓存内容，以减少网络请求和资源使用量。WRS 可能会忽略缓存标头。这可能会导致 WRS 使用过时的 JavaScript 或 CSS 资源。为了避免这个问题，您可以创建内容指纹，使其成为文件名的一部分（如 `main.2bb85551.js`）。 指纹取决于文件的内容，因此每次更新都会生成不同的文件名。如需了解详情，请参阅 [web.dev 长效缓存策略指南](https://web.dev/articles/http-cache?hl=zh-cn#versioned-urls)。
7. **确保您的应用针对其所需的所有关键 API 使用[功能检测](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection)，并在适用情况下提供后备行为或 polyfill。**
某些网页功能可能不会被所有用户代理采用，而一些用户代理可能会刻意停用特定功能。例如，如果您在浏览器中使用 WebGL 渲染照片效果，功能检测会显示 Googlebot 不支持 WebGL。若要修复此问题，您可以跳过照片效果渲染步骤或使用服务器端渲染来预渲染照片效果，这样一来，所有用户（包括 Googlebot）都可访问您的内容。
8. **确保您的内容适用于 HTTP 连接。**
Googlebot 会使用 HTTP 请求从您的服务器检索内容。它不支持其他类型的连接，例如 `[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)` 或 `[WebRTC](https://developer.mozilla.org/en-US/docs/Glossary/WebRTC)` 连接。为避免此类连接出现问题，请务必提供用于检索内容的 HTTP 回退机制，并使用强大的错误处理和[功能检测](#feature-detection)机制。
9. **确保网络组件能按预期呈现。** 使用[富媒体搜索结果测试](https://search.google.com/test/rich-results?hl=zh-cn)或[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)检查渲染的 HTML 是否包含您期望的所有内容。
 WRS 会扁平化 [light DOM 和 shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=zh-cn#lightdom)。如果您使用的网络组件没有针对 light DOM 内容使用 [`<slot>` 机制](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=zh-cn#slots)，请参阅相应网络组件的文档以了解详情，或使用其他网络组件。如需了解详情，请参阅[网络组件最佳做法](https://developers.google.com/search/docs/guides/javascript-seo-basics?hl=zh-cn#web-components)。
10. **如果您使用的是基于 JavaScript 的付费墙，请考虑实现方式。**
 某些 JavaScript 付费墙解决方案会在服务器响应中包含完整内容，然后使用 JavaScript 将其隐藏，直到订阅状态得到确认。这种方式无法可靠地限制对内容的访问权限。确保只有在确认订阅状态后，付费墙才会提供完整内容。
11. **修正此核对清单中的内容后**，请再次使用 Search Console 中的[富媒体搜索结果测试](https://search.google.com/test/rich-results?hl=zh-cn)或[网址检查工具](https://search.google.com/search-console?hl=zh-cn)测试您的网页。
如果问题已解决，系统会显示一个绿色对勾标记，并且不会显示任何错误。如果您仍看到错误，请在 [Google 搜索中心帮助社区](https://support.google.com/webmasters/community?hl=zh-cn)中发帖咨询。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
