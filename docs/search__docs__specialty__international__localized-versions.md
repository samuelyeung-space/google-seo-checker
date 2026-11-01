---
title: "将网页的本地化版本告知 Google"
source: https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh_CN
slug: search__docs__specialty__international__localized-versions
path: /search/docs/specialty/international/localized-versions
---

# 将网页的本地化版本告知 Google

> 来源: https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 将网页的本地化版本告知 Google

如果您的某个网页针对不同语言或区域提供了多个版本，请将这些不同变体告知 Google。这样一来，Google 搜索便可按语言或区域将想访问您网页的用户引导至最恰当的版本。

请注意，即使您没有采取上述措施，Google 仍可能会找到您网页的其他语言版本，但通常还是建议您明确指明您针对特定语言或区域提供的网页。

下面是一些建议指明备用网页的示例情形：

- **用单一语言显示网页的主要内容**，**只翻译了模板部分**，例如导航和页脚部分。以用户生成的内容为主的网页（如论坛）通常会采取这种做法。
- 网页用单一语言为不同区域的用户提供相似的内容，且内容的**区域性差异非常细微**。例如，您可能会有面向美国、英国、爱尔兰用户提供的英语内容。
- 网站内容已**完全翻译成多种语言**。例如，您的每个网页都有德语版本和英语版本。

如果网页的主要内容未经翻译，则该网页的本地化版本仅会被视为它的[重复网页](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)。

## 指明备用网页的方法

您可通过以下三种方式向 Google 指明某个网页的多个语言/语言区域版本：

