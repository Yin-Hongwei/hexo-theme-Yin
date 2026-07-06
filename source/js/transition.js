function resetMoreHashScroll () {
  if (window.location.hash === '#more') {
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.scrollTo(0, 0)
  }
}

$(function () {
  resetMoreHashScroll()

  var $layout = $('.layout')
  var $topContainer = $('#top-container')

  function showLayout () {
    $layout.css('opacity', 1)
    $topContainer.css('opacity', 1)
  }

  if (!$.fn.velocity) {
    showLayout()
    return
  }

  $layout
    .velocity('stop')
    .velocity('transition.slideUpIn', {
      delay: 200,
      duration: 600,
      easing: 'easeOutQuart',
      complete: showLayout
    })
  $topContainer
    .velocity('stop')
    .velocity('transition.fadeIn', {
      delay: 200,
      duration: 600,
      easing: 'easeOutQuart'
    })

  setTimeout(showLayout, 1200)
})

window.addEventListener('load', resetMoreHashScroll)
