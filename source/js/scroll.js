$(function () {
  var initTop = 0
  var $momentsHeader = $('#page-header.moments-profile-header')
  $('.toc-child').hide()

  function updateMomentsHeader (currentTop) {
    var coverHeight = $('.moments-cover').outerHeight() || 280
    var isScrolled = $momentsHeader.hasClass('scrolled')
    if (!isScrolled && currentTop >= coverHeight) {
      $momentsHeader.addClass('scrolled')
    } else if (isScrolled && currentTop < coverHeight - 24) {
      $momentsHeader.removeClass('scrolled')
    }
  }

  // main of scroll
  $(window).scroll(throttle(function (event) {
    var currentTop = $(this).scrollTop()
    if (!isMobile()) {
      findHeadPosition(currentTop)
    }

    if ($momentsHeader.length) {
      updateMomentsHeader(currentTop)
    } else {
      var isUp = scrollDirection(currentTop)
      if (currentTop > 60) {
        if (isUp) {
          $('#page-header').hasClass('visible') ? $('#page-header').removeClass('visible') : console.log()
        } else {
          $('#page-header').hasClass('visible') ? console.log() : $('#page-header').addClass('visible')
        }
        $('#page-header').addClass('fixed')
      } else if (currentTop === 0) {
        $('#page-header').removeClass('fixed').removeClass('visible')
      }
    }

    if (currentTop > 60) {
      if ($('#go-up').css('opacity') === '0') {
        $('#go-up').velocity('stop').velocity({
          translateX: -30,
          rotateZ: 360,
          opacity: 1
        }, {
          easing: 'easeOutQuart',
          duration: 200
        })
      }
    } else {
      $('#go-up').velocity('stop').velocity({
        translateX: 0,
        rotateZ: 180,
        opacity: 0
      }, {
        easing: 'linear',
        duration: 200
      })
    }
  }, 50, 100))

  if ($momentsHeader.length) {
    updateMomentsHeader($(window).scrollTop())
  }

  // go up smooth scroll
  $('#go-up').on('click', function () {
    $('body').velocity('stop').velocity('scroll', {
      duration: 500,
      easing: 'easeOutQuart'
    })
  })

  // head scroll
  $('#post-content').find('h1,h2,h3,h4,h5,h6').on('click', function (e) {
    scrollToHead('#' + $(this).attr('id'))
  })

  // toc link scroll
  $('.toc-link').on('click', function (e) {
    e.preventDefault()
    scrollToHead($(this).attr('href'))
  })

  // find the scroll direction
  function scrollDirection (currentTop) {
    var result = currentTop > initTop // true is down & false is up
    initTop = currentTop
    return result
  }

  // scroll to a head(anchor)
  function scrollToHead (anchor) {
    var item
    try {
      item = $(anchor)
    } catch (e) {
      // fix #286 support hexo v5
      item = $(decodeURI(anchor))
    }
    item.velocity('stop').velocity('scroll', {
      duration: 500,
      easing: 'easeInOutQuart',
      offset: -70
    })
  }

  // expand toc-item
  function expandToc ($item) {
    if ($item.is(':visible')) {
      return
    }
    $item.velocity('stop').velocity('transition.fadeIn', {
      duration: 200,
      easing: 'easeOutQuart'
    })
  }

  function updateAnchor (anchor) {
    if (window.history.replaceState && anchor !== window.location.hash) {
      window.history.replaceState(undefined, undefined, anchor)
    }
  }

  // find head position & add active class
  // DOM Hierarchy:
  // ol.toc > (li.toc-item, ...)
  // li.toc-item > (a.toc-link, ol.toc-child > (li.toc-item, ...))
  function findHeadPosition (top) {
    if ($('.toc-link').length === 0) {
      return false
    }

    var list = $('#post-content').find('h1,h2,h3,h4,h5,h6')
    var currentId = ''
    list.each(function () {
      var head = $(this)
      if (top > head.offset().top - 75) {
        currentId = '#' + $(this).attr('id')
      }
    })

    if (currentId === '') {
      $('.toc-link').removeClass('active')
      $('.toc-child').hide()
    }

    // fix #286 since hexo v5.0.0 will encodeURI the toc-item href
    var hexoVersion = (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.hexoVersion)
      ? GLOBAL_CONFIG.hexoVersion[0]
      : '0'

    if (parseInt(hexoVersion, 10) >= 5) {
      currentId = encodeURI(currentId)
    }

    var currentActive = $('.toc-link.active')
    if (currentId && currentActive.attr('href') !== currentId) {
      updateAnchor(currentId)

      $('.toc-link').removeClass('active')
      var _this = $('.toc-link[href="' + currentId + '"]')
      _this.addClass('active')

      var parents = _this.parents('.toc-child')
      var topLink = (parents.length > 0) ? parents.last() : _this
      expandToc(topLink.closest('.toc-item').find('.toc-child'))
      topLink
        .closest('.toc-item').siblings('.toc-item')
        .find('.toc-child').hide()

      if (typeof window.scrollActiveTocIntoView === 'function') {
        window.scrollActiveTocIntoView()
      }
    }
  }

  if (!isMobile()) {
    findHeadPosition($(window).scrollTop())
  }
})
