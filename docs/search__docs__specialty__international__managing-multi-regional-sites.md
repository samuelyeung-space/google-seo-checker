---
title: "管理多区域网站和多语言网站"
source: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites?hl=zh_CN
slug: search__docs__specialty__international__managing-multi-regional-sites
path: /search/docs/specialty/international/managing-multi-regional-sites
---

# 管理多区域网站和多语言网站

> 来源: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 管理多区域网站和多语言网站

如果您的网站以多种语言面向不同国家/地区或区域的用户提供不同的内容，您可以优化您网站的 Google 搜索结果。

##  多语言和多区域有何区别？

- **多语言网站是指使用多种语言提供内容的网站。例如，一家加拿大企业同时提供了英语版本和法语版本的网站。 Google 搜索会尝试查找与搜索用户的语言匹配的网页。
- **多区域网站是指明确地以不同国家/地区的用户为目标受众的网站。例如，一家产品制造商同时向加拿大和美国出售货物。 Google 搜索会尝试查找与搜索用户的语言区域匹配的网页。

有些网站既属于多区域网站，又属于多语言网站。例如：某个网站可能向美国用户和加拿大用户提供了不同版本，而该网站上面向加拿大用户呈现的内容又同时提供了英语版本和法语版本。

## 管理网站的多种语言版本

如果您的网站上有以多种语言提供的相同内容，请参阅以下提示，了解如何帮助用户（和 Google 搜索）找到正确的网页：

### 对不同的语言版本使用不同的网址

Google 建议对每种语言版本的网页使用不同的网址，而不是使用 Cookie 或浏览器设置来调整网页上的内容语言。

如果您对不同的语言版本使用不同的网址，请使用 [`hreflang` 注释](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)来帮助 Google 搜索结果链接到网页的正确语言版本。

如果您希望根据语言设置动态更改内容或重新路由用户，则**请注意，Google 可能无法找到并抓取您的所有变体版本**。这是因为，Googlebot 抓取工具通常来自美国。另外，该抓取工具在发送 HTTP 请求时并不会在请求标头中设置 `Accept-Language`。

### 将不同语言版本告知 Google

[Google 支持使用多种不同的方法为网页的语言或区域变体添加标签](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)，包括 `hreflang` 注释和站点地图。请以适当的方式标记您的网页。

### 确保网页语言显而易见

Google 会依据网页的可见内容确定网页的语言。我们不会通过任何代码级语言信息（例如 `lang` 属性）或网址判断语言。您只需确保各网页的内容和导航元素都使用同一种语言，且避免原文和译文并行显示，就能帮助 Google 正确地确定网页语言。

如果仅翻译网页的样板文字，而以同一种语言显示网页的大部分内容（这种情况在包含用户生成的内容的网页中经常出现），则可能会导致同样的内容以不同的样板语言重复显示在搜索结果中，令用户体验大打折扣。

### 让用户切换网页语言

如果您的某个网页有多个版本：

- **避免自动将用户从网站的一个语言版本重定向**到网站的另一个语言版本。例如，不要根据您认为用户可能会使用的语言来重定向。这些重定向可能会阻止用户（和搜索引擎）浏览网站的所有版本。
- **不妨考虑添加超链接以指向该网页的其他语言版本**。这样，用户便可通过点击超链接选择网页的另一语言版本。

### 使用指定特定语言的网址

