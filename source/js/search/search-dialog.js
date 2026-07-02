window.YinSearchDialog = (function () {
  var bound = false

  function openSearch(onOpen) {
    if (window.matchMedia('(max-width: 768px)').matches) return
    $('body').css({ width: '100%', overflow: 'hidden' })
    $('.search-dialog').velocity('stop').velocity('transition.expandIn', {
      duration: 300,
      complete: function () {
        $('#site-search-input input').focus()
        if (typeof onOpen === 'function') onOpen()
      }
    })
    $('.search-mask').velocity('stop').velocity('transition.fadeIn', { duration: 300 })

    document.addEventListener('keydown', function onEscape(event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', onEscape)
      }
    })
  }

  function closeSearch() {
    $('body').css('overflow', 'auto')
    $('.search-dialog').velocity('stop').velocity('transition.expandOut', { duration: 300 })
    $('.search-mask').velocity('stop').velocity('transition.fadeOut', { duration: 300 })
  }

  function bindTriggers() {
    if (bound) return
    bound = true
    $('a.social-icon.search.search--desktop').on('click', function () {
      if (typeof window.YinSearchBackend !== 'undefined' && window.YinSearchBackend.open) {
        window.YinSearchBackend.open()
      }
    })
    $('.search-mask, .search-close-button').on('click', closeSearch)
  }

  return {
    open: openSearch,
    close: closeSearch,
    bind: bindTriggers
  }
})()
