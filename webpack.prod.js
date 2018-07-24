const webpackCommon = require('./webpack.common.js')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const customConfig = require('./webpack.custom.js')
const path = require('path')
module.exports = merge(webpackCommon, {
  mode: 'production', // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/img/[name]-[hash:7].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'static/font/[name]-[hash:7].[ext]',
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('./dist'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: customConfig.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})