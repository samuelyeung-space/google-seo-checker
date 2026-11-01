---
title: "与 Google 分享商品数据"
source: https://developers.google.com/search/docs/specialty/ecommerce/share-your-product-data-with-google?hl=zh_CN
slug: search__docs__specialty__ecommerce__share-your-product-data-with-google
path: /search/docs/specialty/ecommerce/share-your-product-data-with-google
---

# 与 Google 分享商品数据

> 来源: https://developers.google.com/search/docs/specialty/ecommerce/share-your-product-data-with-google?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 与 Google 分享商品数据

 为了让您的商品更有机会[在更多 Google 平台上以更丰富的功能呈现](https://developers.google.com/search/docs/specialty/ecommerce/where-ecommerce-data-can-appear-on-google?hl=zh-cn)，使您的网站获得更多相关流量，您可以与 Google 分享您的电子商务商品数据。为了充分利用这些好处，Google 建议您执行以下操作：

-  **在您网站的商品页面中添加结构化数据**。 详细了解[向网页添加结构化数据](#add-structured-data)的好处。
-  通过将 Feed 上传到 [Google Merchant Center](https://support.google.com/merchants/answer/188924?hl=zh-cn)，**直接告知 Google 您想在 Google 上展示哪些商品**。Google Merchant Center 是一项 Google 服务，可让您更深入地了解商务数据。 详细了解 [Google Merchant Center 的优势](#upload-product-data)。

##  向网页添加商品结构化数据

 请在可行的情况下，向商品页面添加结构化数据。虽然结构化数据不是在 Google 搜索结果中显示内容的必要条件，但它有助于 Google 更好地了解您的网页，并将其显示为富媒体搜索结果。例如：

-  结构化数据有助于您的商品符合显示为[商品富媒体搜索结果](https://developers.google.com/search/docs/appearance/structured-data/product?hl=zh-cn)的条件。
-  结构化数据有助于 Google 更准确地了解网页上的内容（例如价格、折扣和运费），这也有助于提高 Google Merchant Center 针对您的网站进行商品 Feed 验证的准确性。

 准备好开始实施了吗？如需了解详情，请参阅[包含与电子商务有关的结构化数据](https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce?hl=zh-cn)。

 Google 有时可能会采用其他方法从网页中提取数据。如果您希望明确告知 Google 不要使用网页上的内容生成摘要，请向该 HTML 元素添加 [`data-nosnippet` 属性](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn#data-nosnippet-attr)。

##  将数据上传到 Google Merchant Center

 虽然将商品数据上传到 Google Merchant Center 并不是让商品显示在 Google 搜索结果中的必要条件，但这样做有助于 Google 了解您的商品。对于某些 Google 平台（例如“Google 购物”标签页中的商品详情），参与 Google Merchant Center 是一项强制性要求。

**什么是商品数据？**商品数据描述了商品的各种属性，例如名称、说明、颜色、价格和库存状况。

 对于更新频率较低的小型网站，您可以使用[自动 Feed 来根据已抓取的网络内容构建商品数据](https://support.google.com/merchants/answer/7538732?hl=zh-cn)，而结构化数据有助于提高数据提取的准确性。此外，这种方法也可以减轻您的起始工作量。

 对于大型网站或内容经常变化的网站，请定期[将新的数据 Feed 文件上传到 Google Merchant Center](https://support.google.com/merchants/answer/188477?hl=zh-cn)（如需立即更新，请使用 [Content API](https://developers.google.com/shopping-content/guides/quickstart?hl=zh-cn)）。这样，您就可以更好地控制在 Google 中的数据了。上传 Feed 文件的好处包括：

-  **对 Google 已了解您的所有商品更有把握**。 我们无法保证网络抓取能够找到您网站上的所有商品。
-  **更好地控制更新的时间**。 Google 不能保证通过抓取处理您网站上的更改需要多长时间。Feed 可以让您自行决定更新时间，可以每周、每日甚至每小时更新一次。Content API 允许即时内容更新，这对于库存级更新特别有用。
-  **分享您的网站上不存在的数据**。 如果您认为部分信息不适合添加到您的网站上，例如实体店级库存数据，您可以使用 Feed 和 Content API 与 Google 分享此数据，而无需在网站上显示此数据。

 详细了解如何[注册 Google Merchant Center](https://support.google.com/merchants/answer/188924?hl=zh-cn)。

## Google 如何使用结构化数据和 Google Merchant Center 数据

 以下示例说明了 Google 如何使用网页中嵌入的结构化数据以及 Google Merchant Center 数据来实现不同的体验。请注意，具体体验可能会因国家/地区、设备和其他因素而异。

体验

结构化数据

Google Merchant Center

**Google 搜索中的商品富媒体搜索结果**

Google 搜索使用[商品结构化数据](https://developers.google.com/search/docs/appearance/structured-data/product?hl=zh-cn)来显示商品富媒体搜索结果。

Google 搜索可能会使用 Google Merchant Center 数据来显示商品富媒体搜索结果。

**包含商品注解的 Google 图片搜索结果**

Google 图片使用[商品结构化数据](https://developers.google.com/search/docs/appearance/structured-data/product?hl=zh-cn)在图片上显示商品注解。

Google 图片会使用 Google Merchant Center 中列出的图片。

**“Google 购物”标签页**

在某些情况下（例如数据验证期间），添加结构化数据对 Google Merchant Center 有帮助。

您必须参与 Google Merchant Center，您的商品才能出现在“Google 购物”标签页中。

**Google 智能镜头图片搜索结果**

Google 智能镜头会使用[图片结构化数据属性](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn#images)（如果有）。

Google 图片会使用 Google Merchant Center 中列出的图片。

##  解决更新延迟问题

 如果 Google 合并您的网站和 Google Merchant Center Feed 中的数据，则可能会因延迟而导致数据不一致问题。例如，如果某件商品售罄，您的网站通常会立即将其标记为无法购买，但 Google Merchant Center 可能过一段时间才会更新，尤其是在您使用 Feed 时。

 为避免价格和库存状况数据发生这种潜在冲突（这是导致同步问题的一种常见原因），请在发现此类差异时，告知 Google Merchant Center 根据网站内容[自动更新您的商品数据副本](https://support.google.com/merchants/answer/3246284?hl=zh-cn)。

 如需详细了解 Googlebot 和 Google Merchant Center 如何协同工作，请参阅搜索中心闪电秀系列讲座中的[如何让您的商品出现在 Google 搜索中](https://www.youtube.com/watch?v=UQtdv_hoGuM&hl=zh-cn)讲座。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
