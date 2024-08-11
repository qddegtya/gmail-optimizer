# 📮 Gmail-Optimizer

## Motivation

The cause of the matter is like this: as we all know, major platforms (including Github), etc., all provide `Notification` configuration, and basically everyone's account is bound to an email address, the default notification configuration of these platforms will be notified to the mailbox, including a variety of `Newsletter` push, notification of changes in the status, etc., if not careful, your free Gmail will soon be full of notification emails is a common thing. If you're not careful, your free Gmail will soon be full, and it's not uncommon to have 100,000 notification emails or more, so your journey begins:

You want to delete through the Gmail client, the web version of the default provision of bulk deletion function, especially the full selection function, will be due to the number of emails is too large, timeout error, so you can only 100 / 200 mail selection, and then delete, which will be an extremely long process, and so you thought, can not be automated?

Smartly, you start searching the internet 🔍 solutions, you search the whole internet, probably you can search out these ways:

**😭 Google App Script**.

Similar to this article written in this way: [How to clean email for gmail via app script ?] (https://www.xiaoa.name/tool/clean-gmail-via-app-script/), not hiding, this article is what I wrote, after my depth of practice, GAS in the process of running, call gmail pull back thread when often for unknown reasons timeout, there are some use of this approach! There are also some users who use this method to ask for help in Google forum, basically no solution.

But it is not 100% failure, if your mail is not a lot, you can continue to try to use this approach, the text of the script has been rigorously verified, it is possible to run, because the above situation does not exclude the impact of the network link, maybe in your place is good.

**😓 Use of GUI-based RPA**

I put all these approaches into this category: whether you use your own script or someone else's, whether you use headless E2E testing tools, or various RPA frameworks that simulate human-computer interaction behaviours, these approaches have very strict runtime requirements, plus network reasons, the stability of the relationship can not be guaranteed, the advantage is that because of the GUI interface naturally carries the state attribute, your scripts You don't need to record the state. If it fails, just run it again.

**😺 Re-open gmail account**

Many users choose to directly reopen the gmail account, this is not impossible, if your gmail account is not the main account.

---

事情的起因是这样的：众所周知，各大平台（包括 Github）等，都提供 `Notification` 配置，并且大家的账号基本上都绑定了邮箱地址，这些平台的默认通知配置会通知到邮箱，包括各种 `Newsletter` 推送，状态变更通知等等，一不小心，你的免费 Gmail 很快就会被撑满，通知邮件多达十万级别以上是常见的事情，于是你的痛苦旅程开始了：

你想通过 Gmail 客户端、网页版默认提供的批量删除功能进行删除，尤其是全选功能，会因为邮件数量过大，超时错误，于是你只能 100 / 200 封的选择，然后再删除，这将是一段极其漫长的过程，于是你想到了，能不能自动化？

聪明的你开始在网上搜索 🔍 解决方案，你搜遍了全网，大概能搜出来的办法有这几种：

**😭 Google App Script**

类似这篇文章中所写的这样：[How to clean email for gmail via app script ?](https://www.xiaoa.name/tool/clean-gmail-via-app-script/)，不瞒你说，这文章就是我写的，经过我的深度实践，GAS 在运行的过程中，调用 gmail 拉回 thread 时常常因为不明原因超时，也有一些使用这个办法的网友在 Google 论坛求助，基本上无解。

但是它并不是 100% 失败，如果你的邮件并不是很多，你可以继续尝试使用这个办法，文中的脚本经过严格验证，是可以运行的，因为上述情况不排除网络链路的影响，也许在你那是好的。

**😓 使用基于 GUI 的 RPA**

我把这些办法都归为这一类：无论是使用自己研发的脚本还是使用别人的，不管是使用 headless 的 E2E 测试工具，还是各种模拟人机交互行为的 RPA 框架，这些办法对运行时要求都非常严格，加上网络原因的关系，稳定性无法保证，好处是因为 GUI 界面天然带状态属性，你的脚本不需要记录状态，失败了，再运行就可以了。

**😺 重开 gmail 账号**

不少网友选择直接重开 gmail 账号，这不是不行，如果你的 gmail 账号不是主账号的话。

## About

In response to our daily use of `Gmail` process similar to the above pain points, as well as may involve the depth of the use of scenarios, I decided to develop a toolkit, the name is `📮 Gmail-Optimizer`, which integrates the `Gmail` for `Gmail` utility script, the function includes: `Multi-threaded batch deletion of emails`、`Exports mails`、`Listening to mail's status` etc., but currently this repository is in the `WIP` status, welcome to participate in the contribution. A desktop client will be available in the future.

* 🍃 Green, secure, and based on Google's official `Node.js SDK`
* It is called entirely using the `GmailApi` `test application` state, so it is completely 🔏 privacy-safe, and only needs to be called according to the [official documentation](https://developers.google.com/gmail/api/quickstart/nodejs?hl=zh-cn) just need to open the local `oAuth`
* Scripts are practical and stable

---

针对我们日常使用 `Gmail` 过程中的类似上述痛点，以及可能涉及的深度使用场景，我决定开发一个工具包，名字就叫 `📮 Gmail-Optimizer`，它集成针对 `Gmail` 的实用脚本，功能包括：`多线程批量删除邮件`、`导出邮件`、`监听邮件状态` 等等，未来也将提供一个桌面客户端产品，但是目前本仓库处于 `WIP` 状态，欢迎参与贡献。

* 🍃 绿色、安全，基于 Google 官方的 `Node.js SDK`
* 它完全使用 `GmailApi` 的`测试应用`态进行调用，因此是完全 🔏 隐私安全的，只需要根据[官方文档](https://developers.google.com/gmail/api/quickstart/nodejs?hl=zh-cn)打通本地 `oAuth` 链路
* 脚本实用，运行稳定

## Features

* [x] Mass delete emails with `thread pool` mode
