(function () {
  var SELECTOR = 'img.lazy-img'

  function markLoaded(img) {
    img.classList.add('lazy-img--loaded')
  }

  function observeImages() {
    var images = document.querySelectorAll(SELECTOR + ':not(.lazy-img--loaded)')
    if (!images.length) return

    images.forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        markLoaded(img)
        return
      }
      img.addEventListener('load', function () {
        markLoaded(img)
      }, { once: true })
      img.addEventListener('error', function () {
        img.classList.add('lazy-img--error')
      }, { once: true })
    })

    if (!('IntersectionObserver' in window)) return

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
      })
    }, {
      rootMargin: '120px 0px',
      threshold: 0.01
    })

    document.querySelectorAll(SELECTOR + ':not(.lazy-img--loaded)').forEach(function (img) {
      observer.observe(img)
    })
  }

  function init() {
    observeImages()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
