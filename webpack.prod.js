const webpackCommon = require('./webpack.common.js')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const cfg = require('./webpack.cfg.js')
const path = require('path')
module.exports = (env, argv) => {
  return merge(webpackCommon(env, argv), {
    mode: 'production', // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
    devtool: '#source-map',
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          exclude: /(node_modules|bower_components)/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap', // 将 CSS 转化成 CommonJS 模块
              'sass-loader?sourceMap', // 将 Sass 编译成 CSS
              'postcss-loader?sourceMap',
            ],

          })
        }

      ]
    },
    plugins: [
      new CleanWebpackPlugin('./dist'),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './static'),
          to: cfg.build.assetsSubDirectory,
          ignore: ['.*']
        }
      ]),

      new ExtractTextPlugin({
        filename: `${cfg.build.assetsSubDirectory}/css/[name].css`,
        // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      }),

      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: cfg.build.productionSourceMap,
        parallel: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          sourcemap: true,
          map: {
            inline: !cfg.build.productionSourceMap,
            annotation: true
          },
          autoprefixer: { disable: true },
        }
      }),

    ],
  })
}
