console.log('index')
import P from './_modules/P'
import '@/css/index/index.css'
import '@/css/index/index.scss'
import '@/assets/sprites/icons.css'
var p = new P('fly')
p.getName()
console.log(process.env.NODE_ENV)
var $ = require('jquery')
console.log($)

// 按需加载，懒加载
// document.onclick = function () {
//   require.ensure(['./_modules/async'], function (require) {
//     let a = require('./_modules/async');
//     console.log(a)
//   });
// }

