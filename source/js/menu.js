$(function () {
  var $body = $('body')
  var $toggle = $('.toggle-menu')
  var $menus = $('.mobile-nav-panel')
  var $backdrop = $('.mobile-nav-backdrop')
  var $origin = $('.header-actions-main')
  var mobileQuery = window.matchMedia('(max-width: 768px)')

  function isMobileNav () {
    return mobileQuery.matches && $toggle.length && $toggle.is(':visible')
  }

  function mountNav () {
    if (!$menus.length || !$backdrop.length || !$origin.length) return

    if (mobileQuery.matches) {
      $body.append($backdrop).append($menus)
    } else {
      closeMenu()
      $origin.prepend($menus)
      $('.header-actions').after($backdrop)
    }
  }

  function openMenu () {
    if (!isMobileNav()) return
    mountNav()
    $body.addClass('mobile-nav-open')
    $toggle.attr('aria-expanded', 'true')
    $backdrop.attr('aria-hidden', 'false')
    $menus.attr('aria-hidden', 'false')
  }

  function closeMenu () {
    $body.removeClass('mobile-nav-open')
    $toggle.attr('aria-expanded', 'false')
    $backdrop.attr('aria-hidden', 'true')
    syncNavA11y()
  }

  function toggleMenu () {
    if ($body.hasClass('mobile-nav-open')) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  function syncNavA11y () {
    if (isMobileNav()) {
      if (!$body.hasClass('mobile-nav-open')) {
        $menus.attr('aria-hidden', 'true')
      }
    } else {
      $menus.attr('aria-hidden', 'false')
    }
  }

  mountNav()
  syncNavA11y()

  $toggle.on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    toggleMenu()
  })

  $backdrop.on('click', function () {
    closeMenu()
  })

  $menus.on('click', 'a[href]', function () {
    if (!isMobileNav()) return

    var href = $(this).attr('href')
    if (!href || href === 'javascript:void(0);') return

    closeMenu()
  })

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu()
    }
  })

  $(window).on('resize', debounce(function () {
    mountNav()
    if (!isMobileNav()) {
      closeMenu()
    }
    syncNavA11y()
  }, 150))

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', function () {
      mountNav()
      if (!mobileQuery.matches) {
        closeMenu()
      }
      syncNavA11y()
    })
  }
})
