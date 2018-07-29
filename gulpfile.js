const config = {
  img_src: 'src/assets/_img',
  img_dest: 'src/assets/img',
  imgmin_quality: 70
}
const fs = require('fs')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const cache = require('gulp-cache') // 缓存压缩图片，避免重复压缩

gulp.task('imgmin', function () {
  gulp.src(`${config.img_src}/**/*.{jpg,jpeg,png}`)
    .pipe(imagemin(
      [mozjpeg({ quality: config.imgmin_quality }), pngquant({ quality: config.imgmin_quality })]))
    .pipe(gulp.dest(config.img_dest))
})

// webp
// generate  .webp image
// html <img> src -> data-src
// css -> add  .__webp__ className
// append <head> __webp__.js 

gulp.task('webp', ['generateWebp', 'webpcss', 'webphtml'])

const generateWebp = require('gulp-webp')
gulp.task('generateWebp', function () {
  gulp.src('dist/**/*.{png,jpg,jpeg}')
    .pipe(generateWebp())
    .pipe(gulp.dest('./dist'))
})

const webpcss = require('gulp-webpcss')
const cssnano = require('gulp-cssnano');
gulp.task('webpcss', function () {
  gulp.src("dist/**/*.css")
    .pipe(webpcss({
      webpClass: '.__webp__',
      replace_from: /\.(png|jpg|jpeg)/,
      replace_to: '.webp',
    }))
    .pipe(cssnano())
    .pipe(gulp.dest("./dist"))
})

const cheerio = require('gulp-cheerio')
gulp.task('webphtml', function () {
  return gulp
    .src('dist/**/*.html')
    .pipe(cheerio(function ($, file) {
      // 插入webp.js
      
      var webpJs = fs.readFileSync('__webp__.js', 'utf-8');
      $('head').append(`<script id="__webp__">${webpJs}</script>`)

      $('img[src]:not(.not-webp)').each(function () {
        var imgEl = $(this)
        var src = imgEl.attr('src')
        if(/^http/.test(src)) return
        imgEl.removeAttr('src')
        imgEl.attr('data-src', src)
      })

      if ($('#__webp__').length > 0) return
    }))
    .pipe(gulp.dest('dist'))
})


//  雪碧图
// _
const spritesmith = require('gulp.spritesmith')
const gulpIf = require('gulp-if')
var buffer = require('vinyl-buffer');
gulp.task('sprites', function () {
  // 读取 sprites
  let spritesList = fs.readdirSync('_sprites_src')
  let sprites = gulp.src('_sprites_src/*/*.{jpg,png}')
  spritesList.forEach((spritesItem) => {
    sprites = sprites.pipe(gulpIf(`${spritesItem}/*.{jpg,png,svg}`, spritesmith({
      imgName: spritesItem + '.png',
      cssName: spritesItem + '.css',
      cssTemplate:'sprites-css.handlebars',
      imgPath: `./${spritesItem}.png`
    })))
  })
  return sprites
    .pipe(buffer())
    .pipe(imagemin(
      [mozjpeg({ quality: config.imgmin_quality }), pngquant({ quality: config.imgmin_quality })]))
    .pipe(gulp.dest('src/assets/sprites'))
})
