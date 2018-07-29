module.exports = {
  // px2rem:{
  //   remUni:100,
  //   remPrecision: 6
  // },
  dev: {
    assetsPublicPath: '/', // 资源公共路径
    proxy: { // 代理
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
    assetsPublicPath: './', // 也可是cdn地址
    assetsSubDirectory: 'static', // 打包后资源路径
    productionSourceMap: false  // 打包生成sourceMap
  }
}