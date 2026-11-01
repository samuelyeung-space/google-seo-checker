---
title: "Google 搜索排名系统指南"
source: https://developers.google.com/search/docs/appearance/ranking-systems-guide?hl=zh_CN
slug: search__docs__appearance__ranking-systems-guide
path: /search/docs/appearance/ranking-systems-guide
---

# Google 搜索排名系统指南

> 来源: https://developers.google.com/search/docs/appearance/ranking-systems-guide?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# Google 搜索排名系统指南

 Google 使用的自动化排名系统会查看 Google 搜索索引中的数千亿网页和其他内容，[考虑许多相关因素和信号](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/?hl=zh-cn)，从而显示最相关的实用结果，而且一切都在转瞬之间完成。 本页将介绍我们的一些更加知名的排名系统。这涵盖我们的核心排名系统中的一些系统，这些系统是针对查询生成搜索结果的基础技术。此外，还涵盖了涉及特定排名需求的一些系统。

 我们的排名系统旨在网页级运行，它会使用各种信号和系统了解如何对各个网页进行排名。我们还会使用网站级信号和分类器，以便更好地了解网页。拥有一些良好的网站级信号并不意味着网站上的所有内容都会始终获得较高的排名，就像拥有一些不良的网站级信号并不意味着网站上的所有内容都会获得较低的排名一样。

 我们会定期通过[严格的测试和评估](https://www.google.com/search/howsearchworks/how-search-works/rigorous-testing/?hl=zh-cn)改进排名系统，并在[排名系统更新](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history?hl=zh-cn)时发出通知（如果这些更新可能会对内容创作者和其他用户有用）。

 您还可以访问我们的[“Google 搜索的运作方式”网站](https://www.google.com/search/howsearchworks/?hl=zh-cn)，了解我们的[排名系统](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/?hl=zh-cn)如何与其他流程协同运作，让 Google 搜索能够实现我们的使命，即整合全球信息供大众使用，使人人受益。

## BERT

 基于 Transformer 的双向编码器表示法 ([BERT](https://blog.google/products/search/how-ai-powers-great-search-results/?hl=zh-cn)) 是 Google 使用的 AI 系统，可让我们了解字词的不同组合如何表达出不同的含义和意图。

## 灾难信息系统

 Google 开发了多个系统，以便在发生灾难时（无论是个人危机情况、自然灾害还是其他大范围扩散的灾难情况）提供及时且实用的信息：

- **个人危机：**我们的系统会努力了解人们何时在寻求个人危机情况的相关信息，以便针对有关自杀、性侵、中毒、性别暴力、毒瘾等的特定查询显示受信任组织的热线和内容。详细了解[个人危机信息在 Google 搜索中如何显示](https://support.google.com/websearch/answer/9988513?hl=zh-cn)。
- **SOS 警报：**在自然灾害或大范围扩散的灾难发生期间，我们的 SOS 警报系统会尝试显示当地、全国或国际机构发布的最新资讯。这些资讯可能包括紧急电话号码和网站、地图、实用短语的翻译、捐赠机会等。详细了解 [SOS 警报的工作原理](https://support.google.com/sosalerts/?hl=zh-cn)，以及它们如何被纳入 Google 的[灾害警报](https://crisisresponse.google/forecasting-and-alerts/?hl=zh-cn)系统来帮助应对洪水、野火、地震、飓风和其他灾害。

## 重复信息删除系统

 在 Google 上搜索时，您可能会看到数千个甚至数百万个匹配的网页。其中某些网页可能彼此非常相似。在这种情况下，我们的系统会仅显示最相关的结果，以避免无益的重复信息。详细了解[重复信息删除系统的运作方式以及如何查看被省略的结果](https://support.google.com/websearch/answer/9603785?hl=zh-cn)（在重复信息被删除后，如有需要的话）。

 我们在删除重复信息时也会考虑[精选摘要](https://support.google.com/websearch/answer/9351707?hl=zh-cn)。 即使一项网页详情被提升为精选摘要，我们也不会在搜索结果的第一页上重复显示这项详情。这种做法不仅将结果去芜存菁，也让用户更容易找到相关信息。

## 完全匹配网域系统

 我们的排名系统会将域名中的字词视为判断内容是否与搜索相关的众多因素之一。不过，有些网域旨在与特定查询完全匹配，因此我们的完全匹配网域系统不会将这类网域下托管的内容看得过于重要。例如，用户可能会创建一个包含“best-places-to-eat-lunch”字样的域名，希望该域名中的所有这些字词都能提升内容的排名。我们的系统会做出相应调整。

## 更新系统

 我们有各种确保查询时效性的系统，旨在按照用户的预期针对查询显示时效上较新的内容。例如，如果有人搜索的是刚上映的电影，他们可能想要的是最新影评，而不是自影片制作开始以来的旧报道。再举一个例子，一般情况下，搜索“地震”可能会返回有关地震准备和资源的内容。不过，如果近期发生了地震，那么可能会出现新闻报道和较新的内容。

## 链接分析系统和 PageRank

 我们拥有多种系统，能够了解网页之间的链接方式，从而判断网页内容是什么，并找出对查询而言最实用的回应。PageRank 就是其中之一，它是 Google 首次发布时采用的核心排名系统。如果对此感兴趣，可以参阅原始的 [PageRank 研究论文](http://infolab.stanford.edu/~backrub/google.html)和[专利](https://patents.google.com/patent/US6285999?hl=zh-cn)来了解详情。自此之后，PageRank 的运作方式发生了很大变化，并一直是我们核心排名系统的一部分。

## 本地新闻系统

 我们有相应的系统，负责识别和适时展示相关的当地新闻媒体，[例如通过](https://blog.google/products/news/local-news-update-census-mapper/?hl=zh-cn)我们的“焦点新闻”和“本地新闻”功能。

## MUM

 多任务统一模型 ([MUM](https://blog.google/products/search/how-ai-powers-great-search-results/?hl=zh-cn)) 是一种能够理解和生成语言的 AI 系统。它目前不用于在 Google 搜索中实现一般排名，而是用于某些特定用途，例如用于[改进对新型冠状病毒感染 (COVID-19) 疫苗信息的搜索](https://blog.google/products/search/how-mum-improved-google-searches-vaccine-information/?hl=zh-cn)和[改进系统显示的精选摘要标注](https://blog.google/products/search/information-literacy/?hl=zh-cn)。

## 神经匹配

 [神经匹配](https://blog.google/products/search/how-ai-powers-great-search-results/?hl=zh-cn)是一种 AI 系统，Google 使用它来理解查询和网页中概念的表示形式，并将它们相互匹配。

## 原创内容系统

 我们有相应系统来帮助确保在搜索结果中以醒目方式展示原创内容（[包括原创报道](https://blog.google/products/search/original-reporting/?hl=zh-cn)），并将它们排在引用内容前面。这包括对特殊[规范标记](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)的支持，如果网页在多个位置存在重复版本，创作者可以使用该标记来帮助我们更好地了解哪个是主要网页。

## 基于移除的降位系统

 Google 的政策允许移除某些类型的内容。如果我们处理了涉及特定网站的大量此类移除要求，便将以此作为衡量因素来改进我们的搜索结果。尤其要注意：

-  **依法移除：** 如果收到大量涉及特定网站的[有效版权内容移除要求](https://support.google.com/transparencyreport/answer/7347743?hl=zh-cn)，[我们会据此](https://search.googleblog.com/2012/08/an-update-to-our-search-algorithms.html)降低该网站中其他内容在搜索结果中的排名。这样，如果存在其他侵权内容，用户更可能看到原创内容，而非相应侵权内容。对于涉及诽谤、仿冒商品和法院命令移除的投诉，我们会采用类似的降位衡量因素。对于儿童性虐待内容 (CSAM)，我们一经发现即会将其移除，并会降低儿童性虐待内容 (CSAM) 占比非常高的网站中所有内容的排名。
-  **移除个人信息：** 如果我们处理的大量个人信息移除要求涉及某个采用[有偿移除做法](https://support.google.com/websearch/answer/9172218?hl=zh-cn)的网站，我们会降低该网站中其他内容在搜索结果中的排名。[我们也会设法了解](https://blog.google/products/search/improving-search-better-protect-people-harassment/?hl=zh-cn)其他网站是否存在同类行为；如果有，则对此类网站上的内容采取降位措施。对于收到大量涉及[人肉搜索内容](https://support.google.com/websearch/answer/9673730?hl=zh-cn)、[未经当事人同意而制作或分享的露骨个人图像](https://support.google.com/websearch/answer/6302812?hl=zh-cn)或[未经当事人同意而发布的露骨虚假内容](https://support.google.com/websearch/answer/9116649?hl=zh-cn)的移除要求的网站，我们可能会采取类似的降位做法。

## 段落排名系统

 [段落排名](https://www.blog.google/products/search/search-on/?hl=zh-cn)是一个 AI 系统，用于识别网页的各个部分或“段落”，以便更好地了解网页与搜索内容的相关程度。

## RankBrain

 [RankBrain](https://blog.google/products/search/how-ai-powers-great-search-results/?hl=zh-cn) 是一个 AI 系统，可帮助我们了解字词与概念之间的关系。这意味着，即使内容不含搜索中使用的所有确切字词，系统也能通过了解内容与其他字词和概念相关，从而返回相关的内容。

## 可靠信息系统

 多个系统以各种方式显示尽可能最可靠的信息，例如[帮助呈现更权威的网页和降低劣质内容的排名](https://blog.google/products/search/our-latest-quality-improvements-search/?hl=zh-cn)，以及[提升优质新闻的排名](https://blog.google/outreach-initiatives/google-news-initiative/elevating-quality-journalism/?hl=zh-cn)。如果可能缺乏可靠的信息，或者我们的系统对搜索结果的总体质量不太有信心，我们的系统会针对瞬息万变的主题自动显示[内容警示](https://blog.google/products/search/information-literacy/?hl=zh-cn)。这些内容警示会提示您如何找到可能更实用的搜索结果。详细了解我们[在 Google 搜索中提供优质信息的方法](https://blog.google/products/search/how-google-delivers-reliable-information-search/?hl=zh-cn)。

## 评价系统

 [评价系统](https://developers.google.com/search/updates/reviews-update?hl=zh-cn)旨在更好地奖励优质评价，其内容包含见解深刻的分析和原创研究，并且由熟知相应主题的专家或爱好者撰写。

## 网站多元化系统

 借助网站多元化系统，我们一般不会在排名靠前的搜索结果中显示来自同一网站的两个以上的网页详情，这样就不会有单个网站“霸占”热门搜索结果。不过，要是系统判定某个网站与特定搜索的相关性特别高，我们仍会显示来自该网站两条以上的网页详情。网站多元化系统通常将子网域视为根网域的一部分。IE：系统会将来自子网域 (subdomain.example.com) 和根网域 (example.com) 的网页详情都视为来自同一个网站。不过，如果系统认为有必要，也会基于多元化目的，将子网域视为单独的网站。

## 网络垃圾检测系统

 没有人希望电子邮件收件箱充满垃圾邮件，因此垃圾邮件过滤器非常有用。 Google 搜索面临着类似的挑战，因为互联网包含大量网络垃圾，如果不加以处理，系统将无法显示最有帮助且最相关的结果。我们采用了一系列的[网络垃圾检测系统](https://www.google.com/search/howsearchworks/how-search-works/detecting-spam/?hl=zh-cn)（包括 [SpamBrain](https://developers.google.com/search/blog/2022/04/webspam-report-2021?hl=zh-cn)）来处理违反[网络垃圾政策](https://developers.google.com/search/docs/essentials/spam-policies?hl=zh-cn)的内容和行为。这些系统会不断[更新](https://developers.google.com/search/updates/spam-updates?hl=zh-cn)，以便及时掌握网络垃圾威胁的最新演变方式。

## 已经弃用的系统

 下文所述的系统主要用于历史参考用途。它们已被并入后续系统，或已成为我们核心排名系统的一部分。

### 实用内容系统

 [于 2022 年宣布推出](https://developers.google.com/search/blog/2022/08/helpful-content-update?hl=zh-cn)的“实用内容更新”是一个系统，旨在更好地确保用户在搜索结果中看到由用户撰写、面向用户的原创实用内容，而非主要用于获取搜索引擎流量的内容。2024 年 3 月，该系统经过演变，[成为了](https://developers.google.com/search/blog/2024/03/core-update-spam-policies?hl=zh-cn)我们的核心排名系统的一部分，因为我们的系统会使用各种信号和系统向用户显示实用的搜索结果。

### 蜂鸟系统

 这是我们在 2013 年 8 月对整体排名系统进行的一项重大改进。此后，我们的排名系统一直在不断发展，就像这之前排名系统的持续发展一样。

### 熊猫系统

 该系统旨在更好地确保在 Google 搜索结果中呈现优质的原创内容。[我们于 2011 年宣布推出](https://googleblog.blogspot.com/2011/02/finding-more-high-quality-sites-in.html)这个昵称为“熊猫”的系统，该系统经过不断发展，于 2015 年成为我们核心排名系统的一部分。

### 企鹅系统

 这是一个旨在防范垃圾链接的系统。[我们于 2012 年宣布推出](https://developers.google.com/search/blog/2012/04/another-step-to-reward-high-quality?hl=zh-cn)这个昵称为“企鹅更新”的系统，并在 2016 年将其[整合](https://developers.google.com/search/blog/2016/09/penguin-is-now-part-of-our-core?hl=zh-cn)到我们的核心排名系统中。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
