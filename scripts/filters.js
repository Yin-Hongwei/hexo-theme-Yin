'use strict'

hexo.extend.filter.register('after_render:html', function (str) {
  var theme = hexo.theme.config
  if (!theme.lazyload || !theme.lazyload.enable) {
    return str
  }

  var skipCount = 0
  return str.replace(/<img\b([^>]*?)\/?>/gi, function (match, attrs) {
    attrs = attrs.trim()
    if (/loading\s*=/.test(attrs)) {
      return match
    }
    if (/class\s*=/.test(attrs)) {
      attrs = attrs.replace(/class\s*=\s*(["'])(.*?)\1/i, function (_, quote, classes) {
        return 'class=' + quote + classes + ' lazy-img' + quote
      })
    } else {
      attrs = (attrs ? attrs + ' ' : '') + 'class="lazy-img"'
    }
    var loading = (skipCount > 0 || /lazy-img--eager/.test(attrs)) ? 'lazy' : 'eager'
    skipCount += 1
    return '<img ' + attrs + ' loading="' + loading + '" decoding="async">'
  })
})
