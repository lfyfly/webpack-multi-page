# [webpack-multi-page](https://github.com/lfyfly/webpack-multi-page)

## 1、快速使用
### 1.1 克隆项目
```
git clone https://github.com/lfyfly/webpack-multi-page.git
```
删除`.git`文件夹，这是我的`commit记录`，所以删除

### 1.2 安装依赖
```
npm i
```
### 1.3 进入开发模式
```
npm run dev
```

### 1.4 打包
```
npm run build
```

### 1.5 一键兼容webp图片
在执行完`npm run build`后执行`npm run webp`

#### 默认情况下html中的`img[src]`会被处理成`img[data-src]`
- 当img的src为`http`开头则会被忽略该处理
- 当img的className中包含`not-webp`开头则会被忽略该处理

### 1.6 图片压缩
`src/assets/_img`（原图文件夹） -> `src/assets/img`（压缩后图片文件夹）

```
npm run imgmin
```
### 1.7 雪碧图
`_sprites_src/xxx/*.png`（原图文件夹） -> `src/sprites/xxx.css` + `src/sprites/xxx.png` 

```
npm run sp
```
### 1.8 配置文件
详见根目录下`webpack.cfg.js`

## 2、功能简介
### 2.1 开发模式
- 多页面开发，支持vue
- 支持无需引入即可全局使用的`global.scss`
- 支持px2rem
- `src/pages`中的html（或pug）文件和`src/js`中的js（入口）文件，必须一一对应
- 新增页面，需要重新运行`npm run dev`
- html，css，js 更改自动刷新
- scss，es6+，pug支持
- 支持代理配置

### 2.2 关于图片资源
- 图片不要放在`/static`文件下，而是放在`/assets`。
  - 因为html中img标签的`src`如果是绝对路径则会被定为到`src`目录下，无法引用到`static`目录下
  - css中图片如果以`/static`路径开头，会不经过`url-loader`所处理


- html中的img标签`src`对应图片可以被`url-loader`所处理
  - 第一种方式是`相对html路径`
  - 第二种方式以`/assets`开头的绝对路径，自动定位到`src/assets`目录下

### 2.3 打包相关
- 打包后html文件，css文件图片路径完美生成`相对路径`（为此css与html打包在同一目录下）
- 打包cdn路径一键配置
- 静态文件目录`static`文件夹，打包会被拷贝到dist目录
- 支持打包文件版本hash，提取`vendor.js` `common.js` `[page].js`文件，只对模块更改的css，js文件版本hash进行更改
  - `vendor.js`是指`/node_modules`文件夹中引用的第三方插件
  - `common.js`是指被多个页面引用超过2次并且，大小超过20k时，才会生成
  - `[page.js]`对应着每个页面独自的js文件 
- css文件单独提取
- 小于8k文件自动转base64代码

## gulp 多页面配置
[dev-easy](https://github.com/lfyfly/dev-easy)