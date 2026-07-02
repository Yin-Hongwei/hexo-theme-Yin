'use strict'

hexo.extend.helper.register('hexoVersion', function () {
  return hexo.version
})

hexo.extend.helper.register('full_url', function (path) {
  var root = this.config.url.replace(/\/$/, '')
  var asset = path ? this.url_for(path) : '/'
  if (!asset.startsWith('/')) {
    asset = '/' + asset
  }
  return root + asset
})

hexo.extend.helper.register('abs_url', function (value) {
  if (!value) return ''
  if (/^https?:\/\//i.test(value)) return value
  return this.full_url(value)
})

hexo.extend.helper.register('seo_image', function () {
  var theme = this.theme
  var page = this.page
  var seo = theme.seo || {}

  if (page.og_image) return this.abs_url(page.og_image)
  if (page.cover) return this.abs_url(page.cover)
  if (page.photos && page.photos.length) return this.abs_url(page.photos[0])

  if (page.content) {
    var match = page.content.match(/<img[^>]+src=["']([^"']+)["']/i)
    if (match) return this.abs_url(match[1])
  }

  return this.abs_url(seo.og_image || theme.home.cover_img || theme.avatar)
})

hexo.extend.helper.register('canonical_url', function () {
  if (this.is_home && this.is_home()) return this.full_url('/')
  if (this.page && this.page.canonical) return this.page.canonical
  if (this.page && this.page.path) return this.full_url(this.page.path)
  return this.full_url('/')
})

hexo.extend.helper.register('seo_type', function () {
  if (this.is_post && this.is_post()) return 'article'
  if (this.is_home && this.is_home()) return 'website'
  if (typeof this.page !== 'undefined' && this.page.type === 'about') return 'profile'
  return 'website'
})

hexo.extend.helper.register('iso_date', function (date) {
  if (!date) return ''
  return date.toISOString ? date.toISOString() : new Date(date).toISOString()
})