您可以在网址中使用已本地化的字词，或使用[国际化域名 (IDN)](https://en.wikipedia.org/wiki/Internationalized_domain_name)。但是，请务必确保网址使用了 UTF-8 编码（实际上，我们建议尽可能使用 UTF-8），并在链接至这些网址时对其进行正确转义。

## 将网站内容定位到特定国家/地区（地理位置定位）

您可将整个网站或其中的部分内容定位到某个特定国家/地区境内说某种特定语言的用户。这样可以提高网页在目标国家/地区的排名，但目标用户将无法看到以其他语言区域或语言显示的结果。

如需在 Google 上**对网站进行地理位置定位**，请执行以下操作：

- **网页级或网站级**：[对网站或网页使用基于语言区域的网址](#locale-specific-urls)。
- **网页级**：[使用 `hreflang` 或站点地图](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)告知 Google 哪些网页适用于哪些地理位置或语言。

请注意，地理位置定位并不能做到完全精确，因此，应考虑到用户可能会访问您网站的“错误”版本。一种可解决此问题的方法是：在所有网页上显示各个语言版本的链接，以便用户选择自己的区域和/或语言。

**请勿使用 IP 分析来调整内容。**IP 位置分析难以实施，并且通常并不可靠。此外，Google 可能无法正确抓取网站变体。大多数（但不是全部）Google 抓取都来自美国，并且我们不会试图改变位置信息以检测网站变体。请使用以下任一显式方法：`hreflang`、备用网址和显式链接。

### 使用基于语言区域的网址

请考虑使用一种便于将您的整个网站或其中的部分内容定位到不同地理区域的网址结构。下表介绍了可用的选项：

 网址结构选项

**针对特定国家/地区的网域**

 `example.de`

**优点**：

- 地理位置定位明确
- 与服务器位置无关
- 便于区分网站

**缺点**：

- 价格昂贵（并且可能存在使用限制）
- 需有更多基础架构
- ccTLD 要求严格（有时）
- 只能定位到一个国家/地区

**使用 gTLD 的子网域**

 `de.example.com`

**优点**：

- 易于设置
- 允许使用不同的服务器位置
- 便于区分网站

**缺点**：

- 用户可能无法根据网址本身确定地理位置定位（“de”代表的是语言还是国家/地区？）

**使用 gTLD 的子目录**

 `example.com/de/`

**优点**：

- 易于设置
- 维护费用低（同一主机）

**缺点**：

- 用户可能无法根据网址本身确定地理位置定位
- 只有一个服务器位置
- 更难以区分网站

**网址参数**

 `site.com?loc=de`

 不推荐

**缺点**：

- 很难根据网址进行细分
- 用户可能无法根据网址本身确定地理位置定位

### Google 如何确定目标语言区域？

Google 会根据众多因素确定网页的最佳目标受众群体：

-  **国家/地区代码一级的顶级域名** (ccTLD)。这些域名都与特定的国家/地区相关联（例如，.de 代表德国，.cn 代表中国），因此可以明确告知用户和搜索引擎，您的网站是专门面向特定国家/地区的。某些国家/地区会对哪些用户可以使用 ccTLD 加以限制，因此请务必先调查清楚。我们也会将某些个性化 ccTLD（例如 .tv 和 .me）视为 gTLD，因为我们发现，用户和网站所有者经常会认为这些域名比定位到具体国家/地区的域名更通用。请参阅 [Google 的 gTLD 列表](#generic-domains)。
-  [**`hreflang` 语句**](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)，无论是在标记、标头还是站点地图中。
-  **服务器位置（通过服务器的 IP 地址判断）。**服务器的实际位置通常位于用户附近，因此可在某种程度上反映网站的目标受众。不过，由于某些网站使用的是分布式内容分发网络 (CDN)，或者在拥有较好的网络服务器基础架构的国家/地区进行托管，因此服务器的位置并不能作为一种可靠的线索。
-  **其他线索。**有关网站目标受众群体的其他线索来源还包括：网页上的本地地址和电话号码、所使用的本地语言和货币、来自其他本地网站的链接或来自[商家资料](https://www.google.com/business/?hl=zh-cn)的线索（如果有）。

**Google 不会做什么**：**

- Google 会从世界各地的不同地理位置抓取网页。但我们**不会**为了查找某个网页中所有可能的变体，而尝试改变对同一网站使用的抓取工具来源。因此，请务必使用本文所示的方法（例如 `hreflang` 条目、ccTLD 或显式链接）将您的网站会呈现的所有语言区域或语言变体明确告知 Google。
- Google 会**忽略**位置 `meta` 标记（例如 `geo.position` 或 `distribution`），并忽略地理位置定位 HTML 属性。

## 处理多语言/多区域网站中的重复网页

如果您在同一个多区域网站的不同网址上以同一种语言提供类似内容或重复内容（例如，如果 `example.de/` 和 `example.com/de/` 都显示类似的德语内容），则设定一个首选版本，然后使用 [`rel="canonical"` 元素](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=zh-cn)和 [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn) 标记确保向搜索用户提供正确的语言或区域网址。

### 通用顶级域名

 通用顶级域名 (gTLD) 是指未与具体地理位置关联的域名。 如果您的网站使用通用顶级域名（例如 .com、.org 或下方列出的任何域名），并想以特定地理位置的用户为目标受众，则使用上述方法之一明确地指定目标国家/地区。

Google 会将以下顶级域名视为 gTLD：

- **通用顶级域名**：Google 会将通过 IANA DNS 根区进行解析的 TLD 视为 gTLD，不过已在 ICANN 注册为[国家/地区代码一级的顶级域名](https://www.iana.org/domains/root/db) (ccTLD) 的顶级域名除外。**示例：**

  - .com
  - .org
  - .edu
  - .gov
  - 还有更多…

-  **通用区域性顶级域名**：虽然此类域名会与具体地理区域关联，但一般仍会被视为通用顶级域名（与 .com 或 .org 很相似）：

  - .eu
  - .asia

-  **通用国家/地区代码一级的顶级域名 (ccTLD)**：Google 会将某些 ccTLD（例如 .tv 和 .me）视为 gTLD，因为我们发现，用户和网站所有者经常会认为这些域名比定位到具体国家/地区的域名更通用。下面列出了这些 ccTLD（该列表可能会不时更新）。

  - .ad
  - .ai
  - .as
  - .bz
  - .cc
  - .cd
  - .co
  - .dj
  - .fm
  - .io
  - .la
  - .me
  - .ms
  - .nu
  - .sc
  - .sr
  - .su
  - .tv
  - .tk
  - .ws

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
