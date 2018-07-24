var fs = require('fs')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var resolve = function (_path) {
  return path.resolve(__dirname, _path)
}
let until = {
  resolve,
  getEntries() {
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
  getHtmlWebpackPlugins() {
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
            chunks: [chunkName],
            // inject: true,
          })
        )
      }
    })
    return HtmlWebpackPlugins
  }
}


module.exports = until