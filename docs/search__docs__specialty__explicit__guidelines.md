---
title: "包含露骨内容的网站的指南"
source: https://developers.google.com/search/docs/specialty/explicit/guidelines?hl=zh_CN
slug: search__docs__specialty__explicit__guidelines
path: /search/docs/specialty/explicit/guidelines
---

# 包含露骨内容的网站的指南

> 来源: https://developers.google.com/search/docs/specialty/explicit/guidelines?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 包含露骨内容的网站的指南

 很多用户都不希望他们的搜索结果中包含露骨内容，而 Google 已建立系统来帮助用户滤除露骨内容。如果您的网站包含露骨或成人内容，您可以协助 Google 更好地了解网站和内容的性质，这有助于 Google 更准确地对您的网站进行分类，并确保用户在露骨内容方面的偏好得到尊重。

 **您的网站是否被错误标记为包含露骨内容**？请参阅我们的[问题排查指南](https://developers.google.com/search/docs/specialty/explicit/troubleshooting?hl=zh-cn)，详细了解如何确认您的网站是否被错误归类以及如何解决此问题。

## Google 如何处理搜索结果中的露骨内容

 Google 会使用多种系统来保护用户，避免他们意外看到含有露骨内容的搜索结果。我们的算法会检测用户意图并相应地对搜索结果进行排名，同时权衡结果质量以及含有露骨内容的搜索结果与用户查询的相关性。借助安全搜索功能，我们可以帮助用户滤除露骨内容。

### 安全搜索功能的运作方式

 安全搜索功能旨在滤除下列影像类搜索结果：

- 任何类型的露骨色情内容，包括色情作品
- 裸露内容
- 逼真的情趣玩具
- 以性为目的的约会或陪侍服务
- 暴力或血腥内容
- 指向包含露骨内容的网页的链接

 例如，安全搜索功能可以滤除包含裸露的胸部或生殖器图片或视频的网页，以及滤除包含显示或指向露骨内容的链接、弹出式窗口或广告的网页。此外，该功能的目标还包括允许显示具有教育、纪实、科普或艺术 (EDSA) 价值的露骨内容。安全搜索依赖于自动化系统，这些系统利用机器学习和各种信号来识别露骨内容，包括托管网页上和链接中的文字、图片和视频。

 即使安全搜索功能处于关闭状态或设置为模糊处理，Google 的排名和语言理解系统也会发挥作用，防止用户不小心看到露骨色情内容和血腥暴力画面。Google 搜索会使用查询理解算法来检测搜索内容是否有意寻找露骨内容，从而帮助减少用户遇到不必要的露骨搜索结果的几率。

 无论您的安全搜索设置如何，Google 都会移除违反我们[内容政策](https://support.google.com/websearch/answer/10622781?hl=zh-cn)（例如儿童性虐待内容）的网页。此外，我们还会在用户要求[移除个人信息](https://support.google.com/websearch/troubleshooter/3111061?hl=zh-cn)（例如涉及[未经当事人同意而制作或分享的露骨个人图像](https://support.google.com/websearch/answer/6302812?hl=zh-cn)或[未经当事人同意而发布的露骨虚假内容](https://support.google.com/websearch/answer/9116649?hl=zh-cn)）时移除相应网页。

### Google 如何处理大量违规露骨色情内容移除要求所针对的网站

 如果我们处理了涉及特定网站的大量有效移除要求，便会将其作为衡量因素来改进我们的搜索结果。具体而言，关于露骨色情内容：

- **移除儿童性虐待内容 (CSAM)**：我们一经发现即会移除 CSAM 内容，无论是自动移除还是通过法律移除流程移除。如果某个网站包含大量 CSAM 内容，我们还会对该网站的所有内容执行降位操作。
- **移除露骨个人信息**：如果针对特定网站收到大量[未经当事人同意而制作或分享的露骨个人图像](https://support.google.com/websearch/answer/6302812?hl=zh-cn)或[未经当事人同意而发布的露骨虚假内容](https://support.google.com/websearch/answer/9116649?hl=zh-cn)的移除要求，我们会降低该网站中所有网页在搜索结果中的排名。

 如需详细了解我们的排名系统，请参阅我们的[基于移除操作的降位系统](https://developers.google.com/search/docs/appearance/ranking-systems-guide?hl=zh-cn#removals)和[网络垃圾政策](https://developers.google.com/search/docs/essentials/spam-policies?hl=zh-cn#other-behaviors-that-can-lead-to-demotion-or-removal)。

## 最佳做法

 遵循这些最佳做法，不仅有助于确保用户看到他们预期的结果，并为所有人营造更安全的在线环境，还能确保您的目标受众群体能够通过 Google 搜索找到您的内容。

1. [防止您的平台上出现用户生成的有害内容](#prevent-user-generated-harmful-content)。
2. [使 Google 能够抓取您的视频内容文件](#allow-google-to-fetch)。
3. [允许 Googlebot 在抓取内容时不触发年龄限制](#allow-googlebot-to-crawl)
4. [将包含露骨内容的网页归入单独的网域或子网域](#group-explicit-pages)。
5. [使用元数据将特定网页标记为露骨网页](#mark-specific-pages)。
6. [对于电商网站：在电子商务 Feed 或标记中为成人商品添加标签](#label-adult-products)。

### 防止您的平台上出现用户生成的有害内容

 为营造更安全的在线环境，我们建议包含露骨色情内容的平台实施发布者验证和内容审核流程。采用这些措施是最佳做法，有助于负责任地管理内容并降低与潜在有害或非法内容（例如 CSAM 和未经当事人同意的露骨内容）相关的风险。

#### 在用户生成的内容中实施主动式 CSAM 检测

 为了防止传播儿童性虐待内容，我们建议平台使用业界标准技术，例如用哈希匹配检测已知违规内容，以及用分类器检测新内容。通过主动识别并标记可能违反政策的内容，您可以显著提高平台的安全性，并为打击儿童剥削的更广泛工作做出贡献。

 详细了解我们的内容安全工具和 [Google 对打击儿童性虐待和剥削的承诺](https://protectingchildren.google/?hl=zh-cn)。

### 使 Google 能够提取您的视频内容文件

 允许 Googlebot [抓取视频文件](https://developers.google.com/search/docs/appearance/video?hl=zh-cn#allow-fetch)可让 Google 了解视频内容，并降低用户接触到违规露骨内容（例如 CSAM 和未经同意的露骨内容）的几率。

 如果您不允许 Google 抓取视频内容文件，Google 就无法针对[严重违规行为（例如 CSAM 内容）](https://support.google.com/websearch/answer/10622781?hl=zh-cn#zippy=,child-sexual-abuse-imagery-or-exploitation-material)启用自动保护措施。 无法抓取的内容可能会对我们的用户构成风险，因此如果嵌入的视频内容无法抓取，并且我们的自动化系统确定相应网页可能包含露骨内容，Google 可能会将此类网页降位或滤除掉。不允许 Googlebot 抓取您的视频文件可能会显著影响您的露骨内容网页在 Google 搜索中的排名，尤其是在视频模式下。

 如果您担心视频文件的公开范围过大，还可以验证 Googlebot 对服务器的请求[是否确实来自 Google](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn)。

### 允许 Googlebot 在抓取内容时不触发年龄限制

 如果您的内容设有年龄限制或其他访问权限限制，请务必允许 Googlebot 在不触发年龄限制的情况下抓取您的内容。为此，您可以[验证 Googlebot 请求](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn)，并提供无年龄限制的内容。

 如果您不允许 Googlebot 在未触发年龄限制机制的情况下抓取内容，可能会导致您的网站在 Google 搜索中的排名较低。Google 可能无法抓取您的内容（包括图片或视频字节），因此无法针对相关查询有效地对该网页进行排名。此外，如果年龄限制机制屏蔽了一些非露骨内容，而 Googlebot 无法看到这些内容，那么这些内容甚至整个网站都有可能被自动归类为露骨内容，这会导致在安全搜索过滤功能开启的情况下，这些内容无法显示。

### 将包含露骨内容的网页归入单独的网域或子网域

 如果您的网站包含大量露骨内容和非露骨内容，我们建议您将露骨内容网页与非露骨内容网页放入不同的网域或子网域中。例如，您可以在 `https://explicit.example.com/...` 上托管露骨内容网页，并在 `https://www.example.com/...` 上托管非露骨内容网页。

如果您没有分别将网页分组，那么即使有些网页可能不含有露骨内容，我们的系统也可能会确定您的整个网站貌似为露骨性质，并会在安全搜索过滤器启用的情况下滤除整个网站。

无需在网域中使用“露骨”一词。唯一重要的是，将这类网页归为一组，放在另一个网域或子网域中，并将其与不含露骨内容的网页分开。

### 使用元数据将特定网页标记为露骨网页

 Google 算法可自动检测露骨网页，包括文本、图片和视频。 虽然不是必要做法，但如果您想标记网站上的某些露骨网页，或者想确保为安全搜索用户过滤特定网页，则可以通过添加元数据来实现：

- [向含有露骨内容的网页添加元数据](#add-metadata)。
- [在视频站点地图中使用 `<video:family_friendly>` 标记](#use-video-family-friendly-tag)。

#### 向含有露骨色情内容的网页添加元数据

 如需将特定网页标记为露骨，请添加[分级标记](https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=zh-cn#rating)，并将 `adult` 值用作 [`meta` 标记](https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=zh-cn#rating)或 HTTP 响应标头。 建议您将此标记添加到任何包含露骨色情内容的网页上。

```
<meta name="rating" content="adult">
```

Google 同样会通过 `<meta name="rating" content="RTA-5042-1996-1400-1577-RTA">` 识别包含露骨色情内容的网页。使用其中任一标记均可；无需同时添加这两个标记。

如果您使用 Wix、WordPress 或 Blogger 等 CMS，则可能无法直接修改 HTML，也可能不希望修改 HTML。实际上，您的 CMS 可能具有搜索引擎设置页面或其他某种机制，能够将 `meta` 标记告知搜索引擎。 如果您要向网站添加 `meta` 标记，请在您的 CMS 上搜索有关修改网页 `<head>` 的说明（例如，搜索“wix add tags”）。

#### 在视频站点地图中使用 `<video:family_friendly>` 标记

 如果您的网站上有各种各样的视频，包括适合所有年龄段的内容以及露骨色情内容或血腥暴力内容，请在视频站点地图中使用 [`<video:family_friendly>`](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=zh-cn#family-friendly) 标记。您只需针对露骨视频使用此标记（设置为 `no`）。这有助于 Google 了解在启用安全搜索过滤功能时，您网站上的哪些视频不应显示。

### 对于 Google 购物功能：在电子商务 Feed 或标记中为成人商品添加标签

 如果您正在优化商品详情，以便在 Google 购物功能中展示，并且根据 Google 的[成人内容政策](https://support.google.com/merchants/answer/12073010?hl=zh-cn#res)，您的商品被归类为成人用品，请在 Merchant Center Feed 中使用 [`adult` 属性](https://support.google.com/merchants/answer/6324508?hl=zh-cn)或 [`hasAdultConsideration`](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing?hl=zh-cn#hasAdultConsideration) 结构化数据标记为这些商品添加标签。此标签不会影响您的网站在自然网页搜索结果中的曝光度。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-09-23。
