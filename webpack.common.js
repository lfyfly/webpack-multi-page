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
      publicPath: argv.mode === 'production'
        ? cfg.build.assetsPublicPath
        : cfg.dev.assetsPublicPath
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
        {
          test: /\.(png|jpg|gif)$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 228192,
                name: `${cfg.build.assetsSubDirectory}/img/[name]-[hash:7].[ext]`,
              }
            }
          ]
        },
        {
          test: /\.(woff|svg|eot|ttf)\??.*$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'url-loader',
            options: {
              name: `${cfg.build.assetsSubDirectory}/font/[name]-[hash:7].[ext]`,
              limit: 8192
            }
          }
        },
      ]
    },
    plugins: [

      // new webpack.HotModuleReplacementPlugin(), // 启用 热更新
      ...getHtmlWebpackPlugins()

    ],
  }
}