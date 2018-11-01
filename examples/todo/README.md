# RIS

React Integrated Solution

# 快速开始

## 环境准备
你需要有 **Node >=8.9** 的开发环境，如果你的 **Node** 版本过低，请进行升级。推荐使用 [nvm](https://github.com/creationix/nvm#installation)（macOS/Linux）或者 [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) 进行 **Node** 版本切换。

## 安装

```bash
npm i @ris/cli -g
```

## 开发

### `ris dev`
开发模式启动项目 ，你可以在浏览器打开 [http://localhost:3000](http://localhost:3000) 进行访问。

在你代码有修改的时候，页面会自动更新。

### `ris add`

快速为你添加 `component`、`container`、`language`。

### `ris build`

生产模式对项目进行构建，构建代码会生成到 `build` 目录中。

### `ris deploy`

项目代码部署，你可以通过自定义自己的 `CI` 配置来部署你的代码。
