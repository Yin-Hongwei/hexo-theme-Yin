$(function () {
  var $sidebar = $('#sidebar')
  var $toggle = $('#toggle-sidebar')
  var sidebarMedia = window.matchMedia('(min-width: 1025px)')

  function isSidebarViewport () {
    return sidebarMedia.matches
  }

  function syncToggleState (isOpen) {
    $toggle.toggleClass('on', isOpen).attr('aria-expanded', isOpen ? 'true' : 'false')
  }

  function syncSidebarForViewport () {
    if (!$sidebar.length || !$sidebar.data('display')) return

    if (isSidebarViewport()) {
      syncToggleState($sidebar.hasClass('is-open'))
      if ($sidebar.hasClass('is-open')) {
        requestAnimationFrame(function () {
          $sidebar.addClass('sidebar-animated')
        })
      }
    } else {
      $sidebar.removeClass('is-open sidebar-animated')
      syncToggleState(false)
    }
  }

  syncSidebarForViewport()
  sidebarMedia.addEventListener('change', syncSidebarForViewport)

  $('#toggle-sidebar').on('click', function () {
    if (isSidebarViewport() && $sidebar.is(':visible')) {
      var isOpen = $sidebar.hasClass('is-open')
      $sidebar.toggleClass('is-open', !isOpen).addClass('sidebar-animated')
      syncToggleState(!isOpen)
    }
  })

  function scrollActiveTocIntoView () {
    var $active = $('.sidebar-toc__content .toc-link.active')
    if (!$active.length) return

    var $container = $('.sidebar-toc__content')
    if (!$container.length) return

    var containerTop = $container.scrollTop()
    var containerHeight = $container.height()
    var linkTop = $active.position().top
    var linkHeight = $active.outerHeight()

    if (linkTop < 0) {
      $container.scrollTop(containerTop + linkTop - 12)
    } else if (linkTop + linkHeight > containerHeight) {
      $container.scrollTop(containerTop + linkTop - containerHeight + linkHeight + 12)
    }
  }

  window.scrollActiveTocIntoView = scrollActiveTocIntoView
})
