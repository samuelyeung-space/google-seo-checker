---
title: "Googlebot"
source: https://developers.google.com/search/docs/crawling-indexing/googlebot?hl=zh_CN
slug: search__docs__crawling-indexing__googlebot
path: /search/docs/crawling-indexing/googlebot
---

# Googlebot

> 来源: https://developers.google.com/search/docs/crawling-indexing/googlebot?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# Googlebot

 Googlebot 是 Google 搜索使用的两种[网页抓取工具](https://developers.google.com/search/docs/fundamentals/how-search-works?hl=zh-cn)的通用名称：

-  [**Googlebot 智能手机版**](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers?hl=zh-cn#googlebot-smartphone)：模拟移动设备用户的移动版抓取工具。
-  [**Googlebot 桌面版**](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers?hl=zh-cn#googlebot-desktop)：模拟桌面设备用户的桌面版抓取工具。

您可以通过查看请求中的 [HTTP `user-agent` 请求标头](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=zh-cn)来确定 Googlebot 的子类型。不过，这两类抓取工具都遵循 robots.txt 中的同一产品令牌（用户代理令牌），因此您无法通过使用 robots.txt 有选择地指定 Googlebot 智能手机版或 Googlebot 桌面版。

 对于大多数网站中的内容，Google 主要[将移动版编入索引](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing?hl=zh-cn)。因此，多数 Googlebot 抓取请求都会通过移动版抓取工具发出，少数请求会通过桌面版抓取工具发出。

## Googlebot 如何访问您的网站

 对于大多数网站，Googlebot 的平均访问频率不会高于几秒钟一次。不过，由于存在延迟，在一小段时间内，此频率可能会略高一些。 如果您的网站跟不上 Google 的抓取请求频率，您可以[减慢抓取速度](https://developers.google.com/search/docs/crawling-indexing/reduce-crawl-rate?hl=zh-cn)。

 在为 Google 搜索进行抓取时，Googlebot 会抓取[受支持的文件类型](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types?hl=zh-cn)中的前 2MB 内容，以及 PDF 文件中的前 64MB 内容。从渲染的角度来看，HTML 中引用的每个资源（例如 CSS 和 JavaScript）都是独立抓取的，并且每次资源抓取都受到与其他文件（PDF 文件除外）相同的严格文件大小限制。
 达到上限后，Googlebot 会停止抓取，并且只发送已下载的文件部分以供编入索引。文件大小上限适用于未压缩的数据。其他 Google 抓取工具（例如 Googlebot Video 和 Googlebot Image）可能有[不同的限制](https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers?hl=zh-cn#file-size-limits)。

 从美国的 IP 地址抓取内容时，Googlebot 的时区为[太平洋时间](https://g.co/kgs/WSf8oR)。

 [Googlebot 的其他技术属性](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=zh-cn#crawl-technical-props)在 Google 抓取工具概览中有所介绍。

## 禁止 Googlebot 访问您的网站

 Googlebot 主要通过之前已抓取的网页中嵌入的链接来发现要抓取的新网址。 对于网站，要想通过不发布指向它的链接来达到保密目的几乎是不可能的。例如，只要有人通过点击您的“私密”网站上的链接访问了另一网站，您的“私密”网址就可能会出现在引荐来源网址标记中，并可能会被所访问的网站存储和发布在其引荐来源网址日志中。

 如果您想阻止 Googlebot 抓取您网站上的内容，可以采用[多种方法](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share?hl=zh-cn)。请注意，抓取和编入索引是有区别的；****禁止 Googlebot 抓取某个网页并不会阻止该网页的网址显示在搜索结果中：

-  **要禁止 Googlebot 抓取网页吗？**请使用 [robots.txt 文件](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=zh-cn)。
-  **不希望 Google 将某个网页编入索引？**请使用 [`noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=zh-cn)。
-  **完全阻止抓取工具或用户访问某个网页？**请使用[其他方法，例如密码保护](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share?hl=zh-cn)。

 屏蔽 Googlebot 会影响 Google 搜索（包括 Google 探索和所有 Google 搜索功能）以及 Google 图片、Google 视频和 Google 新闻等其他产品。

## 验证 Googlebot

 在决定禁止 Googlebot 访问您的内容之前，请注意 Googlebot 所用的 HTTP `user-agent` 请求标头经常会被其他抓取工具假冒。因此，请务必验证有问题的请求是否确实来自 Google。若要验证请求是否确实来自 Googlebot，最佳方法就是对请求的来源 IP 地址[进行 DNS 反向查找](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn#manual)，或将来源 IP 地址与 [Googlebot IP 地址范围](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn#use-automatic-solutions)进行比对。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-02-06。
