module.exports = {
  // 支持pug模板引擎
  // 其他模板引擎自己在loader里面配
  // ejs-loader配了，但是不生效，还是走的html-webpack-plugin渲染，不支持include
  // 每次对pages 和 js入口文件 进行修改是需要 重启webpack
  dev: {
    assetsPublicPath: '/',
    proxy: {
      "/index/1.html": {
        target: "http://localhost:8080",
        pathRewrite: {"/index/1.html" : "/index1.html"}
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin:true,
        pathRewrite: {"^/api" : ""}
      }
    }
  },
  build: {
    assetsSubDirectory: 'static',
    productionSourceMap: false,
    assetsPublicPath: './' // 也可是cdn地址
  }
}