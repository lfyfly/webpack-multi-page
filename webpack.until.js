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
    htmls.forEach((htmlFileName) => {
      let chunkName
      if (/.html$/.test(htmlFileName)) {
        chunkName = htmlFileName.replace(/.html$/, '')

        HtmlWebpackPlugins.push(
          new HtmlWebpackPlugin({
            template: resolve(`./src/pages/${htmlFileName}`),
            filename: htmlFileName,
            chunks: [chunkName].concat(argv.mode === 'production' ? ['vendor', 'commons', 'manifest'] : []),
            inject: true,
            minify: argv.mode !== 'production' ? undefined : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
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