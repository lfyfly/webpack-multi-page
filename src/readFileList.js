const fs = require('fs')
const path = require('path')
const resolve = function (_path) {
  return path.resolve(__dirname, _path)
}

const targetPath = resolve('./pages')



function getFileList(targetPath) {
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
        fileList.push({path:_path,filename})
      }
    })
  }
  _getFileList(targetPath)
  return fileList
}
console.log(getFileList(targetPath))
// console.log(fileList)

// 数组扁平化 排除undefined 