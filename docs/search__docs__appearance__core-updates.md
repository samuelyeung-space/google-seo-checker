---
title: "Google 搜索的核心更新与您的网站"
source: https://developers.google.com/search/docs/appearance/core-updates?hl=zh_CN
slug: search__docs__appearance__core-updates
path: /search/docs/appearance/core-updates
---

# Google 搜索的核心更新与您的网站

> 来源: https://developers.google.com/search/docs/appearance/core-updates?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# Google 搜索的核心更新与您的网站

 每年，Google 都会多次对[搜索算法和系统](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/?hl=zh-cn)进行大规模的重要变更，并称之为“核心更新”。更新后，我们会在 [Google 搜索排名更新列表](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history?hl=zh-cn)中予以公布。

 一般来说，大多数网站无需担心核心更新，甚至可能都不会意识到更新已发生。不过，如果您对与核心更新相关的流量变化有疑问，请参阅本页面。本页详细介绍了核心更新的运作方式，以及您可以如何评估并有可能改进内容。

## 核心更新的运作方式

 核心更新旨在确保我们能够从整体上践行我们的使命，向搜索用户呈现实用且可靠的结果。这些更改本质上较为宽泛，并非针对特定网站或个别网页。随着网络上的内容不断变化，我们会全面评估并更新我们的系统，保持与时俱进。

 为了理解核心更新的运作原理，您不妨设想一下：朋友让您推荐一下您最喜欢的美食。虽然您确实列出了 20 家您最喜欢的餐厅，但自 2019 年您最初列出这些餐厅以来，情况发生了变化。一些之前不存在的新餐厅现在成为了您的候选名单。您可能会重新评估某些餐厅，并发现它们在榜单中的排名有所上升，因为您在这些餐厅获得了多次一致的良好体验，或者因为您的好友偏爱允许携带宠物的餐厅。此榜单将会发生变化，有些餐厅排名下滑，并不是本身有问题，只是有其他餐厅进入了前 20 名。

## 在 Search Console 中检查流量是否有所下降

 如果您发现排名下降，并怀疑这可能与[核心更新的时间](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history?hl=zh-cn)有关，请使用 Search Console 确定是否需要进行更改。

1. **确认核心更新已完成发布**。查看[搜索状态信息中心](https://status.search.google.com/?hl=zh-cn)，并记下核心更新的开始日期和结束日期。
2. **比较正确的日期**：我们建议您在核心更新完成后至少等待一整周，然后再在 Search Console 中分析您的网站。一周后，请尝试[将本周与核心更新开始发布前一周进行比较](https://support.google.com/webmasters/answer/7576553?hl=zh-cn#comparingdata)；这样，您就能更好地确定具体发生了哪些变化。
3. **查看您的热门网页和查询。**评估核心更新前后的排名情况：排名下降幅度大还是小？

  - **[排名出现小幅下降](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops?hl=zh-cn#small)（从第 2 位降至第 4 位）**：无需采取重大措施（事实上，我们建议您不要对表现良好的内容进行更改）。
  - **排名出现大幅下降（从第 4 位下降到第 29 位）**：进行[更深入的评估](#assess-large-drop)。

4. **[单独分析不同的搜索类型](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops?hl=zh-cn#analyze-different-search-types-separately)**：这有助于您了解所发现的流量下降情况具体发生在 Google 网页搜索、Google 图片、“视频”模式还是“新闻”标签页上。

## 评估排名大幅下降情况

 如果您发现整个网站的排名持续大幅下降，请仔细阅读[自行评估](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=zh-cn)部分，检查您的整个网站（而不仅仅是单个网页）是否提供实用、可靠且以用户为中心的内容。具体而言，我们建议您牢记以下几点：

- **仔细检查您的整个网站，并尽量保持客观。**您还可考虑让您信任的但与网站无关的其他人员[使用这些问题进行评估](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=zh-cn)。
- **评估最受影响的网页。**仔细审视这些网页，了解参照上述[自行评估问题](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=zh-cn)，这些网页的表现如何。例如，可能存在更能帮到搜索用户的其他网页。

## 进行更改时的注意事项

- **避免进行“快速修复”更改**（例如，因为听说某个网页元素不利于 SEO，就将其移除）。而是应专注于做出对用户有意义且长期有效的更改。
- **考虑如何以有意义的方式改进内容。**例如，您可以通过重写或重组内容，让受众更轻松地阅读和浏览网页。
- **删除内容是不得已的做法**，只有在您认为内容无法挽回时，才应考虑删除。事实上，如果您考虑删除网站的整个版块，这可能表明这些版块首先是为搜索引擎而非用户创建的。如果您的网站存在这种情况，那么删除无用内容有助于提高网站上优质内容的表现。

## 多久才能在搜索结果中看到效果

 如果您进行了改进，可能需要一段时间才能在搜索结果中看到效果：有些更改可能在几天内生效，但我们的系统可能需要几个月才能学习并确认整个网站现在长期以来一直在生成实用、可靠、以用户为中心的内容。如果几个月过去了，您仍未看到任何效果，可能需要等到下一次核心更新。

 不过，您不一定需要等待核心重大更新，才能看到改进带来的效果。我们会持续对搜索算法做出更新，包括较小规模的核心更新。这些更新之所以未发布公告，是因为它们并不十分明显，但它们是另一种可让您的内容排名上升的方式（如果您进行了改进）。

请注意，我们无法保证您对网站所做的更改会对 Google 搜索结果产生显著影响，并且 Google 搜索结果中的排名不是静态或固定的。Google 的搜索结果本质上是动态的，因为用户的期望会不断演变，开放网络本身会出现各种新内容和更新内容。这种持续的变化可能会导致自然搜索流量出现增长和下降。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-31。
