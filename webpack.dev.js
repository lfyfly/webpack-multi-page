var webpackCommon = require('./webpack.common.js')
const merge = require('webpack-merge')
const cfg = require('./webpack.cfg.js')
const path = require('path')
module.exports = (env, argv) => {

  return merge(webpackCommon(env, argv), {
    mode: 'development', // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'style-loader', // 将 JS 字符串生成为 style 节点
            'css-loader?sourceMap', // 将 CSS 转化成 CommonJS 模块
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                data: '@import "src/global.scss";'
              }
            },
            'postcss-loader?sourceMap'
          ]
        },
      ]
    },
    devServer: {
      proxy: cfg.dev.proxy
    }
  })
};


