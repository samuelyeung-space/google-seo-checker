---
title: "如何发布新的电子商务网站"
source: https://developers.google.com/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website?hl=zh_CN
slug: search__docs__specialty__ecommerce__how-to-launch-an-ecommerce-website
path: /search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website
---

# 如何发布新的电子商务网站

> 来源: https://developers.google.com/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 如何发布新的电子商务网站

 为确保 Google 能够在您发布电子商务网站时发现该网站，我们建议您采取以下措施，向 Google 注册您的新网站：

1.  [在 Google 上验证您的网站所有权](https://support.google.com/webmasters/answer/9008080?hl=zh-cn)。
2.

[请求 Google 将您的网站编入索引](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=zh-cn)：

  -  **少量网址**：使用[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)。
  -  **大量网址**：提供[站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-cn)。

3.  [跟踪 Google 搜索对您网站的索引编制效果](https://support.google.com/webmasters/answer/7440203?hl=zh-cn)。 Google Merchant Center 可能会使用 Google 搜索索引验证和交叉检查内容。为避免出现错误的验证警告，请确保您的网站已在 Google 搜索中编入索引，并且商品可供购买。您可以使用[“网页索引编制”报告](https://support.google.com/webmasters/answer/7440203?hl=zh-cn)查看索引编制进度。
4.  如果您还拥有实体店，请[在 Google 上建立商家详情](https://developers.google.com/search/docs/appearance/establish-business-details?hl=zh-cn)。
5.  [注册 Google Merchant Center](https://support.google.com/merchants/answer/188924?ref_topic=7294166&hl=zh-cn)，以便提供更多信息，例如商品和交易说明。

**注意**：若要使您的网站显示在“Google 购物”标签页等体验中，您必须[注册 Google Merchant Center](https://support.google.com/merchants/answer/188924?ref_topic=7294166&hl=zh-cn)。 注册还可能让您的商品可以使用其他富媒体功能，例如在 Google 图片中的图片上添加商品徽章。

 此外，在发布网站时，您可能需要考虑营销问题。详细了解发布网站后立即让 Google 能够将其编入索引的各种方法的利弊。

-  [全面发布](#grand-reveal)：同时向公众和 Google 发布您的整个网站。
-  [首页发布](#home page-launch)：最初只向公众和 Google 公开网站的首页。
-  [发布网站，但不提供商品购买服务](#products-unavailable)：向公众和 Google 发布整个网站，同时将商品标记为“缺货”。
-  [软发布](#soft-launch)：提前发布整个网站，并为“正式”发布举行单独的营销活动。

##  全面发布

 一种方法是，在发布之前确保您的整个电子商务网站都无法供公众和搜索引擎访问。例如，要求输入密码才能访问网站上的网页将阻止 Google 访问您的网站，但应当允许测试人员访问您的网站，并确保网站在面向公众开放之前能正常运行。然后，您可以在您选择的时间“全面发布”网站，并同步开展其他营销活动。

 **所需的行动**：在发布后立刻按照[发布电子商务网站](#steps)的步骤操作。 这样能够让您的网站尽早出现在 Google 搜索结果中。

 **优点**

 在发布之前，您的所有内容均对外保密，这对您的营销广告系列可能会有帮助。

 **缺点**

 您的网站可能需要更长时间才能出现在 Google 搜索结果和“Google 购物”标签页中。

##  首页发布

 在发布网站时，您可以仅让 Google 能够访问您的首页。首页可以是一个占位符，用于宣布您的电子商务网站即将推出，其中包含描述商店的文字。

 **所需的行动**：提前[验证网站所有权](https://support.google.com/webmasters/answer/9008080?hl=zh-cn)，商品在网站上线后再执行[其余步骤](#steps)。

 **优点**

 通过这种方式，您可以注册商店，提高域名的知名度，并开始允许他人链接到您的网站。这也意味着，当您发布网站后，即使您的商品尚不无法购买，也可以在 Google 搜索结果中找到您的商店名称。

 **缺点**

 在发布整个网站并且 Google 能够抓取该网站并将其编入索引之前，Google 搜索和“购物”标签页中不会显示网站详细信息。

##  发布网站，但不提供商品购买服务

 您可以选择发布整个网站，但在您能够履行订单前，可以先停用购物功能。例如，您可以将商品标记为缺货。这么做可让 Google 将您的所有网站内容（包括商品）编入索引。考虑在每个网页上添加一条消息，指明网站的正式发布日期。

**注意**：请勿停用“加入购物车”功能，让用户可以先把商品加入购物车。 Google 可能会在验证最终的价格详情（包括税费和运费）时使用“加入购物车”功能。

 **所需的行动**：[执行发布电子商务网站的所有步骤](#steps)，但是在向 Google Merchant Center 提供商品数据时，使用 [`excluded_destination` 属性](https://support.google.com/merchants/answer/6324486?hl=zh-cn) 将库存标记为“无法购买”。 这么做系统就可以尽早发现任何商品数据加载验证问题，而不会在 Google 购物等平台中将您的商品显示为可购买。

 **优点**

 在您的网站发布后，很快 Google 就会将您的内容编入索引。

 **缺点**

 对客户而言，您的网站似乎已上线，但他们无法下单。我们建议您明确告诉买家网站尚未完全发布，以免客户因无法完成购买交易而感到不满。

##  软发布

 另一种方法是在网站正式发布后尽快启用网站的所有功能。 您可以日后进行营销发布。这种方法可以呈现为“抢先体验”活动，让购物者体会到他们在网站正式上线之前就已经探索了网站的优越感。

 **所需的行动**：在网站上线后，尽快执行[发布电子商务网站的所有步骤](#steps)。

 **优点**

 这种方法的优势在于简单。同样是发布整个网站，但可以通过少量用户的试用实现真实用户测试。

 **缺点**

 用户可能会在社交媒体上宣传或提及您的网站，导致在您的计划发布日之前就吸引用户注意。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-18。
