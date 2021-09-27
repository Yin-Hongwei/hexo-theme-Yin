$(function () {
  var initTop = 0
  // $('.toc-child').hide()

  // main of scroll
  $(window).scroll(throttle(function (event) {
    var currentTop = $(this).scrollTop()
    if (!isMobile()) {
      // head position
      findHeadPosition(currentTop)
    }
    var isUp = scrollDirection(currentTop)
    if (currentTop > 56) {
      if (isUp) {
        $('#page-header').hasClass('visible') ? $('#page-header').removeClass('visible') : console.log()
      } else {
        $('#page-header').hasClass('visible') ? console.log() : $('#page-header').addClass('visible')
      }
      $('#page-header').addClass('fixed')
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
      if (currentTop === 0) {
        $('#page-header').removeClass('fixed').removeClass('visible')
      }
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

  // head scroll
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
      offset: -70,
    })
  }

  // expand toc-item
  function expandToc ($item) {
    if ($item.is(':visible')) {
      return
    }
    $item.velocity('stop').velocity('transition.fadeIn', {
      duration: 500,
      easing: 'easeInQuart'
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
    // assume that we are not in the post page if no TOC link be found,
    // thus no need to update the status
    if ($('.toc-link').length === 0) {
      return false
    }

    var list = $('#post').find('h1,h2,h3,h4,h5,h6')
    var currentId = ''
    list.each(function () {
      var head = $(this)
      if (top > head.offset().top - 75) {
        currentId = '#' + $(this).attr('id')
      }
    })

    if (currentId === '') {
      $('.toc-link').removeClass('active')
      // $('.toc-child').hide()
    }

    // fix #286 since hexo v5.0.0 will
    // encodeURI the toc-item href
    var hexoVersion = '3.9.0'

    if (hexoVersion === '5') {
      currentId = encodeURI(currentId)
    }

    var currentActive = $('.toc-link.active')
    if (currentId && currentActive.attr('href') !== currentId) {
      updateAnchor(currentId)

      $('.toc-link').removeClass('active')
      var _this = $('.toc-link[href="' + currentId + '"]')
      _this.addClass('active')

      var parents = _this.parents('.toc-child')
      // Returned list is in reverse order of the DOM elements
      // Thus `parents.last()` is the outermost .toc-child container
      // i.e. list of subsections
      var topLink = (parents.length > 0) ? parents.last() : _this
      expandToc(topLink.closest('.toc-item').find('.toc-child'))
      topLink
        // Find all top-level .toc-item containers, i.e. sections
        // excluding the currently active one
        .closest('.toc-item').siblings('.toc-item')
        // Hide their respective list of subsections
        // .find('.toc-child').hide()
    }
  }
})
