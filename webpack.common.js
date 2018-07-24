const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { resolve, getEntries, getHtmlWebpackPlugins } = require('./webpack.until.js')
const cfg = require('./webpack.cfg.js')

module.exports = {
  entry: {
    ...getEntries()
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    }
  },
  output: {
    path: resolve('dist'),
    filename: `${cfg.build.assetsSubDirectory}/js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
     
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // 启用 热更新
    ...getHtmlWebpackPlugins()

  ],
}