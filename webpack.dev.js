var webpackCommon = require('./webpack.common.js')
const merge = require('webpack-merge')
module.exports =  merge(webpackCommon,{
  devServer:{}
})