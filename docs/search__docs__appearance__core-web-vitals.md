---
title: "了解核心 Web 指标和 Google 搜索结果"
source: https://developers.google.com/search/docs/appearance/core-web-vitals?hl=zh_CN
slug: search__docs__appearance__core-web-vitals
path: /search/docs/appearance/core-web-vitals
---

# 了解核心 Web 指标和 Google 搜索结果

> 来源: https://developers.google.com/search/docs/appearance/core-web-vitals?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 了解核心 Web 指标和 Google 搜索结果

 [核心 Web 指标](https://web.dev/articles/vitals?hl=zh-cn#core-web-vitals)是一组指标，用于衡量网页的加载性能、互动性和视觉稳定性的实际体验。我们强烈建议网站所有者实现良好的核心 Web 指标，以便借助 Google 搜索取得理想成效，并确保用户在总体上获得良好的体验。这一方面连同其他网页体验方面，都与我们的核心排名系统所要奖励的内容相契合。如需了解详情，请参阅[了解 Google 搜索结果中的网页体验](https://developers.google.com/search/docs/appearance/page-experience?hl=zh-cn)。

##  核心 Web 指标

- [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp?hl=zh-cn)：衡量加载性能。为了提供良好的用户体验，请尽力[在网页开始加载的 2.5 秒内完成 LCP](https://web.dev/articles/lcp?hl=zh-cn#what-is-a-good-lcp-score)。
- [Interaction To Next Paint (INP)](https://web.dev/articles/inp?hl=zh-cn)：衡量响应速度。为了提供良好的用户体验，请尽力[将 INP 控制在 200 毫秒以内](https://web.dev/articles/inp?hl=zh-cn#good-score)。
- [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls?hl=zh-cn)：衡量视觉稳定性。为了提供良好的用户体验，请尽力[使 CLS 得分低于 0.1](https://web.dev/articles/cls?hl=zh-cn#what-is-a-good-cls-score)。

##  优化核心 Web 指标

 以下资源可以帮助您衡量、监控和优化核心 Web 指标：

- 查看 [Search Console 中的核心 Web 指标报告](https://support.google.com/webmasters/answer/9205520?hl=zh-cn)。该报告显示了您的网页性能。
- 详细了解[核心 Web 指标](https://web.dev/articles/learn-core-web-vitals?hl=zh-cn)，这是有关核心 Web 指标的指南，包括如何衡量、调试、改进和最佳实践。
- 了解有助于您[衡量和报告核心 Web 指标](https://web.dev/articles/vitals-tools?hl=zh-cn)的各种工具。这些工具可衡量 LCP、INP 和 CLS。

##  近期博客更新

 下面列出了我们在 [Google 搜索中心博客](https://developers.google.com/search/blog?hl=zh-cn)上公布的所有 Core Web Vitals 内容：

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