- [HTML](#html)
- [HTTP 标头](#http)
- [站点地图](#sitemap)

 从 Google 的角度来看，这三种方法是等效的，您可以选择最适合您网站的方法。虽然您可以同时使用这三种方法，但不会对网页在 Google 搜索中的表现带来任何好处（事实上，与仅选择一种实现相比，管理三种实现要困难得多）。

 使用 `hreflang` 告知 Google 您的内容变体，以便我们了解这些网页是相同内容的本地化变体。Google 不会使用 `hreflang` 或 HTML `lang` 属性检测网页的语言；我们会使用算法来确定网页的语言。

### 针对所有方法的准则

- 每个语言版本都必须列出其自身**以及**所有其他语言版本。
- 备用网页的网址必须是完全限定的网址，包括传输方法 (http/https)，例如：
 `https://example.com/foo`，**而不是**`//example.com/foo` 或 `/foo`
- 备用网页的网址无需位于同一个网域中。
-  如果您有多个备用网址，分别面向使用相同语言但位于不同语言区域的用户，那么您最好也为使用该语言但地理位置不明的用户提供一个通用网址。例如，如果您为爱尔兰 (`en-IE`)、加拿大 (`en-CA`) 和澳大利亚 (`en-AU`) 地区的英语用户提供了特定网址，则为美国、英国和所有其他英语区域的搜索用户提供一个通用英语版 (`en`) 网页。您也可以从您的诸多特定网页中选择一个作为通用网页。
- 如果两个网页没有互指，系统将会忽略相关标记。这是为了确保另一网站上的某个用户无法随意通过创建一个标记将该网站指定为您的某个网页的备用版本。
- 如果您很难为每种语言分别维护一套完整的双向链接，则可在部分网页上省略一些语言；Google 仍会处理那些互指的网页。但是，请务必在新增的语言网页和源语言/主要语言网页之间建立双向链接。例如，如果您最初用法语创建了网站，并采用了 `.fr` 网址，那么当您新增面向墨西哥 (`.mx`) 和西班牙 (`.es`) 的网页后，应该优先将这两个新网页和曝光率很高的 `.fr` 网页双向链接起来，而不是在这两个新增的西班牙语变体网页（`.mx` 和 `.es`）之间建立双向链接。
- 请考虑为不匹配的语言添加后备网页，尤其是在语言/国家/地区选择器中或是在会自动重定向的首页上。请使用 [`x-default` 值](#xdefault)：
 `<link rel="alternate" href="https://example.com/" hreflang="x-default" />`

### HTML 标记

 您可以通过在网页标头中添加 `<link rel="alternate" hreflang="lang_code"... >` 元素，将网页的所有语言和区域变体告知 Google。如果您没有站点地图或无法为您的网站指定 HTTP 响应标头，此方法非常有用。

 对于网页的每个变体，请在 `<head>` 元素中添加一组 `<link>` 元素，并使每个网页变体（**包括网页自身**）分别对应一个链接。网页的每个版本中，这组链接都应是相同的。[查看其他准则。](#all-method-guidelines)

以下是每个 `link` 元素的语法：

```
<link rel="alternate" hreflang="[lang_code](#language-codes)" href="url_of_page" />
```

语法

`lang_code`

此网页版本所针对的[受支持的语言/区域代码](#language-codes)，或 `x-default`（以与该网页上的 `hreflang` 标记未明确列出的任何语言匹配）。

`url_of_page`

 此网页的特定语言/区域版本对应的完全限定网址。

 `<link>` 标记必须位于[格式正确的 HTML `<head>` 部分](https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata?hl=zh-cn)内。如果不确定，请将所渲染的网页中的代码粘贴到 [HTML 验证工具](https://validator.w3.org/)中，确保链接位于 `<head>` 元素内。 此外，请勿在 `link` 标记中组合使用属性，以表示文档的其他表示法；例如，不要在单个 `<link>` 标记中组合使用 `hreflang` 注解与 `media` 等其他属性。

#### 示例

例如，Widgets, Inc 有一个面向美国、英国和德国境内用户的网站。以下网址包含的内容大致相同，但具有区域性差异：

具有区域性差异的网址

`https://en.example.com/page.html`

通用英语版首页，包含与从美国运至全球各地的运费相关的信息。

`https://en-gb.example.com/page.html`

英式英语版首页，显示以英镑为单位的价格。

`https://en-us.example.com/page.html`

美式英语版首页，显示以美元为单位的价格。

`https://de.example.com/page.html`

德语首页。

`https://www.example.com/`

不针对任何语言或语言区域的默认页；它具有选择器，供用户选择自己的语言和区域。

请注意，Google 不会根据这些网址中针对特定语言的子网域（`en`、`en-gb`、`en-us`、`de`）确定网页的目标受众群体；您必须将网页明确地关联到对应的目标受众群体。

上方[“具有区域性差异的网址”表格](#regional-variations-table)中列出的所有网页的 `<head>` 部分中都包含以下 HTML 代码。这会将美式英语、英式英语、通用英语和德语用户引导至对应的本地化网页，并将所有其他用户引导至通用首页。Google 搜索会根据用户的浏览器设置为他们返回适当的结果。

```
<head>
 <title>Widgets, Inc</title>
  <link rel="alternate" hreflang="en-GB"
       href="https://en-gb.example.com/page.html" />
  <link rel="alternate" hreflang="en-US"
       href="https://en-us.example.com/page.html" />
  <link rel="alternate" hreflang="en"
       href="https://en.example.com/page.html" />
  <link rel="alternate" hreflang="de"
       href="https://de.example.com/page.html" />
 <link rel="alternate" hreflang="x-default"
       href="https://www.example.com/" />
</head>
```

### HTTP 标头

您可以返回包含网页 GET 响应的 [HTTP 标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)，以将相应网页的所有语言和区域变体告知 Google。这种方法对非 HTML 文件（如 PDF）很有用。

标头格式如下：

```
Link: <url1>; rel="alternate"; hreflang="[lang_code_1](#language-codes)", <url2>; rel="alternate"; hreflang="[lang_code_2](#language-codes)", ...
```

语法

`<url_x>`

备用网页的完全限定网址，与分配给关联的 `hreflang` 属性的语言区域字符串对应。该网址必须位于 `<` 和 `>` 标记中。**示例**：`<https://www.google.com>`

`lang_code_x`

此网页版本所针对的[受支持的语言/区域代码](#language-codes)，或 `x-default`（以与该网页上的 `hreflang` 标记未明确列出的任何语言匹配）。

您必须为网页的每个版本（**包括请求的版本**）分别指定一组用英文逗号分隔的 `<url>`、`rel="alternate"` 和 `hreflang` 值，如下例所示。网页的每个版本所返回的 `Link:` 标头都应相同。[查看其他准则。](#all-method-guidelines)

#### 示例

下面是一个具有 3 个 PDF 文件版本的网站返回的 `Link:` 标头示例，这三个版本分别面向英语用户、瑞士境内的德语用户以及所有其他德语用户：

```

Link: <https://example.com/file.pdf>; rel="alternate"; hreflang="en",
      <https://de-ch.example.com/file.pdf>; rel="alternate"; hreflang="de-CH",
      <https://de.example.com/file.pdf>; rel="alternate"; hreflang="de"
```

### 站点地图

 您可以使用 [XML 站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=zh-cn)将每个网址的所有语言和区域变体告知 Google。为此，请添加一个指定单个网址的 `<loc>` 元素，其中的子 `<xhtml:link>` 条目应列出该网页的每种语言/语言区域变体（包括网页自身）。因此，如果某个网页有 3 个版本，那么站点地图中会有每个版本对应的网址条目，并且每个条目都包含 3 个相同的子条目。

**站点地图规则：**

-  按如下方式指定 xhtml 命名空间：

```
xmlns:xhtml="http://www.w3.org/1999/xhtml"
```

-  为每个网址分别创建一个单独的 `<url>` 元素，这与任何其他站点地图一样。
- 每个 `<url>` 元素都必须包含一个指明网页网址的 `<loc>` 子元素。
-  每个 `<url>` 元素都必须包含一个子元素 `<xhtml:link rel="alternate" hreflang="[supported_language-code](#language-codes)">`，其中应列出网页的每个备用版本（**包括网页自身**）。这些子 `<xhtml:link>` 元素的顺序无关紧要，但您不妨让它们保持相同的顺序，以方便您检查错误。子元素不会计入站点地图的网址上限计数。
-  将站点地图上传到您网站上可应用该站点地图的目录。请注意，站点地图只能包含托管站点地图的目录的后代网址。
- 我们的[站点地图文档](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn)也适用于站点地图扩展。请务必遵循[站点地图常规指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn#general-guidelines)。
- [查看其他准则。](#all-method-guidelines)

#### 示例

下面是一个以全球英语用户为目标用户的英语版网页，此网页有两个等效版本，分别面向全球的德语用户和瑞士境内的德语用户。网站中的所有网址如下所示：

- `www.example.com/english/page.html` 以英语用户为目标用户。
- `www.example.de/deutsch/page.html` 以德语用户为目标用户。
- `www.example.de/schweiz-deutsch/page.html` 以瑞士境内的德语用户为目标用户。

以下是这 3 个网页的站点地图：

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.example.com/english/page.html</loc>
    <xhtml:link
               rel="alternate"
               hreflang="de"
               href="https://www.example.de/deutsch/page.html"/>
    <xhtml:link
               rel="alternate"
               hreflang="de-CH"
               href="https://www.example.de/schweiz-deutsch/page.html"/>
    <xhtml:link
               rel="alternate"
               hreflang="en"
               href="https://www.example.com/english/page.html"/>
  </url>
  <url>
    <loc>https://www.example.de/deutsch/page.html</loc>
    <xhtml:link
               rel="alternate"
               hreflang="de"
               href="https://www.example.de/deutsch/page.html"/>
    <xhtml:link
               rel="alternate"
               hreflang="de-CH"
               href="https://www.example.de/schweiz-deutsch/page.html"/>
    <xhtml:link
               rel="alternate"
               hreflang="en"
               href="https://www.example.com/english/page.html"/>
  </url>
  <url>
    <loc>https://www.example.de/schweiz-deutsch/page.html</loc>
    <xhtml:link
               rel="alternate"
               hreflang="de"
               href="https://www.example.de/deutsch/page.html"/>
    <xhtml:link
               rel="alternate"
               hreflang="de-CH"
               href="https://www.example.de/schweiz-deutsch/page.html"/>
    <xhtml:link
               rel="alternate"
               hreflang="en"
               href="https://www.example.com/english/page.html"/>
  </url>
</urlset>
```

## 受支持的语言和区域代码

`hreflang` 属性的值由一个或两个可选的值组成，各个值之间用短划线分隔。例如 `en-US`。`hreflang` 属性的第一个代码是语言代码（采用 [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 格式），后跟可选的第二个代码（采用 [ISO 3166-1 Alpha 2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) 格式），表示备用网址的区域代码。 系统仅支持 ISO 639-1 中列出的语言代码和 ISO 3166-1 Alpha 2 中列出的地区代码；不支持未在这些标准中列出的其他代码，例如 es-419。 `hreflang` 值不区分大小写；Google 接受小写和大写代码，但采用大写格式的区域代码（例如 `en-GB`）符合 ISO 3166-1 Alpha 2 惯例。

**警告**：您不能单独指定国家/地区代码。第一个代码代表语言，Google 不会自动从国家/地区代码中推出语言。

 要定位到比利时的其他语言用户，您可以使用以下语言和地区代码：

-  **良好（面向比利时用户的德语内容）**：`de-BE`
-  **合适（面向比利时用户的荷兰语内容）**：`nl-BE`
-  **合适（面向比利时用户的法语内容）**：`fr-BE`
-  **不合适，因为第一个代码是语言代码（`be` 是白俄罗斯语代码）**：`be`

要简化标记，您可以单独指定语言代码。例如：

- `de`：德语内容，不限区域
- `en-GB`：英语内容，面向英国境内的用户
- `de-ES`：德语内容，面向西班牙境内的用户

**如果语言有多种文字变体**，系统会根据国家/地区推断出适当的文字。例如，当针对台湾用户使用 `zh-TW` 时，系统会自动推断出语言文字（在此示例中，即中文 - 繁体）。您也可利用 [ISO 15924](https://unicode.org/iso15924/iso15924-codes.html) 明确指定文字，例如：

- `zh-Hant`：中文（繁体）
- `zh-Hans`：中文（简体）

 与其他语言代码一样，您也可以指定可选区域。例如，使用 `zh-Hans-US` 为美国用户指定中文（简体）。

### 针对不匹配的语言使用 `x-default` 值

 当任何其他语言/区域都与用户的浏览器设置不匹配时，系统会使用保留值 `x-default`。如果用户的语言设置与您网站的任何本地化版本均不匹配，那么建议您使用此值来指定后备页面。虽然 `x-default` 值可以用于任何网页，但它是专为语言选择器网页设计的，因此最适合这些网页。

 无需为 `x-default` 值指定语言代码；相应网页针对的是其浏览器设置的语言与您网站使用的语言不匹配的用户，因此网页所用的语言无关紧要。

 如需实现 `hreflang="x-default"` 注解，请再向现有的 `hreflang` 注解添加一个 `link` 标记，并将 `href` 属性设置为您希望用户到达的网址（如果您的网站不支持用户的语言）。例如，HTML 实现可能如下所示：

```
<link rel="alternate" href="https://example.com/en-gb" hreflang="en-GB" />
<link rel="alternate" href="https://example.com/en-us" hreflang="en-US" />
<link rel="alternate" href="https://example.com/en-au" hreflang="en-AU" />
**<link rel="alternate" href="https://example.com/country-selector" hreflang="x-default" />**
```

## 问题排查

### 常见错误

下面列出了使用 `hreflang` 时最常见的错误：

-  **缺少返回链接**：如果网页 X 链接到网页 Y，那么网页 Y 必须要链接回网页 X。如果所有使用 `hreflang` 注解的网页并未全部满足这项要求，系统可能会忽略或无法正确解译这些注解。例如，看看 `https://de.example.com/index.html` 上的这个链接：

```
<link rel="alternate" hreflang="en-GB" href="https://en-gb.example.com/index.html" />
```

 您还必须在 `https://en-gb.example.com/index.html` 上提供指向该内容 `de` 版本的 `hreflang` 链接：

```
<link rel="alternate" hreflang="de" href="https://de.example.com/index.html" />
```

- **语言代码不正确**：确保您使用的所有语言代码均标识出备用网址的语言（以 ISO 639-1 格式表示）和区域（可选，以 ISO 3166-1 Alpha 2 格式表示）。仅指定区域是无效的。
-  **区域代码不正确**：请确保您针对要标识的区域使用官方分配的代码元素（采用 [ISO 3166-1 Alpha 2 格式](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)）。 如果您使用的是列为为其他用途预留的代码，Google 搜索会忽略该注解部分（例如，在 `hreflang` 注释中使用 `EU`、`UN` 或 `UK` 不会对 Google 搜索产生影响）。

### 调试 `hreflang` 错误

 您可以利用多种第三方工具调试 `hreflang` 注释。下面列出了一些热门的工具。这些工具不是由 Google 维护或检查的。

-  [Aleyda Solis 的 `hreflang` 标记生成器工具](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)，可生成或修改 `hreflang` 标记。
- [Merkle SEO `hreflang` 标记测试工具](https://technicalseo.com/seo-tools/hreflang/)，可验证单个实际网页上的 `hreflang` 标记。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-09-23。
