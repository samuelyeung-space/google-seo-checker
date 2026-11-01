---
title: "图书操作 (Book) 结构化数据"
source: https://developers.google.com/search/docs/appearance/structured-data/book?hl=zh_CN
slug: search__docs__appearance__structured-data__book
path: /search/docs/appearance/structured-data/book
---

# 图书操作 (Book) 结构化数据

> 来源: https://developers.google.com/search/docs/appearance/structured-data/book?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 图书操作 (`Book`) 结构化数据

图书操作使得 Google 搜索成为发现图书和作者的切入点。这让搜索用户能够直接通过 Google 搜索结果购买或借阅他们找到的图书。 **例如，用户可以搜索《夏洛特的网》，并从呈现的搜索结果中购买或借阅此书。作为图书提供商，您可以使用下面的结构化数据架构向 Google 提供数据 Feed。我们分别提供了 `ReadAction` 和 `BorrowAction` 供用户购买和借阅图书。

 **注意**：在 Google 搜索结果中的实际呈现效果可能会有不同。

**注意：**为了确保足够的覆盖面并更好地服务于 Google 搜索用户，此功能目前仅向图书门类比较齐全的图书提供商开放。如果您有意参与，请提交[注册表单](https://docs.google.com/forms/d/e/1FAIpQLSd0mg2Yu6kNzBjkFSWQuiu61WIXo2kBmwFuwaA3JHiw7MfCdg/viewform?hl=zh-cn)。不过，表示对此功能感兴趣并不保证一定能参与。

被纳入面板中的阅读操作和借阅操作可显示购买或借阅图书的选项。通过您提供的链接，阅读操作和借阅操作让用户可直接从知识面板和其他 Google 平台转到您的网站或应用上的图书页面。

知识面板中的提供商顺序针对每位用户进行了个性化设置，且在不断变化。这意味着不同的用户会看到不同的排序，并且同一用户在不同时间也可能会看到不同的排序。影响特定顺序的因素有很多。例如，如果用户经常点击知识面板中的特定提供商链接，该提供商更有可能排名更靠前。没有办法控制顺序。

## 开始使用

若要成功实现图书操作，您必须根据图书操作[结构化数据类型定义](#structured-data-type-definitions)构建 Feed，但首先请查看以下部分：

- [指南](#guidelines)
- [创建 Feed](#create-your-feed)
- [使用数据 Feed 验证工具测试 Feed](#test-your-feed-with-the-data-feed-validation-tool)
- [托管 Feed 文件](#host-your-feed-file)
- [提交 Feed 文件以供审核](#submit-your-feed-file-for-review)
- [根据需要更新 Feed](#update-your-feed-as-needed)

## 指南

为了确保您的图书能够可靠地显示在 Google 搜索结果中，请务必熟悉一些重要细节和关键概念。此外，您的 Feed 还必须符合一些标准化格式规范。

为帮助您做到这一点，除了[结构化数据常规指南](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn)和 [Search Essentials](https://developers.google.com/search/docs/essentials?hl=zh-cn) 之外，还应遵循本文所述的指南。相关指南如下：

- [作品和版本](#works-and-editions)
- [图书馆系统和图书馆成员](#library-systems-and-library-members)
- [ISBN 和其他支持的标识符](#isbn-and-other-supported-identifiers)
- [链接](#links)

### 作品和版本

在本文档中，我们在谈论图书时会使用两个不同的术语：

- **作品**：图书的抽象概念。确切地说，书名、作者和原作语言等元数据是作品的属性。
- **版本**：图书的具体副本。确切地说，出版年份、版本名称和国际标准书号 (ISBN) 等元数据是版本的属性。

例如，《夏洛特的网》是一部作品，但它的每个变体都是一个版本。****在这种情况下，作品《夏洛特的网》可能有第一版、第二版、缩编本、法语翻译版等。**

两者间的差别在 Feed 中可能并不明显，但却十分重要。存在两种 [`Book` 实体](#book-entity)：

- [`Book` (`Work`)](#book-work) 是“顶级”`Book` 实体：

  - `workExample` 是 `Work` 的一个属性，仅指定一个 `Book` (`Edition`) 实例。
  - 每个 `Work` 必须至少有一个 `workExample`。

- [`Book` (`Edition`)](#book-edition) 是“较低级别”的 `Book` 实体。

请谨记，一部作品可能会有多个版本。我们建议您尽可能将这些版本组合到一起。这有助于 Google 系统利用图书的所有相关信息，并将图书显示在 Google 搜索结果中。如有需要，您可以将这些版本划分为多条作品记录，但每条作品记录都必须包含：

- 一个不同的 `@id`。
- 至少一个具有 ISBN 或其他受支持标识符的版本。

### 图书馆系统和图书馆成员

**注意**：本部分适用于提供图书借阅服务的提供商。

[`Library entity`](#library-entity) 是“顶级”`Library` 实体类型。它是一个抽象结构，由 [`LibrarySystem`](#librarysystem) 实体和此图书馆系统的每个“较低级别”的 [`Library (member)`](#library-member) 实体组成。

`LibrarySystem` 实体是一个抽象概念，代表一个图书馆成员协作网络。**例如，可以将奥斯汀公共图书馆指定为 `LibrarySystem` 实体。[奥斯汀公共图书馆网站](https://library.austintexas.gov/locations)自称是服务于美国得克萨斯州奥斯汀的公共图书馆系统**。它由 20 个关联的图书馆（即图书馆成员）组成。**

每个 `LibrarySystem` 实体都需要至少一个 `Library (member)` 实体，即使在现实生活中图书馆不属于任何图书馆系统。在这种情况下，对于图书操作实现，该图书馆是它自己的图书馆系统的唯一图书馆成员。****对于图书操作实现，与图书馆系统不同，图书馆成员不是抽象概念，因此具有实际地址。****

相对地，每个 `Library (member)` 实体必须至少属于一个 `LibrarySystem` 实体。

### ISBN 和其他支持的标识符

当 Google 搜索将您的 Feed 数据与 Google 数据相匹配时，ISBN 是主要对比信号。对于您希望在 Google 搜索结果中显示的所有图书，您都必须提供 ISBN 或其他支持的标识符。否则，您的图书很可能无法得到匹配，因此无法向用户提供。

Google 搜索首选 ISBN-13，但您也可以提供以下编号：

- 在线计算机图书馆中心 (OCLC) 编号
- 美国国会图书馆控制号 (LCCN)
- JP 电子编码

**警告**：Google 搜索不接受 ISBN-10。对于只有 ISBN-10 信息的图书，请先使用 ISBN 转换工具将其转换为 ISBN-13，然后再将 Feed 发送给 Google。

**注意**：对于没有 ISBN 的图书，您仍然可以在 Feed 中提供。 这些图书可能不会在 Google 搜索中向用户显示。不过，以下做法可能有助于促成正确的匹配：

- 将所有 [`Edition`](#book-edition) 实体分组到同一[作品](#book-work)下，并确保至少一个版本具有 ISBN、OCLC 编号、LCCN 或 JP 电子编码。Google 搜索或许能利用来自其他版本的可用 ISBN 或其他支持的标识符。
- 添加第三方标识符。Google 搜索目前支持两种广泛使用的图书馆控制号：OCLC 编号或 LCCN。如果您有其中一种编号，请提供。

### 链接

为了确保提供最佳图书查找体验，Feed 中的链接必须遵循以下指南：

- 如果您有包含相同内容的重复网页，请务必使用包含书名和其他图书信息的[规范网址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)。
- 在用户点击阅读操作或借阅操作链接后，必须将用户转到一个直接支持购买或借阅图书的网页。确切地说，请勿将操作链接指向包含更多链接的网页，以免用户不得不点击这类网页中的链接才能购买或借阅内容。例如，请勿将用户引导至搜索结果页或产品摘要页。

## 创建 Feed

**注意**：只有[填写了意向调查表](https://docs.google.com/forms/d/e/1FAIpQLSd0mg2Yu6kNzBjkFSWQuiu61WIXo2kBmwFuwaA3JHiw7MfCdg/viewform?hl=zh-cn)并已完成注册的图书提供商才能使用此功能。

如果您的网站向用户销售图书，您必须上传 [`Book`](#book-entity) Feed。Google 支持团队会与您联系，向您详细说明如何上传 Feed 以及上传位置。

如果您的网站向用户出借图书，您必须上传两个单独的 Feed：[`Book`](#book-entity) Feed 和 [`Library`](#library-entity) Feed。Google 支持团队会与您联系，向您详细说明如何上传 Feed 以及上传位置。

### 遵守 Feed 文件大小、数量和格式要求

要求如下：

- Feed 文件大小要求：

  - 未压缩的 Feed 文件必须小于 1 GB。
  - 待压缩的 Feed 文件必须小于 1 GB。如果未压缩的 Feed 文件超过 1 GB，必须将未压缩的 Feed 文件拆分为多个文件。

- 您可以压缩 Feed 文件。压缩格式必须为 zip、gz、tar、tar.gz、JAR、ar、arj、cpio 或转储归档文件。
- 如果您有多个 Feed 文件，可以按原样上传；如果您愿意，也可以将这些文件包含到[站点地图索引文件](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps?hl=zh-cn)中。
- 单个 Feed 文件的文件扩展名必须为 `.json`。

### 遵守 Feed 内容要求

特别注意以下您必须遵守的 Feed 内容要求：

- Feed 不得包含过时的实体。过时实体是指将 `availabilityEnds` 设为过去日期的实体，或您网站上已不存在的实体。
- 您在 Feed 中添加的所有深层链接（例如 `urlTemplate`）和所有网址（例如 `url`）都必须是正式版网址。请勿使用质量检查、开发或任何其他类型的非正式版网址。
- 所有网址（例如 `url`）都必须是[规范网址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)。
- Feed 中的每个实体都必须指定以下属性：

  - 唯一 ID：`@id`
  - 唯一网址：`url`
  - 唯一深层链接：`urlTemplate`

## 使用数据 Feed 验证工具测试 Feed

我们建议执行以下问题排查步骤，解决[数据 Feed 验证工具](https://actions.google.com/tools/feed-validator/u/0/?hl=zh-cn)中显示的常见错误和警告：

-

请确保在**验证行业**字段中选择正确的选项。 为 `Book` 实体选择**图书操作**。

- 验证 `@type` 的值是否拼写正确。
- 确保 `@context` 的值设置正确。为 `ReadAction` 和 `BorrowAction` 设置 `"@context": "https://schema.org"`。

## 托管 Feed 文件

Feed 文件准备就绪后，请将其托管在安全位置。Google 会定期抓取 Feed，确保您的内容处于最新状态。

### 托管方法

我们支持以下 Feed 托管方法：

**托管**

**身份验证支持**

Google Cloud Storage

**Storage Object Viewer 权限

HTTPS

用户名+密码或 [HTTP 客户端证书](https://web.dev/articles/enable-https?hl=zh-cn)

SFTP

密码和/或密钥+词组

AWS S3

密钥 ID+访问密钥

## 提交 Feed 文件以供审核

为了让您的内容在 Google 搜索中显示，Google 支持团队会审核您 Feed 中深层链接的质量。我们强烈建议您手动测试某些深层链接，以确认是否能打开可供用户购买或借阅图书的页面。

**注意**：只有合作伙伴可以成功使用此功能以及提交 Feed 时必须使用的[意向调查表](https://docs.google.com/forms/d/e/1FAIpQLSd0mg2Yu6kNzBjkFSWQuiu61WIXo2kBmwFuwaA3JHiw7MfCdg/viewform?hl=zh-cn)。

要申请审核您的 Feed，请提供以下信息：

- **主机位置**：Feed 文件的网址。
- **主机身份验证（如果适用）**：允许 Google 从您的主机位置获取 Feed 文件的身份验证凭据。

## 根据需要更新 Feed

我们建议您每天更新 Feed，不过，这最终取决于您的目录更改频率。请注意以下条件和提示：

- Google 搜索不支持实时更新。
- Google 搜索每天抓取一次 Feed，通常在两天内将相应内容编入索引。
- 如果能够预见某版本的供应时间会发生变化，请使用 `availabilityStarts` 和 `availabilityEnds` 设置确切的日期。如果相关实体已不再供应，请完全移除该实体

## 结构化数据类型定义

如需让您的内容显示在结构化搜索结果中，必须添加此处列出的必需属性。您还可添加建议的属性，以便添加与您的内容相关的更多信息，进而提供更好的用户体验。

### DataFeed 实体

向 Google 提交的每个 schema.org 数据 Feed 文件都必须在根目录级添加单个 [`DataFeed`](https://schema.org/DataFeed) 实体。所有 [`Book`](#book-entity) 和 [`Library`](#library-entity) 实体都必须列在 `DataFeed` 实体的 `dataFeedElement` 字段下。

Google 支持的属性如下：

必要属性

`@context`

[`Text`](https://schema.org/Text)

设为 `https://schema.org`。

`@type`

[`Text`](https://schema.org/Text)

设为 `DataFeed`。

`dataFeedElement`

[`Book`](https://schema.org/Book) 或 [`LibrarySystem`](https://schema.org/LibrarySystem)

设为单个 [`Book`](https://schema.org/Book) 实体或 [`LibrarySystem`](https://schema.org/LibrarySystem) 实体。否则，设为仅包含 `Book` 实体或 `LibrarySystem` 实体的数组。请勿将其设为同时包含 `Book` 实体和 `LibrarySystem` 实体的数组。

`Book` Feed 中的应用示例：

```
{
  "@context": "https://schema.org",
  "@type": "DataFeed",
  "dataFeedElement": [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      "@id": "https://example.com/work/the_catcher_in_the_rye",
      "url": "https://example.com/work/the_catcher_in_the_rye",
      "name": "The Catcher in the Rye",
      "author": {
        "@type": "Person",
        "name": "J.D. Salinger"
      },
      "sameAs": "https://en.wikipedia.org/wiki/The_Catcher_in_the_Rye",
      "workExample": [
        {
          "@type": "Book",
          "@id": "https://example.com/edition/the_catcher_in_the_rye_paperback",
          "isbn": "9787543321724",
          "bookEdition": "Mass Market Paperback",
          "bookFormat": "https://schema.org/Paperback",
          "inLanguage": "en",
          ...
        },
        ...
      ]
   }
  ],
  "dateModified": "2018-09-10T13:58:26.892Z"
}
```

`LibrarySystem` Feed 中的应用示例：

```
{
  "@context": "https://schema.org",
  "@type": "DataFeed",
  "dataFeedElement": [
    {
      "@context": "https://schema.org",
      "@type": "LibrarySystem",
      "@id": "https://example.com/library-systems/100",
      "name": "Santa Clara County Library District",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "librarytype",
          "value": "public"
        }
      ],
      ...
    },
    ...
  ],
  "dateModified": "2018-09-10T13:58:26.892Z"
}
```

**警告**：如[创建 Feed](#create-your-feed) 部分所述，如果您同时拥有 [`Book`](#book-entity) Feed 和 [`Library`](#library-entity) Feed，则它们必须是两个单独的 Feed 文件。因此，对于任何特定 `DataFeed` 实体，您只能根据以下某个条件设置其 `dataFeedElement` 属性：

- 将 `dataFeedElement` 设为单个 `Book` 实体或 `Book` 实体数组。
- 将 `dataFeedElement` 设为单个 `LibrarySystem` 实体或 `LibrarySystem` 实体数组。

`dateModified`

[`DateTime`](https://schema.org/DateTime)

Feed 的上次更新日期和时间，采用 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 格式。

### `Book` 实体

[schema.org/Book](https://schema.org/Book) 提供了 `Book` 的完整定义，而您只需考虑以下属性。您必须为要添加到 Feed 中的每本图书定义必需的属性。您还可定义建议的属性，以便添加与您的内容相关的更多信息，进而提供更好的用户体验。

#### `Book` (`Work`)

此 `Book` 实体是顶级实体类型。它代表一部作品。**

**要点**：阅读[作品和版本](#works-and-editions)指南，了解您的实现中这两种 `Book` 实体之间的区别。

Google 支持的属性如下：

必要属性

`@context`

[`Text`](https://schema.org/Text)

设为 `https://schema.org`。

`@id`

[`Text`](https://schema.org/Text)

图书的全局唯一 ID，采用网址格式。它必须是您的组织专属的 ID。该 ID 必须保持稳定，不应随着时间的推移而发生变化。网址格式并非强制要求，但我们建议您采用。它不一定是有效链接。用于 `@id` 值的网域必须归您的组织所有。

`@type`

[`Text`](https://schema.org/Text)

设为 `Book`。

`author`

[`Person`](https://schema.org/Person) 或 [`Organization`](https://schema.org/Organization)

图书的作者。

**注意**：如果图书没有作者，但有一名或多名创作贡献者，请按照 [schema.org/Book](https://schema.org/Book) 中的定义添加这些其他创作贡献者。**。 例如，某本图书的作者可能不为人所知或没有记录，但可能有多位编辑人员。

相反，如果图书的作者是组织，请按照 [schema.org/Organization](https://schema.org/Organization) 中的定义来定义作者。 例如，图书《Fundamentals of fire fighting skills》的作者可能是组织 `National Fire Protection Association`。

`name`

[`Text`](https://schema.org/Text)

图书的名称。

`url`

[`URL`](https://schema.org/URL)

您的网站上介绍或说明图书的网址。此链接有助于准确匹配 Feed 中的内容与 Google 数据库中的内容。它可以与 `workExample.target.urlTemplate` 相同。

对于实际着陆页，Google 搜索会使用 `workExample.target.urlTemplate` 中提供的网址。

`workExample`

[`Book`](https://schema.org/Book)`(Edition)`

作品的版本。

建议属性

`sameAs`

[`URL`](https://schema.org/URL)

标识作品的参考网页对应的网址。例如，介绍图书的维基百科、维基数据、虚拟国际规范文档 (VIAF) 或美国国会图书馆网页。

#### `Book` (`Edition`)

`workExample` 属性使用此 `Book` 实体。它代表作品的版本。****

**要点**：阅读[作品和版本](#works-and-editions)指南，了解您的实现中这两种 `Book` 实体之间的区别。

Google 支持的属性如下：

必要属性

`@id`

[`Text`](https://schema.org/Text)

图书的全局唯一 ID，采用网址格式。它必须是您的组织专属的 ID。该 ID 必须保持稳定，不应随着时间的推移而发生变化。网址格式并非强制要求，但我们建议您采用。它不一定是有效链接。用于 `@id` 值的网域必须归您的组织所有。

`@type`

[`Text`](https://schema.org/Text)

设为 `Book`。

`bookFormat`

[`Enum`](https://schema.org/Enumeration)

版本的格式。此属性的值必须是以下某一项：

- `https://schema.org/AudiobookFormat`
- `https://schema.org/EBook`
- `https://schema.org/Hardcover`
- `https://schema.org/Paperback`

`inLanguage`

[`Text`](https://schema.org/Text)

版本内容的主要语言。请使用 [ISO 639-1 alpha-2 代码列表](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)中的某个代码（由两个字母组成）。

`isbn`

[`Text`](https://schema.org/Text)

版本的 ISBN-13 编码。如果有 ISBN-10，请将其转换为 ISBN-13。

`potentialAction`

[`ReadAction`](https://schema.org/ReadAction) 或 [`BorrowAction`](https://schema.org/BorrowAction)

用户购买或下载图书时要触发的操作。有关详情，请参阅 [`ReadAction`](#readaction-potentialaction) 或 [`BorrowAction`](#borrowaction-potentialaction)。

建议属性

`author`

[`Person`](https://schema.org/Person) 或 [`Organization`](https://schema.org/Organization)

版本的作者。

**注意**：仅当版本的作者与作品作者信息不同时才使用此属性。

**如果版本没有作者，但有一名或多名创作贡献者，请按照 [schema.org/Book](https://schema.org/Book) 中的定义添加这些其他创作贡献者。 例如，某个版本的作者可能不为人所知或没有记录，但可能有多位编辑人员。

相反，如果某个版本的作者是组织，请按照 [schema.org/Organization](https://schema.org/Organization) 中的定义来定义作者。 例如，**美国心理学协会的出版手册（第 6 版）的作者可能是组织 `American Psychological Association`。

`bookEdition`

[`Text`](https://schema.org/Text)

图书的版本信息，例如 `2nd Edition`。

`datePublished`

[`Date`](https://schema.org/Date)

版本的出版日期，格式为 YYYY-MM-DD 或 YYYY。此日期可以是特定日期，也可以只是特定年份。

`identifier`

[`PropertyValue`](https://schema.org/PropertyValue)

明确标识了此版本的外部 ID 或其他 ID。允许使用多个标识符。如需了解更多详情，请参阅 [`PropertyValue` (`identifier`)](#propertyvalue-identifier)。

此属性可以重复。

`name`

[`Text`](https://schema.org/Text)

版本的名称。仅当该版本的名称与作品的名称不同时，才使用此属性。

`sameAs`

[`URL`](https://schema.org/URL)

明确指明了版本的参考网页对应的网址。例如，介绍此特定版本的维基百科网页。请勿重复使用 `Work` 的 `sameAs`。

`url`

[`URL`](https://schema.org/URL)

您的网站上介绍或说明版本的网址。它可以与 `workExample.target.urlTemplate` 相同。

`Book` (`Edition`) 示例：

```
"workExample":
        {
          "@type": "Book",
          "@id": "https://example.com/book/100",
          "inLanguage": "en",
          "isbn": "9787543321724",
          "bookEdition": "20 Anniversary Edition",
          "datePublished": "2000-02-26",
          "bookFormat": "https://schema.org/Hardcover",
          "potentialAction": {...}
        }
```

具有多个 `workExample` 属性的 `Book` (`Edition`) 示例：

```
"workExample": [
        {
          "@type": "Book",
          "@id": "https://example.com/book/200",
          "inLanguage": "zh",
          "isbn": "9787543321721",
          "bookEdition": "2nd Edition",
          "bookFormat": "https://schema.org/Hardcover",
          "potentialAction": {...}
        },
        {
          "@type": "Book",
          "@id": "https://example.com/book/300",
          "inLanguage": "zh",
          "isbn": "9787543321722",
          "bookEdition": "1st Edition",
          "bookFormat": "https://schema.org/EBook",
          "potentialAction": {...}
      }
 ]
```

### `Person` 或 `Organization` (`author`)

图书的 `author` 属性使用 `Person` 或 `Organization` 实体。

必要属性

`@type`

[`Text`](https://schema.org/Text)

设为 `Person` 或 `Organization`。

`name`

[`Text`](https://schema.org/Text)

个人或组织的名称。

建议属性

`sameAs`

[`URL`](https://schema.org/URL)

明确指明了个人或组织身份的参考网页对应的网址。例如，个人或组织的维基百科网页。

`author` 示例：

```
"author": {
  "@type": "Person",
  "name": "William Shakespeare"
}
```

具有多个 `author` 属性的示例：

```
"author": [
  {
    "@type": "Person",
    "name": "William Shakespeare"
  },
  {
    "@type": "Person",
    "name": "Victor Hugo",
    "sameAs": "https://en.wikipedia.org/wiki/Victor_Hugo"
  }
]
```

### PropertyValue (identifier)

`Edition` 的 `identifier` 属性使用 `PropertyValue` 实体。

必要属性

`@type`

[`Text`](https://schema.org/Text)

设为 `PropertyValue`。

`propertyID`

[`Text`](https://schema.org/Text)

ID 的类型。如 [ISBN 和其他支持的标识符](#isbn-and-other-supported-identifiers)部分所述，它必须是以下某一项：

- `OCLC_NUMBER`
- `LCCN`
- `JP_E-CODE`

`value`

[`Text`](https://schema.org/Text)

ID 值。明确标识了此版本的外部 ID。移除外部 ID 的所有非数字前缀。

`identifier` 示例：

```
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "OCLC_NUMBER",
      "value":  "110123456"
    }
```

具有多个 `identifier` 属性的示例：

```
    "identifier": [
    {
      "@type": "PropertyValue",
      "propertyID": "OCLC_NUMBER",
      "value":  "110123456"
    },
    {
      "@type": "PropertyValue",
      "propertyID": "LCCN",
      "value":  "220123456"
    },{
      "@type": "PropertyValue",
      "propertyID": "JP_E-CODE",
      "value":  "12345678901234567890"
    }]
```

### 示例 `ReadAction``Book` Feed JSON 文件

```
{
  "@context": "https://schema.org",
  "@type": "DataFeed",
  "dataFeedElement": [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      "@id": "https://example.com/work/the_catcher_in_the_rye",
      "url": "https://example.com/work/the_catcher_in_the_rye",
      "name": "The Catcher in the Rye",
      "author": {
        "@type": "Person",
        "name": "J.D. Salinger"
      },
      "sameAs": "https://en.wikipedia.org/wiki/The_Catcher_in_the_Rye",
      "workExample": [
        {
          "@type": "Book",
          "@id": "https://example.com/edition/the_catcher_in_the_rye_paperback",
          "isbn": "9787543321724",
          "bookEdition": "Mass Market Paperback",
          "bookFormat": "https://schema.org/Paperback",
          "inLanguage": "en",
          "url": "https://example.com/edition/the_catcher_in_the_rye_paperback",
          "datePublished": "1991-05-01",
          "identifier": {
            "@type": "PropertyValue",
            "propertyID": "OCLC_NUMBER",
            "value": "1057320822"
          },
          "potentialAction": {
            "@type": "ReadAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://example.com/store/9787543321724",
              "actionPlatform": [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/AndroidPlatform",
                "https://schema.org/IOSPlatform"
              ]
            },
            "expectsAcceptanceOf": {
              "@type": "Offer",
              "category": "purchase",
              "price": 6.99,
              "priceCurrency": "USD",
              "availabilityStarts": "2020-01-01T11:0:00-04:00",
              "availabilityEnds": "2050-06-30T23:59:00-04:00",
              "eligibleRegion": {
                "@type": "Country",
                "name": "US"
              }
            }
          }
        },
        {
          "@type": "Book",
          "@id": "https://example.com/edition/the_catcher_in_the_rye_hardcover",
          "isbn": "9780316769532",
          "bookEdition": "Hardcover",
          "bookFormat": "https://schema.org/Hardcover",
          "inLanguage": "en",
          "url": "https://example.com/edition/the_catcher_in_the_rye_hardcover",
          "datePublished": "1951-07-16",
          "potentialAction": {
            "@type": "ReadAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://example.com/store/9780316769532",
              "actionPlatform": [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/AndroidPlatform",
                "https://schema.org/IOSPlatform"
              ]
            },
            "expectsAcceptanceOf": [
              {
                "@type": "Offer",
                "category": "nologinrequired",
                "availabilityStarts": "2020-01-01T11:0:00-04:00",
                "availabilityEnds": "2050-06-30T23:59:00-04:00",
                "eligibleRegion": [
                  {
                    "@type": "Country",
                    "name": "US"
                  },
                  {
                    "@type": "Country",
                    "name": "GB"
                  }
                ]
              },
              {
                "@type": "Offer",
                "category": "Subscription",
                "availabilityStarts": "2020-01-01T11:0:00-04:00",
                "availabilityEnds": "2050-06-30T23:59:00-04:00",
                "eligibleRegion": {
                  "@type": "Country",
                  "name": "IN"
                }
              }
            ]
          }
        }
      ]
    }
  ],
  "dateModified": "2018-09-10T13:58:26.892Z"
}
```

### 示例 `BorrowAction``Book` Feed JSON 文件

```
{
  "@context": "https://schema.org",
  "@type": "DataFeed",
  "dataFeedElement": [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      "@id": "https://example.com/work/the_catcher_in_the_rye",
      "url": "https://example.com/work/the_catcher_in_the_rye",
      "name": "The Catcher in the Rye",
      "author": {
        "@type": "Person",
        "name": "J.D. Salinger"
      },
      "sameAs": "https://en.wikipedia.org/wiki/The_Catcher_in_the_Rye",
      "workExample": [
        {
          "@type": "Book",
          "@id": "https://example.com/edition/the_catcher_in_the_rye_paperback",
          "isbn": "9787543321724",
          "bookEdition": "Mass Market Paperback",
          "bookFormat": "https://schema.org/Paperback",
          "inLanguage": "en",
          "url": "https://example.com/edition/the_catcher_in_the_rye_paperback",
          "datePublished": "1991-05-01",
          "identifier": {
            "@type": "PropertyValue",
            "propertyID": "OCLC_NUMBER",
            "value": "1057320822"
          },
          "potentialAction": {
            "@type": "BorrowAction",
            "lender": {
              "@type": "LibrarySystem",
              "@id": "https://example.com/librarySystem/100"
            },
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://example.com/borrowpurchase?bookId=170",
              "actionPlatform": [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/AndroidPlatform",
                "https://schema.org/IOSPlatform"
              ]
            }
          }
        },
        {
          "@type": "Book",
          "@id": "https://example.com/edition/the_catcher_in_the_rye_hardcover",
          "isbn": "9780316769532",
          "bookEdition": "Hardcover",
          "bookFormat": "https://schema.org/Hardcover",
          "inLanguage": "en",
          "url": "https://example.com/edition/the_catcher_in_the_rye_hardcover",
          "datePublished": "1951-07-16",
          "potentialAction": {
            "@type": "BorrowAction",
            "lender": {
              "@type": "LibrarySystem",
              "@id": "https://example.com/librarySystem/100"
            },
            "target": [
              {
                "@type": "EntryPoint",
                "urlTemplate": "https://example.com/borrowpurchase?bookId=170",
                "actionPlatform": [
                  "https://schema.org/DesktopWebPlatform"
                ]
              },
              {
                "@type": "EntryPoint",
                "urlTemplate": "https://example.com/mobile/borrowpurchase?bookId=170",
                "actionPlatform": [
                  "https://schema.org/AndroidPlatform",
                  "https://schema.org/IOSPlatform"
                ]
              }
            ]
          }
        }
      ]
    }
  ],
  "dateModified": "2018-09-10T13:58:26.892Z"
}
```

### `ReadAction` (`potentialAction`)

`potentialAction` 属性使用 `ReadAction` 实体。 `ReadAction` 定义了可访问图书的深层链接、有图书存货的零售商，以及用户必须满足的条件。条件可能包括会员资格状态、登录状态、位置或访问图书所需的任何其他信息。

必要属性

`@type`

[`Text`](https://schema.org/Text)

设为 `ReadAction`。

`expectsAcceptanceOf`

[`Offer`](https://schema.org/Offer)

对用户访问此实体应满足的要求所做的定义。如果存在多个 `Offer` 属性，则符合任何一项 `Offer` 条件的用户或许能够访问内容。**

此属性可以重复。

`expectsAcceptanceOf.@type`

[`Text`](https://schema.org/Text)

设为 `Offer`。

`expectsAcceptanceOf.category`

[`Text`](https://schema.org/Text)

`Offer` 的类型。必须是以下某一值：

- `nologinrequired`：用户无需购买或登录即可访问内容，实现对应的操作。
- `free`：用户无需购买或付费订阅也可以实现对应的操作。不过，该操作需要用户登录。
- `subscription`：该图书包含在您提供的付费订阅服务中。
- `purchase`：该图书可通过购买获取。
- `rental`：购买后，该图书在有限时间内可供访问。

`expectsAcceptanceOf.eligibleRegion`

[`Country`](https://schema.org/Country)

该 `Offer` 的适用国家/地区。此属性可用于控制该内容在哪些国家/地区提供或不提供。

此属性可以重复。

`expectsAcceptanceOf.eligibleRegion.@type`

[`Text`](https://schema.org/Text)

设为 `Country`。

`expectsAcceptanceOf.eligibleRegion.name`

[`Text`](https://schema.org/Text)

[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) 国家/地区代码。

`target`

[`EntryPoint`](https://schema.org/EntryPoint)

深层链接的规范，其中包括受支持平台的信息。您可以通过多个 `EntryPoint` 属性为不同的平台集合定义不同的深层链接。

此属性可以重复。

`target.@type`

[`Text`](https://schema.org/Text)

设为 `EntryPoint`。

`target.actionPlatform`

[`Text`](https://schema.org/Text)

该深层链接的适用平台。请使用以下某个值：

- `https://schema.org/DesktopWebPlatform`
- `https://schema.org/AndroidPlatform`
- `https://schema.org/IOSPlatform`

此属性可以重复。

`target.urlTemplate`

[`URL`](https://schema.org/URL)

可将用户直接转到图书着陆页内容的链接。

建议属性

`expectsAcceptanceOf.availabilityEnds`

[`DateTime`](https://schema.org/DateTime)

可用时段的结束时间。此属性可用于控制该图书不得再向用户展示的确切时间。

`expectsAcceptanceOf.availabilityStarts`

[`DateTime`](https://schema.org/DateTime)

可用时段的开始时间。此属性可用于控制图书可以开始向用户展示的确切时间。

`expectsAcceptanceOf.price`

[`Number`](https://schema.org/Number)

图书的购买价格。如果 `Offer` 属性的 `category` 设为 `purchase` 或 `rental`，那么这是必需的属性。

`expectsAcceptanceOf.priceCurrency`

[`Text`](https://schema.org/Text)

价格所用币种，采用由三个字母表示的 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 格式。

`ReadAction` 示例：

```
"potentialAction": {
  "@type": "ReadAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://example.com/purchase?bookId=170",
    "actionPlatform": [
      "https://schema.org/DesktopWebPlatform",
      "https://schema.org/AndroidPlatform",
      "https://schema.org/IOSPlatform"
    ]
  },
  "expectsAcceptanceOf": {
    "@type": "Offer",
    "category": "purchase",
    "price": 9.99,
    "priceCurrency": "USD",
    "availabilityStarts": "2018-04-01T11:01:00-04:00",
    "availabilityEnds": "2018-06-30T23:59:00-04:00",
    "eligibleRegion": {
      "@type": "Country",
      "name": "US"
    }
  }
}
```

具有多个 `EntryPoint` 属性的 `ReadAction` 示例：

```
"potentialAction": {
  "@type": "ReadAction",
  "target": [
    {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/purchase?bookId=170",
      "actionPlatform": [
        "https://schema.org/DesktopWebPlatform"
      ]
    },
    {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/mobile/purchase?bookId=170",
      "actionPlatform": [
        "https://schema.org/AndroidPlatform",
        "https://schema.org/IOSPlatform"
      ]
    }
  ],
  "expectsAcceptanceOf": [
    {
      "@type": "Offer",
      "category": "noLoginRequired",
      "availabilityStarts": "2018-04-01T11:01:00-04:00",
      "availabilityEnds": "2018-06-30T23:59:00-04:00",
      "eligibleRegion": [
        {
          "@type": "Country",
          "name": "US"
        },
        {
          "@type": "Country",
          "name": "GB"
        }
      ]
    },
    {
      "@type": "Offer",
      "category": "Subscription",
      "availabilityStarts": "2018-04-01T11:01:00-04:00",
      "availabilityEnds": "2018-06-30T23:59:00-04:00",
      "eligibleRegion": {
        "@type": "Country",
        "name": "IN"
      }
    }
  ]
}
```

### `BorrowAction` (`potentialAction`)

`potentialAction` 属性使用 `BorrowAction` 实体。 `BorrowAction` 定义了可访问图书的深层链接、有图书存货的图书馆，以及用户必须满足的条件。条件可能包括会员资格状态、登录状态、位置或访问图书所需的任何其他信息。

必要属性

`@type`

[`Text`](https://schema.org/Text)

设为 `BorrowAction`。

`lender`

[`LibrarySystem`](https://schema.org/LibrarySystem)

提供此版本的图书馆系统。

`lender.@id`

[`URL`](https://schema.org/URL)

`LibrarySystem` 的 ID 参考，必须在图书馆 Feed 中单独进行全面说明。

`lender.@type`

[`Text`](https://schema.org/Text)

设为 `LibrarySystem`。

`target`

[`EntryPoint`](https://schema.org/EntryPoint)

深层链接的规范，其中包括受支持平台的信息。要为不同平台集合定义深层链接，请指定 `EntryPoint` 数组。

此属性可以重复。

`target.@type`

[`Text`](https://schema.org/Text)

设为 `EntryPoint`。

`target.actionPlatform`

[`Text`](https://schema.org/Text)

该深层链接的适用平台。请使用以下某个值：

- `https://schema.org/DesktopWebPlatform`
- `https://schema.org/AndroidPlatform`
- `https://schema.org/IOSPlatform`

此属性可以重复。

`target.urlTemplate`

[`URL`](https://schema.org/URL)

可将用户直接转到图书着陆页内容的链接。

`BorrowAction` 示例：

```
"potentialAction": {
  "@type": "BorrowAction",
  "lender": {
    "@type": "LibrarySystem",
    "@id": "https://example.com/librarySystem/100"
  },
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://example.com/borrow?bookId=170",
    "actionPlatform": [
      "https://schema.org/DesktopWebPlatform",
      "https://schema.org/AndroidPlatform",
      "https://schema.org/IOSPlatform"
    ]
  }
}
```

具有多个 `EntryPoint` 属性的 `BorrowAction` 示例：

```
"potentialAction": {
  "@type": "BorrowAction",
  "lender": {
    "@type": "LibrarySystem",
    "@id": "https://example.com/librarySystem/100"
  },
  "target": [
    {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/borrow?bookId=170",
      "actionPlatform": [
        "https://schema.org/DesktopWebPlatform"
      ]
    },
    {
      "@type": "EntryPoint",
`      "urlTemplate": "https://example.com/mobile/borrow?bookId=170",
      "actionPlatform": [
        "https://schema.org/AndroidPlatform",
        "https://schema.org/IOSPlatform"
      ]
    }
  ]
}
```

### `Library` 实体

[schema.org/Library](https://schema.org/Library) 提供了 `Library` 的完整定义，而您只需考虑以下属性。您必须为要添加到 Feed 中的每个图书馆定义必需的属性。您还可定义建议的属性，以便添加与您的内容相关的更多信息，进而提供更好的用户体验。

此 `Library` 实体是顶级 `Library` 实体类型。它是一个抽象结构，由 `LibrarySystem` 实体和该 `LibrarySystem` 的每个较低级别的 `Library (member)` 实体组成。

`Library` Feed 与 `Book` Feed 不同。因此，您可能实现的任何 `Library` Feed 都必须与 `Book` Feed 完全分开。 有关详情，请参阅[创建 Feed](#create-your-feed)。

**要点**：阅读[图书馆系统和图书馆成员](#library-systems-and-library-members)指南，了解您的实现中顶级 `Library` 实体、`LibrarySystem` 实体和较低级别的 `Library` 实体之间的区别。

#### LibrarySystem

`LibrarySystem` 实体代表一个图书馆成员协作网络。**

**要点**：阅读[图书馆系统和图书馆成员](#library-systems-and-library-members)指南，了解您的实现中顶级 `Library` 实体、`LibrarySystem` 实体和较低级别的 `Library` 实体之间的区别。

必要属性

 `@context`

 `[Text](https://schema.org/Text)`

设为 `https://schema.org`。

 `@id`

 `[URL](https://schema.org/URL)`

图书馆系统的全局唯一 ID，采用网址格式。该 ID 必须保持稳定，不应随着时间的推移而发生变化。它被视为不透明字符串，且不必是有效链接。用于 `@id` 值的网域必须归您的组织所有。

 `@type`

 `[Text](https://schema.org/Text)`

设为 `LibrarySystem`。

 `additionalProperty`

 `[PropertyValue](https://schema.org/PropertyValue)`

用于指明图书馆类型的额外属性。

 `additionalProperty.@type`

 `[Text](https://schema.org/Text)`

设为 `PropertyValue`。

 `additionalProperty.name`

 `[Text](https://schema.org/Text)`

设为 `librarytype`。

 `additionalProperty.value`

 `[Text](https://schema.org/Text)`

图书馆的类型。请使用以下某个值：

- `public`
- `academic`
- `corporate`
- `government`
- `school`
- `special`

 `member`

 `[Library](https://schema.org/Library)`

图书馆系统的成员。

 `name`

 `[Text](https://schema.org/Text)`

图书馆系统的名称。例如 `The Southwestern League of Libraries`。

 `url`

 `[URL](https://schema.org/URL)`

介绍或说明图书馆系统的网址。Google 搜索使用该链接匹配 Feed 中的内容与 Google 数据库中的内容。对于实际着陆页，Google 搜索会使用 `workExample.target.urlTemplate` 中提供的网址。

#### `Library` (`member`)

`LibrarySystem` 实体的 `member` 属性使用 `Library (member)` 实体。 `Library (member)` 代表特定图书馆系统的单个图书馆成员。****

**要点**：阅读[图书馆系统和图书馆成员](#library-systems-and-library-members)指南，了解您的实现中顶级 `Library` 实体、`LibrarySystem` 实体和较低级别的 `Library` 实体之间的区别。

必要属性

 `@id`

 `[URL](https://schema.org/URL)`

图书馆分支的全局唯一 ID，采用网址格式。该 ID 必须保持稳定，不应随着时间的推移而发生变化。它被视为不透明字符串，且不必是有效链接。用于 `@id` 值的网域必须归您的组织所有。

 `@type`

 `[Text](https://schema.org/Text)`

设为 `Library`。

 `location`

 `[PostalAddress](https://schema.org/PostalAddress)`

图书馆分支的街道地址。并非所有属性都适用于所有国家/地区。您必须根据图书馆地址添加尽可能多的适用属性。

美国 `location` 示例：

```
{
  "@type": "Library",
  "@id": "https://example.com/library-branches/1001",
  "name": "Campbell Library",
  "location": {
    "@type": "PostalAddress",
    "streetAddress": "77 Harrison Ave",
    "addressLocality": "Campbell",
    "addressRegion": "CA",
    "postalCode": "95008",
    "addressCountry": "US"
  }
}
```

日本 `location` 示例：

```
{
  "@type": "Library",
  "@id": "https://example.com/library-branches/1003",
  "name": "Tokyo Metropolitan Central Library",
  "location": {
    "@type": "PostalAddress",
    "streetAddress": "７-13-5 Minamiazabu, Minato City",
    "addressLocality": "Tokyo",
    "postalCode": "106-0047",
    "addressCountry": "JP"
  }
}
```

 `location.@type`

 `[Text](https://schema.org/Text)`

设为 `PostalAddress`。

 `location.addressCountry`

 `[Text](https://schema.org/Text)`

国家/地区代码，采用 [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) 格式。例如 `US`。

 `location.addressLocality`

 `[Text](https://schema.org/Text)`

地点。例如 `Mountain View`。

 `location.addressRegion`

 `[Text](https://schema.org/Text)`

地区。例如 `CA`。

 `location.postalCode`

 `[Text](https://schema.org/Text)`

邮政编码。例如 `94043`。

 `location.streetAddress`

 `[Text](https://schema.org/Text)`

街道地址。例如 `1600 Amphitheatre Pkwy`。

 `name`

 `[Text](https://schema.org/Text)`

图书馆分支的名称。

### 示例 `LibrarySystem` Feed JSON 文件

```
{
   "@context": "https://schema.org",
   "@type":"LibrarySystem",
   "@id":"https://example.com/library-systems/100",
   "name":"Santa Clara County Library District",
   "additionalProperty":[
      {
         "@type":"PropertyValue",
         "name":"librarytype",
         "value":"public"
      }
   ],
   "member":[
      {
         "@type":"Library",
         "@id":"https://example.com/library-branches/1001",
         "name":"Campbell Library",
         "location":{
            "@type":"PostalAddress",
            "streetAddress":"77 Harrison Ave",
            "addressLocality":"Campbell",
            "addressRegion":"CA",
            "postalCode":"95008",
            "addressCountry":"US"
         }
      },
      {
         "@type":"Library",
         "@id":"https://example.com/library-branches/1002",
         "name":"Gilroy Library",
         "location":{
            "@type":"PostalAddress",
            "streetAddress":"350 W 6th St",
            "addressLocality":"Gilroy",
            "addressRegion":"CA",
            "postalCode":"95020",
            "addressCountry":"US"
         }
      }
   ]
}
```

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-02-20。
