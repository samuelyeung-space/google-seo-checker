---
title: "避免使用干扰性插页式广告和对话框"
source: https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials?hl=zh_CN
slug: search__docs__appearance__avoid-intrusive-interstitials
path: /search/docs/appearance/avoid-intrusive-interstitials
---

# 避免使用干扰性插页式广告和对话框

> 来源: https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 避免使用干扰性插页式广告和对话框

 干扰性[插页式广告](https://en.wikipedia.org/wiki/Interstitial_webpage)和对话框是会妨碍用户查看内容的网页元素，通常用于宣传目的。插页式广告会覆盖整个页面，对话框只会覆盖页面的某一部分，它们有时也会遮住位于下层的内容。

 网站通常会出于各种原因而需要显示对话框；但是，因显示干扰性插页式广告而干扰到用户可能会给用户造成困扰，并降低他们对网站的信任。

 干扰性对话框和插页式广告会导致 Google 及其他搜索引擎难以理解您的内容，进而可能导致搜索效果不佳。同样，如果用户发现您的网站难以使用，他们也不太可能想要再次访问这些网站（包括通过搜索引擎访问）。

## 创建无干扰对话框

 创建无干扰对话框意味着用户可以访问您的内容，而不会被对话框打断。这适用于各种宣传对话框，包括应用安装提示。遵循这些最佳实践不仅有助于 Google 搜索了解您网站的内容和结构，还有助于用户在您的网站上获得良好的体验。

### 使用横幅广告代替插页式广告

 弃用全页插页式广告，改用仅占据一小部分屏幕画面的横幅广告来吸引用户的注意力。横幅广告可确保用户和搜索引擎在转到相应网页后能立即定位到所需内容。

 横幅广告可以通过多种方式实现。例如，对于应用安装横幅广告，您可以使用浏览器支持的横幅广告，如针对 Safari 投放[智能应用横幅广告](https://developer.apple.com/library/ios/#documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html)，或针对 Chrome 推广[应用内安装体验](https://developers.google.com/web/fundamentals/app-install-banners/native?hl=zh-cn)。另一种方法是创建 HTML 横幅广告（与典型的小型广告类似），它会链接到正确的应用商店供用户下载。您可以将这些小型容器重复用于其他类型的通知，例如简报注册提示。

### 使用通用库

 许多 CMS 都有针对最常见的用例（例如简报注册提示）创建标准对话框和插页式广告的插件。例如，如果您使用的是 WordPress，请搜索“简报注册 WordPress”。通常，这类插件对 Google、其他搜索引擎以及互联网大有裨益，因为开发者可以利用这类插件大规模部署改进功能。

### 避免常见错误

 除非法律强制要求，否则在设计对话框或插页式广告以帮助 Google 搜索抓取和理解您的内容时，请避免出现以下常见错误：

- 请勿使用插页式广告遮住整个网页。
- 请勿将用户重定向到单独的页面来征求用户同意或要求用户输入内容。

## 强制性插页式广告

 某些网站必须展示插页式广告，这是由其发布的内容类型所决定的。例如，赌场网站可能需要显示年龄限制，这种插页式广告要求用户必须先提供年龄信息，然后才能访问网站内容。

 强制性插页式广告无需遵循本文档中所述的指南；不过，我们建议网站尽可能遵循以下最佳实践：

-  确保内容与插页式广告重叠。这样可以确保 Google 至少仍可以将部分内容编入索引，并有可能将其显示在搜索结果中。
-  请勿将传入的 HTTP 请求重定向到另一个页面来征求用户同意或要求用户提供数据。将所有网址重定向至单个网页后，系统只会在搜索结果中保留这一个网页，并移除所有其他网页，因为 Googlebot 只能抓取该网页。

 对于面向成人用户且设有强制年龄限制的内容，我们建议允许 Googlebot 在不触发年龄限制的情况下抓取您的内容。为此，您可以[验证 Googlebot 请求](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn)，并提供无年龄限制的内容。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
