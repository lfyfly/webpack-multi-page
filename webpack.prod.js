var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var until = require('./webpack.until.js')
var resolve = until.resolve
module.exports = {
  mode:'development', // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
  entry: {
    ...until.getEntries()
  },
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    ...until.getHtmlWebpackPlugins()
  ]
};