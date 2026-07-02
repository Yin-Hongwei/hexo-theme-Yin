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

  $('.layout')
    .velocity('stop')
    .velocity('transition.slideUpIn', {
      delay: 200,
      duration: 600,
      easing: 'easeOutQuart'
    })
  $('#top-container')
    .velocity('stop')
    .velocity('transition.fadeIn', {
      delay: 200,
      duration: 600,
      easing: 'easeOutQuart'
    })
})

window.addEventListener('load', resetMoreHashScroll)
