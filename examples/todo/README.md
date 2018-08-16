# AIMake React Boilerplate

快速创建下一个 AIMake React 应用。

# 功能/特性

* ✔︎ 高可扩展性
* ✔ 易用的 CLI 工具, 快速创建 components、containers、languages、selectors、sagas 以及对应 tests
* ✔︎ 极致的开发体验(DX)
* ✔︎ 支持 ES6/ES7/ES8 JavaScript 语法
* ✔︎ 支持 SCSS/Sass/Styled Components
* ✔︎ 支持 i18n 国际化
* ✔︎ 高性能, 支持离线模式
* ✔︎ 搜索引擎友好(SEO)

# 快速开始

## 环境准备
你需要有 **Node >=8.9** 的开发环境，如果你的 **Node** 版本过低，请进行升级。推荐使用 [nvm](https://github.com/creationix/nvm#installation)（macOS/Linux）或者 [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) 进行 **Node** 版本切换。

## 安装

```bash
npm i @aimake/cli -g
```

## 开发

### `aimake dev`
开发模式启动项目 ，你可以在浏览器打开 [http://localhost:3000](http://localhost:3000) 进行访问。

在你代码有修改的时候，页面会自动更新。

### `aimake add`

快速为你添加 `component`、`container`、`language`，详情可查看[生成器](https://lark.alipay.com/msd/aimake-cli/hqnazu)。

### `aimake build`

生产模式对项目进行构建，构建代码会生成到 `build` 目录中。

默认情况构建代码会包含 `Service Worker`，这样的话你的 `app` 可以在访问过程中使用缓存数据，加快访问速度。了解更多 `Service Worker`，可以查看 [Service Worker](https://lark.alipay.com/msd/aimake-cli/ryzmki)。

### `aimake deploy`

项目代码部署，你可以通过自定义自己的 `CI` 配置来部署你的代码。对于这方面的介绍可查看[代码部署](https://lark.alipay.com/msd/aimake-cli/nhav8m)。

更多可了解 [AIMakeCLI](https://lark.alipay.com/msd/aimake-cli/vnlssb)
