var webpackCommon = require('./webpack.common.js')
const merge = require('webpack-merge')
module.exports = merge(webpackCommon, {
  mode: 'development', // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader?sourceMap', // 将 CSS 转化成 CommonJS 模块
          'sass-loader?sourceMap', // 将 Sass 编译成 CSS
          'postcss-loader?sourceMap'
        ]
      }
    ]
  },
  devServer: {}
})