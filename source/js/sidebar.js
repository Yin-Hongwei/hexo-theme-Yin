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

    var container = $('.sidebar-toc__content')[0]
    if (!container) return

    var active = $active[0]
    var padding = 12
    var linkRect = active.getBoundingClientRect()
    var containerRect = container.getBoundingClientRect()
    var linkTop = linkRect.top - containerRect.top + container.scrollTop
    var linkHeight = active.offsetHeight
    var containerHeight = container.clientHeight

    if (linkTop - container.scrollTop < padding) {
      container.scrollTop = linkTop - padding
    } else if (linkTop + linkHeight - container.scrollTop > containerHeight - padding) {
      container.scrollTop = linkTop + linkHeight - containerHeight + padding
    }
  }

  window.scrollActiveTocIntoView = scrollActiveTocIntoView
})
