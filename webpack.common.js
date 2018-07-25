const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { resolve, getEntries, getHtmlWebpackPlugins } = require('./webpack.until.js')
const cfg = require('./webpack.cfg.js')

module.exports = (env, argv) => {
  console.log(argv.mode, '========================')
  return {
    entry: {
      ...getEntries(argv)
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    output: {
      path: resolve('dist'),
      filename: `${cfg.build.assetsSubDirectory}/js/[name].[chunkhash].js`,
      chunkFilename: `${cfg.build.assetsSubDirectory}/js/[name].[chunkhash].js`,
      publicPath: argv.mode === 'production'
        ? cfg.build.assetsPublicPath
        : cfg.dev.assetsPublicPath
    },
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        },
       
        {
          test: /\.(woff|svg|eot|ttf)\??.*$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'url-loader',
            options: {
              name: `${cfg.build.assetsSubDirectory}/font/[name].[hash:7].[ext]`,
              limit: 8192
            }
          }
        },
      ]
    },
    plugins: [

      // new webpack.HotModuleReplacementPlugin(), // 启用 热更新
      ...getHtmlWebpackPlugins(argv)

    ],
  }
}