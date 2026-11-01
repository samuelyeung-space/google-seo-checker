---
title: "事实核查 (ClaimReview) 结构化数据"
source: https://developers.google.com/search/docs/appearance/structured-data/factcheck?hl=zh_CN
slug: search__docs__appearance__structured-data__factcheck
path: /search/docs/appearance/structured-data/factcheck
---

# 事实核查 (ClaimReview) 结构化数据

> 来源: https://developers.google.com/search/docs/appearance/structured-data/factcheck?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 事实核查 (`ClaimReview`) 结构化数据

 我们将逐步停止在 Google 搜索中支持 `ClaimReview` 标记。不过，事实核查浏览器工具仍支持此标记。

如果您的某个网页会对他人的声明进行审核，您可以在该网页中添加 `ClaimReview` 结构化数据。使用 `ClaimReview` 结构化数据后，当您的网页出现在与该声明相关的 Google 搜索结果中时，系统可以在搜索结果中显示您的事实核查的摘要版本。

本指南详细介绍了实施 `ClaimReview` 结构化数据的方法。 如果您不想手动添加结构化数据，可以考虑使用[事实核查标记工具](https://toolbox.google.com/factcheck/markuptool?hl=zh-cn)。有关详情，请访问[事实核查标记工具简介](https://toolbox.google.com/factcheck/about?hl=zh-cn#fcmt)。

##  如何添加结构化数据

 结构化数据是一种提供网页相关信息并对网页内容进行分类的标准化格式。如果您不熟悉结构化数据，可以详细了解[结构化数据的运作方式](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn)。

 下面概述了如何构建、测试和发布结构化数据。如需获得向网页添加结构化数据的分步指南，请查看[结构化数据 Codelab](https://codelabs.developers.google.com/codelabs/structured-data/index.html?hl=zh-cn)。

1. 添加[必要属性](#structured-data-type-definitions)。根据您使用的格式，了解[在网页上的什么位置插入结构化数据](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn#format-placement)。
 **使用了 CMS？**使用集成到 CMS 中的插件可能更简单。
 **使用了 JavaScript？**了解如何[使用 JavaScript 生成结构化数据](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript?hl=zh-cn)。

2. 遵循[指南](#guidelines)。
3. 使用[富媒体搜索结果测试](https://search.google.com/test/rich-results?hl=zh-cn)验证您的代码，并修复所有严重错误。此外，您还可以考虑修正该工具中可能会标记的任何非严重问题，因为这些这样有助于提升结构化数据的质量（不过，要使内容能够显示为富媒体搜索结果，并非必须这么做）。
4. 部署一些包含您的结构化数据的网页，然后使用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)测试 Google 看到的网页样貌。请确保您的网页可供 Google 访问，不会因 robots.txt 文件、`noindex` 标记或登录要求而被屏蔽。如果网页看起来没有问题，您可以[请求 Google 重新抓取您的网址](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=zh-cn)。
**注意**：Google 重新抓取您的网页并重新将其编入索引需要一段时间，请耐心等待。网页发布后，Google 可能需要几天时间才会找到和抓取该网页。

5. 为了让 Google 随时了解日后发生的更改，我们建议您[提交站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn)。[Search Console Sitemap API](https://developers.google.com/webmaster-tools/v1/sitemaps?hl=zh-cn) 可以帮助您自动执行此操作。

## 示例

假设某个网页对“地球是平的”这项声明进行评估。如果该网页中提供了 `ClaimReview` 元素，那么当用户搜索“地球是平的”时，Google 搜索结果可能会如下所示（请注意，实际的视觉设计可能会有所不同）：

 **注意**：在 Google 搜索结果中的实际显示效果可能会有不同。您可以使用[富媒体搜索结果测试](https://support.google.com/webmasters/answer/7445569?hl=zh-cn)来预览大多数功能。

下面是一个在托管此项事实核查的网页中出现的结构化数据示例：

 <html> <head> <title>The world is flat</title> <script type="application/ld+json"> { "@context": "https://schema.org", "@type": "ClaimReview", "url": "https://example.com/news/science/worldisflat.html", "claimReviewed": "The world is flat", "itemReviewed": { "@type": "Claim", "author": { "@type": "Organization", "name": "Square World Society", "sameAs": "https://example.flatworlders.com/we-know-that-the-world-is-flat" }, "datePublished": "2024-06-20", "appearance": { "@type": "OpinionNewsArticle", "url": "https://example.com/news/a122121", "headline": "Square Earth - Flat earthers for the Internet age", "datePublished": "2024-06-22", "author": { "@type": "Person", "name": "T. Tellar" }, "image": "https://example.com/photos/1x1/photo.jpg", "publisher": { "@type": "Organization", "name": "Skeptical News", "logo": { "@type": "ImageObject", "url": "https://example.com/logo.jpg" } } } }, "author": { "@type": "Organization", "name": "Example.com science watch" }, "reviewRating": { "@type": "Rating", "ratingValue": 1, "bestRating": 5, "worstRating": 1, "alternateName": "False" } } </script> </head> <body> </body> </html>

```
<html>
  <head>
    <title>The world is flat</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      "url": "https://example.com/news/science/worldisflat.html",
      "claimReviewed": "The world is flat",
      "itemReviewed": {
        "@type": "Claim",
        "author": {
          "@type": "Organization",
          "name": "Square World Society",
          "sameAs": "https://example.flatworlders.com/we-know-that-the-world-is-flat"
        },
        "datePublished": "2024-06-20",
        "appearance": {
          "@type": "OpinionNewsArticle",
          "url": "https://example.com/news/a122121",
          "headline": "Square Earth - Flat earthers for the Internet age",
          "datePublished": "2024-06-22",
          "author": {
            "@type": "Person",
            "name": "T. Tellar"
          },
          "image": "https://example.com/photos/1x1/photo.jpg",
          "publisher": {
            "@type": "Organization",
            "name": "Skeptical News",
            "logo": {
              "@type": "ImageObject",
              "url": "https://example.com/logo.jpg"
            }
          }
        }
      },
      "author": {
        "@type": "Organization",
        "name": "Example.com science watch"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 1,
        "bestRating": 5,
        "worstRating": 1,
        "alternateName": "False"
      }
    }
    </script>
  </head>
  <body>
  </body>
</html>
```

## 资格要求指南

Google 不保证事实核查一定会显示在搜索结果中，即使[富媒体搜索结果测试](https://search.google.com/test/rich-results?hl=zh-cn)显示您的网页已正确地添加标记，也是如此。结构化数据的使用使相应功能可以显示，但并不保证一定会显示。****Google 算法会程序化地判断事实核查富媒体搜索结果是否可以显示，判断依据有多种，包括以下指南。

若要让您的事实核查内容能够在 Google 搜索中显示为事实核查富媒体搜索结果，您必须遵循以下指南：

- 您的网站必须有多个使用 `ClaimReview` 结构化数据标记的网页。
- 您必须遵循所有[结构化数据指南](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn)和[搜索要素](https://developers.google.com/search/docs/essentials?hl=zh-cn)要求。
- 结构化数据和网页内容不得有任何不一致的地方（例如，结构化数据表明声明为真，但网页上的内容却表明声明为假）。请确保内容与结构化数据一致（例如，两者都表明声明为真）。
- 您必须遵循 [Google 新闻政策](https://support.google.com/news/publisher-center/answer/6204050?hl=zh-cn)中针对问责制、透明度、可读性设定的标准，并确保网站中不含虚假陈述内容。
- 您必须制定一项纠正政策，或为用户提供报告错误的机制。
- 政治实体（例如，竞选活动、政党或民选官员）的网站不符合使用此功能的条件。
- 您的读者需可以轻松辨别报道正文中的声明和事实核查内容，并了解哪些内容经过了核查，以及核查后得出的结论。
- 您必须明确指明您所评估的特定声明的来源，可以是其他网站、公开声明、社交媒体或其他可跟踪的来源，但不能是您的网站。
- 事实核查分析必须可追踪并清楚说明资料来源和所用方法，主要资料来源还需注明引用和参考信息。

###  技术指南

- 若要显示为单条事实核查富媒体搜索结果，一个网页必须只包含一个 `ClaimReview` 元素。如果您为一个网页添加多个 `ClaimReview` 元素，那么该网页将无法显示为单条事实核查富媒体搜索结果。
- 托管 `ClaimReview` 元素的网页如果不提供完整的事实核查与评估内容，则必须至少提供简短的摘要。
- 特定 `ClaimReview` 只能存在于您网站上的一个网页中。请不要在多个网页中重复同一事实核查，除非这些网页是同一个网页的变体（例如，您可以在一个网页的移动版和桌面版上发布相同的 `ClaimReview`）。
- 如果您的网站对事实核查报道进行汇总，请确保所有报道都符合[条件](#guidelines)，并且您要提供一个可公开访问的列表，在其中列出您所汇总的事实核查报道的所有来源网站。

## 不同结构化数据类型的定义

以下是实施事实核查所必需的结构化数据类型：

- `[ClaimReview](#claimreview)`
- `[Claim](#claim)`
- `[Rating](#rating)`

若要使您的内容能够显示为富媒体搜索结果，您必须为其添加必要属性。 您还可添加建议属性，以便添加与内容相关的更多信息，进而提供更优质的用户体验。

### `ClaimReview`

如需了解 `ClaimReview` 的完整定义，请访问 [schema.org/ClaimReview](https://schema.org/ClaimReview)。Google 支持的属性如下：

必要属性

`claimReviewed`

`[Text](https://schema.org/Text)`

所评估声明的简短摘要。尽量少于 75 个字符，以便在移动设备上显示时最大限度地减少换行。

请勿在 `claimReviewed` 字段中添加评分。 请在 `reviewRating` 字段中指定评分。

`reviewRating`

`[Rating](https://schema.org/Rating)`

对声明的评估。该对象既支持数字评估，也支持文字评估。目前，仅文字值会显示在搜索结果中。

不同的事实核查项目具有各种不同的评分标准，这些标准可能会有细微差别，特别是在中间值方面。所以，请务必记录此类评分标准，说明数字评分的含义。您至少要针对所有带数字分值的事实核查提供一个将数字转换为文字的评分体系。

- 1 =“不属实”
- 2 =“大部分不属实”
- 3 =“一半属实”
- 4 =“大部分属实”
- 5 =“属实”

有关详情，请参阅 [Rating](#rating)。

`url`

`[URL](https://schema.org/URL)`

指向事实核查完整报道托管网页的链接。

此网址值的网域必须与托管此 `ClaimReview` 元素的网页对应的网域相同，或者是该对应网域的子网域。重定向网址或缩短网址（例如 g.co/searchconsole）不会被解析，因此在此处不适用。

建议属性

`author`

`[Organization](https://schema.org/Organization)` 或 `[Person](https://schema.org/Person)`

事实核查报道的发布商，而非声明的发布商。`author` 必须是组织或个人。`author` 必须至少具有以下属性之一：

 `name`

 `[Text](https://schema.org/Text)`

发布事实核查的组织的名称。

`url`

`[URL](https://schema.org/URL)`

事实核查发布商的网址。可以是首页、联系信息页面或其他适当页面的网址。

 为了帮助 Google 更好地了解各种功能中的作者，应该遵循[作者标记最佳实践](https://developers.google.com/search/docs/appearance/structured-data/article?hl=zh-cn#author-bp)。

`itemReviewed`

`[Claim](https://schema.org/Claim)`

一个对象，用于说明所做的声明。有关详情，请参阅 [`Claim`](#claim)。

**向后兼容性**：在最初推出事实核查时，Google 搜索建议将 `CreativeWork` 当作 `itemReviewed`。Google 搜索会继续支持以前的标记格式。下面的示例显示了最初的标记样式：
  <html> <head> <title>The world is flat</title> <script type="application/ld+json"> { "@context": "https://schema.org", "@type": "ClaimReview", "datePublished": "2024-06-22", "url": "https://example.com/news/science/worldisflat.html", "itemReviewed": { "@type": "CreativeWork", "author": { "@type": "Organization", "name": "Square World Society", "sameAs": "https://example.flatworlders.com/we-know-that-the-world-is-flat" }, "datePublished": "2024-06-20" }, "claimReviewed": "The world is flat", "author": { "@type": "Organization", "name": "Example.com science watch" }, "reviewRating": { "@type": "Rating", "ratingValue": 1, "bestRating": 5, "worstRating": 1, "alternateName" : "False" } } </script> </head> <body> </body> </html>

### `Claim`

如需了解 `Claim` 的完整定义，请访问 [schema.org/Claim](https://schema.org/Claim)。

建议属性

`appearance`

`[URL](https://schema.org/URL)` 或 `[CreativeWork](https://schema.org/CreativeWork)`

指向显示此声明的 `CreativeWork` 的链接或该 CreativeWork 的内嵌描述。

我们建议您添加 `appearance` 或 `firstAppearance`。 您无需同时添加二者。

`author`

`[Organization](https://schema.org/Organization)` 或 `[Person](https://schema.org/Person)`

声明的创建者，而非事实核查的创建者。如果声明没有创建者，请勿添加 `author` 属性。如果添加 `author`，请定义以下属性：

`name`

`[Text](https://schema.org/Text)`（必需）

声明的发布商。发布商可以是个人或组织。

`sameAs`

`[URL](https://schema.org/URL)`（建议）

表示做出声明的一方，可以是 `[Person](https://schema.org/Person)` 或 `[Organization](https://schema.org/Organization)`。如果有多个发布商报告了同一项声明，则 `appearance` 属性可以重复使用。如果有多方做出基本相同的声明，则 `author` 属性可以重复使用。

网址可以是：

- 做出声明的组织的首页网址。
- 对声明方加以介绍的其他权威网址，例如个人或组织对应的维基百科条目网页或维基数据条目网页。

`datePublished`

`[DateTime](https://schema.org/DateTime)` 或 `[Date](https://schema.org/Date)`

做出声明的日期或声明成为公众话题（例如，成为社交网络中的热门话题时）的日期。

`firstAppearance`

`[URL](https://schema.org/URL)` 或 `[CreativeWork](https://schema.org/CreativeWork)`

指向最早显示此声明的 `CreativeWork` 的链接或该 CreativeWork 的内嵌描述。

我们建议您添加 `appearance` 或 `firstAppearance`。 您无需同时添加二者。

### `Rating`

如需了解 `Rating` 的完整定义，请访问 [schema.org/Rating](https://schema.org/Rating)。

必要属性

`alternateName`

`[Text](https://schema.org/Text)`

为 `ClaimReview.reviewRating` 指定的真实度评分，采用便于用户阅读的简短字词或短语。该值会显示在搜索结果中的事实核查内。**例如**：“属实”或“大部分属实”。

如果要使用较长的句子，请确保在句子开头将意思表达清楚，以防句子为了适应屏幕而被截断。例如：“细节上大部分属实，不过整体声明有一定的误导性”

建议属性

`bestRating`

 `[Number](https://schema.org/Number)`

用于数字评分，表示最差到最佳评分范围内可能的最佳值。该值必须大于 `worstRating`，且必须是能够计算的数字值。**例如**：4

`name`

`[Text](https://schema.org/Text)`

与 `alternateName` 相同，在未提供 `alternateName` 时使用，但我们建议您指定 `alternateName`（而不是 `name`）。

`ratingValue`

`[Number](https://schema.org/Number)`

声明的数字评分，介于 `worstRating`（含）到 `bestRating`（含）之间。我们建议使用整数值，但不强制要求。此数字评分越接近 `bestRating`，则表示真实度越高；越接近 `worstRating`，则表示真实度越低。另外，此数字评分必须是能够计算的数字值。**例如**：4

`worstRating`

`[Number](https://schema.org/Number)`

用于数字评分，表示最差到最佳评分范围内可能的最差值。该值必须小于 `bestRating`，且必须是能够计算的数字值。最小值必须为 1。**例如**：1

## 使用 Search Console 监控富媒体搜索结果

 Search Console 是一款工具，可帮助您监控网页在 Google 搜索结果中的显示效果。即使没有注册 Search Console，您的网页也可能会显示在 Google 搜索结果中，但注册 Search Console 能够帮助您了解 Google 如何查看您的网站并做出相应的改进。建议您在以下情况下查看 Search Console：

1. [首次部署结构化数据后](#after-deploying)
2. [发布新模板或更新代码后](#after-releasing)
3. [定期分析流量时](#analyzing-periodically)

###  首次部署结构化数据后

 等 Google 将网页编入索引后，请在相关的[富媒体搜索结果状态报告](https://support.google.com/webmasters/answer/7552505?hl=zh-cn)中查看是否存在问题。 理想情况下，有效项目数量会增加，而无效项目数量不会增加。如果您发现结构化数据存在问题，请执行以下操作：

1. [修正无效项目](#troubleshooting)。
2. [检查实际网址](https://support.google.com/webmasters/answer/9012289?hl=zh-cn#test_live_page)，核实问题是否仍然存在。
3. 使用状态报告[请求验证](https://support.google.com/webmasters/answer/7552505?hl=zh-cn#validation)。

###  发布新模板或更新代码后

 如果对网站进行重大更改，请监控结构化数据无效项目的增幅。

- 如果您发现**无效项目增多了**，可能是因为您推出的某个新模板无法正常工作，或者您的网站以一种新的错误方式与现有模板交互。
- 如果您发现**有效项目减少了**（但无效项目的增加情况并不对应），可能是因为您的网页中未再嵌入结构化数据。请通过[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)了解导致此问题的原因。

**警告**：请勿使用[缓存链接](https://support.google.com/websearch/answer/1687222?hl=zh-cn)调试网页。建议改用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)，因为该工具会检查网页的最新版本。

###  定期分析流量时

 请使用[效果报告](https://support.google.com/webmasters/answer/7576553?hl=zh-cn)分析您的 Google 搜索流量。数据将显示您的网页在 Google 搜索结果中显示为富媒体搜索结果的频率、用户点击该网页的频率以及网页在搜索结果中的平均排名。您还可以使用 [Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original/v3/how-tos/search_analytics?hl=zh-cn) 自动提取这些结果。

## 问题排查

 如果您在实施或调试结构化数据时遇到问题，请查看下面列出的一些实用资源。

- 如果您使用了内容管理系统 (CMS) 或其他人负责管理您的网站，请向其寻求帮助。请务必向其转发列明问题细节的任何 Search Console 消息。
- Google 不能保证使用结构化数据的功能一定会显示在搜索结果中。如需查看导致 Google 无法将您的内容显示为富媒体搜索结果的各种常见原因，请参阅[结构化数据常规指南](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn)。
- 您的结构化数据可能存在错误。请查看[结构化数据错误列表](https://support.google.com/webmasters/answer/13300873?hl=zh-cn)和[“无法解析的结构化数据”报告](https://support.google.com/webmasters/answer/9166415?hl=zh-cn)。
- 如果您的网页受到结构化数据手动操作的影响，其中的结构化数据将会被忽略（但该网页仍可能会出现在 Google 搜索结果中）。如需修正[结构化数据问题](https://support.google.com/webmasters/answer/9044175?hl=zh-cn#zippy=,structured-data-issue)，请使用[“人工处置措施”报告](https://support.google.com/webmasters/answer/9044175?hl=zh-cn)。
- 再次查看相关[指南](#guidelines)，确认您的内容是否未遵循指南。问题可能是因为出现垃圾内容或使用垃圾标记导致的。不过，问题可能不是语法问题，因此富媒体搜索结果测试无法识别这些问题。
- 结构化数据问题可能会影响网站内容在搜索结果中的显示方式。请参阅[针对富媒体搜索结果缺失/富媒体搜索结果总数下降进行问题排查](https://support.google.com/webmasters/answer/13300208?hl=zh-cn)指南，了解在 Search Console 中发现、修正和验证这些问题的分步方法。
- 请等待一段时间，以便 Google 重新抓取您的网页并重新将其编入索引。请注意，网页发布后，Google 可能需要几天时间才会找到和抓取该网页。有关抓取和索引编制的常见问题，请参阅 [Google 搜索抓取和索引编制常见问题解答](https://developers.google.com/search/help/crawling-index-faq?hl=zh-cn)。
- 在 [Google 搜索中心论坛](https://support.google.com/webmasters/community?hl=zh-cn)中发帖提问。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-09-15。
