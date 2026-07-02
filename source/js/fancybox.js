$(function () {
  function wrapImagesWithFancybox($imgs, group, showAlt) {
    $imgs.each(function () {
      var img = this
      if ($(img).closest('a[data-fancybox]').length) return

      var $a = $(
        '<a href="' +
          img.src +
          '" data-fancybox="' +
          group +
          '" data-caption="' +
          img.alt +
          '" class="fancybox"></a>'
      )
      var $wrap = $(img).wrap($a)
      if (showAlt && img.alt) {
        $wrap.after('<div class="img-alt">' + img.alt + '</div>')
      }
    })
  }

  wrapImagesWithFancybox($('#post-content img').not('.no-fancybox'), 'group', true)
  wrapImagesWithFancybox($('#page-content .article-container img').not('.no-fancybox'), 'page', true)

  $('.moments-item').each(function (idx) {
    wrapImagesWithFancybox(
      $(this).find('.moments-content .content img').not('.no-fancybox'),
      'feed-' + idx,
      false
    )
  })

  $().fancybox({
    selector: '[data-fancybox]',
    loop: true,
    transitionEffect: 'slide',
    buttons: ['share', 'slideShow', 'fullScreen', 'download', 'thumbs', 'close']
  })

  var galleryItem = $('.gallery-item')
  var galleryList = []
  galleryItem.each(function (idx, elem) {
    galleryList.push({
      src: $(elem).data('url'),
      opts: {
        caption: $(elem).data('title')
      }
    })
  })
  galleryItem.on('click', function () {
    $.fancybox.open(
      galleryList,
      {
        loop: true,
        transitionEffect: 'slide'
      },
      galleryItem.index(this)
    )
    return false
  })
})
