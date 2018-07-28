
(function () {
  function checkWebp() {
    try {
      return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0)
    } catch (err) {
      return false
    }
  }
  var supportWebp = checkWebp()
  if (supportWebp) document.querySelector('html').className = document.querySelector('html').className + '__webp__'
  window.addEventListener('DOMContentLoaded', function () {
    var imgEls = document.querySelectorAll('img[data-src]')
    for (var i = 0; i < imgEls.length; i++) {
      var imgSrc = imgEls[i].getAttribute('data-src')
      imgEls[i].removeAttribute('data-src')
      if (supportWebp) imgSrc = imgSrc.replace(/(\.[^\.]+)$/, '.webp')
      imgEls[i].src = imgSrc
    }
  })
})()

