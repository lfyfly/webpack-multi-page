const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = function (_path) {
  return path.resolve(__dirname, _path)
}
const cfg = require('./webpack.cfg')

// 判断当前页面是否包含CommonCssChunk
function getCommonCssChunk(chunkName) {
  if (!cfg.commonCss) return []
  // 无commonCss.exclude，所有页面包含
  if(!cfg.commonCss.exclude) return  'common_css'
  //  有commonCss.exclude，不包含在该数组的页面引用
  if(cfg.commonCss.exclude && !cfg.commonCss.exclude.includes(chunkName)) return 'common_css'
  // 其他
  return []
}

let until = {
  resolve,
  getFileList(targetPath) {
    let fileList = []
    const _getFileList = function (targetPath) {
      let dirFileList = fs.readdirSync(targetPath)
      return dirFileList.forEach(filename => {
        // 排除下划线开头的所有文件和文件夹
        if (/^_/.test(filename)) return
        let _path = path.resolve(targetPath, filename)
        if (fs.statSync(_path).isDirectory()) {
          _getFileList(_path)
        } else {
          fileList.push({ filepath: _path, filename })
        }
      })
    }
    _getFileList(targetPath)
    return fileList
  },
  styleLoader: [
    'css-loader?sourceMap', // 将 CSS 转化成 CommonJS 模块
    'postcss-loader?sourceMap'].concat(
      cfg.px2rem ? {
        loader: 'px2rem-loader',
        options: cfg.px2rem
      } : [],
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          data: '@import "src/global.scss";'
        }
      }
    ),
  getEntries(argv) {

    let entries = until.getFileList(resolve('./src/js'))
    let entry = {}
    let key
    entries.forEach((file) => {
      if (/.js$/.test(file.filename)) {
        key = file.filename.replace(/.js$/, '')
        entry[key] = file.filepath
      }
    })
    console.log('【入口文件】')
    console.log(entry)
    return entry
  },
  getHtmlWebpackPlugins(argv) {
    let targetPath = resolve('./src/pages')
    let htmls = until.getFileList(targetPath)
    let HtmlWebpackPlugins = []
    htmls.forEach((file) => {
      let chunkName
      var reg = /\.[^.]+$/
      if (reg.test(file.filename)) {
        chunkName = file.filename.replace(reg, '')
        console.log('.' + file.filepath.replace(targetPath, '').replace(reg, '.html'))
        HtmlWebpackPlugins.push(
          new HtmlWebpackPlugin({
            baseTagUrl: '../',
            template: file.filepath,
            filename: '.' + file.filepath.replace(targetPath, '').replace(reg, '.html'),
            chunks: [chunkName].concat(getCommonCssChunk(chunkName)).concat(argv.mode === 'production' ? ['vendor', 'commons', 'manifest'] : []),
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