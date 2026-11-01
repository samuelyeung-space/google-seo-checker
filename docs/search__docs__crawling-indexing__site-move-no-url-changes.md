---
title: "更改托管基础架构"
source: https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes?hl=zh_CN
slug: search__docs__crawling-indexing__site-move-no-url-changes
path: /search/docs/crawling-indexing/site-move-no-url-changes
---

# 更改托管基础架构

> 来源: https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 更改托管基础架构

 请遵循本指南，最大限度减少更改网站的托管基础架构对网站在 Google 搜索中的表现带来的影响。更改托管基础架构是指更换托管服务提供商或迁移到内容分发网络 (CDN)。本指南仅适用于不影响用户可见的网址的迁移。

**会更改网址**？如果您做出显而易见的网址更改，请先[做出更改网址的网站迁移](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=zh-cn)。

## 概览

1.  **[准备新的托管基础架构](#hosting-infrastructure)**。 将内容上传到新服务器或配置您的 CDN 及源服务器，然后对其进行测试。
2.  **[开始网站迁移](#start-site-move)**。更改域名的 DNS 设置，使其指向新的托管基础架构。在此步骤中将进行实际的网站迁移，开始将流量发送到新基础架构的过程。
3.  **[监控流量](#monitor)**。密切监控新旧托管基础架构上通过的流量。
4.  **[关闭旧的托管基础架构](#shut-down-old-hosting)**。当您确信所有用户都能从新的基础架构正常接收内容，并且没有人使用旧的基础架构时，请关闭旧的托管基础架构。

## 准备新的托管基础架构

此部分介绍了在开始实际的基础架构迁移前应执行的步骤。

### 复制和测试新网站

 首先，将网站的副本上传到新的托管服务提供商。“网站副本”的含义完全取决于您的旧内容管理平台；它可能是您复制到新托管平台上的实际 HTML 文件，或者是您必须在新位置导入的数据库导出文件。上传完成后，您可以通过全面测试用户与网站的互动方式来验证网站是否可以正常运行。以下是几点建议：

-  **创建测试环境**（例如按照 IP 限制访问权限），从而在网站上线前测试其所有功能。
- **在网络浏览器中打开新网站**，然后检查网站的所有元素：网页、图片、表单及下载内容（例如 PDF 文件）。
-  您可以为新基础架构设置一个临时主机名（如 `beta.example.com`）来**进行公开测试**，以便测试通过浏览器访问网站的可访问性。借助临时主机名，您可以测试 Googlebot 能否访问您的网站。为避免意外地让测试网站编入索引，请将 [`noindex``robots` 规则](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=zh-cn)添加到网页的 HTML 或 HTTP 标头中。

###  检查 Googlebot 能否访问新的托管基础架构

 如果您还没有 Search Console 账号，请为网站[创建一个新账号](https://support.google.com/webmasters/answer/34592?hl=zh-cn)，用于监控 Google 访问权限和流量。如果您为新网站创建了临时主机名，请也验证该资源。使用 Search Console 中的[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=zh-cn)检查 Googlebot 能否访问您的新基础架构。

 **注意**：请检查防火墙配置或拒绝服务攻击 (DoS) 的防范措施。确保该配置/措施没有阻止 Googlebot 访问 DNS 或托管服务提供商的服务器。 [了解如何验证 Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=zh-cn#use-automatic-solutions)。

### 降低 DNS 记录的 TTL 值

 若要提高网站迁移速度，您可以降低网站 DNS 记录的 TTL 值，从而更快地将新设置迁移至 ISP。DNS 设置通常由 ISP 基于指定的[存留时间 (TTL) 设置](https://wikipedia.org/wiki/Time_to_live#DNS_records)进行缓存。请考虑在网站迁移前至少提前一周将 TTL 设置为保守的低值（例如，几个小时），以加快 DNS 缓存的刷新速度。

### 检查 Search Console 验证状态

确保您的 Search Console 验证状态在托管迁移之后将会继续有效。

如果您在 Search Console 中使用 [HTML 文件方法](https://support.google.com/webmasters/answer/9008080?hl=zh-cn#html_verification)验证您对网站的所有权，请不要忘记将当前验证文件加入到网站的新副本中。

同样，如果您在内容管理系统 (CMS) 的模板中添加 [`meta` 标记](https://support.google.com/webmasters/answer/9008080?hl=zh-cn#meta_tag_verification)或 [Google Analytics 功能](https://support.google.com/webmasters/answer/9008080?hl=zh-cn#google_analytics_verification)来验证所有权，请确保新的 CMS 副本中也包含这些内容。

## 开始迁移

迁移过程如下所述：

1.  **移除所有会被抓取的临时数据块**。在创建网站的新副本时，有些网站所有者会使用 robots.txt 文件禁止 Googlebot 和其他抓取工具的所有抓取活动，或者使用 `noindex``meta` 标记或 HTTP 标头阻止将内容编入索引。在准备开始迁移时，请务必从网站的新副本中移除所有此类数据块。
2.  **更新 DNS 设置**。将 DNS 记录更新为指向新的托管服务提供商，即可开始网站迁移。有关具体操作，请咨询 DNS 提供商。

## 监控流量

如需监控基础架构更改是否顺利，请执行以下操作：

-  **密切关注新旧服务器上的服务器日志**。
 随着 DNS 设置的传播和网站流量的迁移，您会注意到旧服务器上记录的流量在减少，而新服务器上的流量在相应地增加。
-  **使用不同的公共 DNS 检查工具**。
 检查世界上不同的 ISP 能否正确地更新至您的新 DNS 设置。
-  **监控抓取**。
 在 Search Console 中监控[索引涵盖范围](https://support.google.com/webmasters/answer/7440203?hl=zh-cn)图表。

### Googlebot 抓取速度注意事项

 如果您更改托管基础架构，那么正常情况下，Googlebot 的抓取速度在新系统启用后即会出现暂时下降，但在接下来的几天内会稳步上升，并可能会升至比迁移之前还要高的速度。

 出现这种波动的原因在于，我们依据许多信号确定对网站的抓取速度，当您的托管基础架构发生更改时，这些信号也会发生更改。只要 Googlebot 在访问您的新服务基础架构时没有遇到任何严重问题或出现严重速度减缓现象，它就会尽可能根据需要快速抓取您的网站。

## 关闭旧的托管基础架构

 检查旧服务提供商的服务器日志。一旦旧服务提供商的访问流量为零，您便可关闭旧的托管基础架构。至此，托管基础架构更改过程全部完成。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2025-12-31。
