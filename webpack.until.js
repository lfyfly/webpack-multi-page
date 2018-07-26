var fs = require('fs')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var resolve = function (_path) {
  return path.resolve(__dirname, _path)
}
let until = {
  resolve,
  getEntries(argv) {
    let entries = fs.readdirSync(resolve('./src/js'))
    let entry = {}
    let key
    entries.forEach((entryJs) => {
      if (/.js$/.test(entryJs)) {
        key = entryJs.replace(/.js$/, '')
        entry[key] = resolve(`./src/js/${entryJs}`)
      }
    })
    console.log(entry)
    return entry
  },
  getHtmlWebpackPlugins(argv) {

    let htmls = fs.readdirSync(resolve('./src/pages'))
    let HtmlWebpackPlugins = []
    htmls.forEach((tplFileName) => {
      let chunkName
      var reg = /\.[^.]+$/
      if (reg.test(tplFileName)) {
        chunkName = tplFileName.replace(reg, '')

        HtmlWebpackPlugins.push(
          new HtmlWebpackPlugin({
            title: 'Custom template using Handlebars',
            template: resolve(`./src/pages/${tplFileName}`),
            filename: chunkName+'.html',
            chunks: [chunkName].concat(argv.mode === 'production' ? ['vendor', 'commons', 'manifest'] : []),
            inject: true,
            minify: argv.mode !== 'production' ? undefined : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              minifyCSS: true,
              minifyJS: true,
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            },
          })
        )
      }
    })
    return HtmlWebpackPlugins
  }
}


module.exports = until