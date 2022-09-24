<h1 align="center">hexo-theme-Yin</h1>


<p align="center">
  <a href="https://travis-ci.org/"><img alt="JavaScript Style Guide" src="https://travis-ci.org/Yin-Hongwei/hexo-theme-Yin.svg?branch=master"></a>
  <a href=""><img alt="license" src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat"></a>
</p>


## 主题截图

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h6hwptikgmj21c00u0wha.jpg)




## 在线预览

在线观看示例：[Hongwei Blog](https://yin-hongwei.github.io/)



## 安装

1. 在 **Hexo/themes** 目录下执行下面命令。

```bash
git clone git@github.com:Yin-Hongwei/hexo-theme-Yin.git
```

2. 将 **Hexo/_config.yml** 文件中的主题属性改为 `hexo-theme-Yin`。

```bash
theme: hexo-theme-Yin
```

3. 如果你没有下载 `hexo-renderer-pug` 和 `hexo-renderer-stylus`，请执行下面命令安装。

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```



## 配置

1. 如果你想为项目增加评论功能，可以修改 **hexo-theme-Yin/_config.yml** 文件中注释的 **gitalk** 内容。

2. 如果你想为项目增加赞赏功能，可以在 **Hexo/source/** 目录下新建 img 目录，并放入赞赏码图片，修改 **hexo-theme-Yin/_config.yml** 文件中 **reward** 的内容。

3. 如果你想为项目增加关于功能，可以在 **Hexo/source/** 目录下新建 about 目录，并在里面新建 index.md 文件，开头写入
```
---
title: 关于我

type: about

---
```




## 许可证

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019 Yin-Hongwei
