const webpackCommon = require('./webpack.common.js')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { styleLoader } = require('./webpack.until.js')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const cfg = require('./webpack.cfg.js')
module.exports = (env, argv) => {
  return merge(webpackCommon(env, argv), {
    mode: 'production', // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
    devtool: cfg.build.productionSourceMap ? '#source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: styleLoader,
            publicPath:'../../'
          })
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin('./dist'),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, cfg.build.assetsSubDirectory),
          to: cfg.build.assetsSubDirectory,
          ignore: ['.*']
        }
      ]),

      // new MiniCssExtractPlugin({
      new ExtractTextPlugin({
        filename: `${cfg.build.assetsSubDirectory}/css/[name].[md5:contenthash:hex:20].css`,
        // filename: '[name].[md5:contenthash:hex:20].css', // 和html同目录是为了css相对路径起作用
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
          // sourcemap: cfg.build.productionSourceMap,
          map: cfg.build.productionSourceMap ? {
            inline: false,
            annotation: true
          } : undefined,
          autoprefixer: { disable: true },
          cssProcessor: require('cssnano'),
          cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
          canPrint: true
        }
      }),
    ],
    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        minSize: 20000, // 超过20k才会被打包
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            minChunks: 1
          },
          commons: {
            name: "commons",
            chunks: "all",
            minChunks: 2
          }
        }
      }
    }
  })
}
