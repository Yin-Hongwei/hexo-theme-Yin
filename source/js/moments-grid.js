$(function () {
  function isImageOnlyBlock($el) {
    if ($el.is('img')) return true
    if (!$el.find('img').length) return false

    var $clone = $el.clone()
    $clone.find('img, br, a').remove()
    if ($clone.text().replace(/\s/g, '')) return false

    return true
  }

  function buildImageGrid($content) {
    var groups = []
    var current = []

    $content.children().each(function () {
      var $el = $(this)
      if (isImageOnlyBlock($el)) {
        current.push($el)
      } else {
        if (current.length) {
          groups.push(current)
          current = []
        }
      }
    })

    if (current.length) groups.push(current)

    groups.forEach(function (group) {
      if (group.length < 2) return

      var count = Math.min(group.length, 9)
      var $grid = $('<div class="moments-img-grid"></div>').attr('data-count', count)
      group[0].before($grid)

      group.forEach(function ($el, idx) {
        var $cell = $('<div class="moments-img-cell"></div>')
        if (idx >= 9) {
          $cell.addClass('is-hidden')
        }
        if ($el.is('img')) {
          $cell.append($el)
        } else {
          $cell.append($el.contents())
          $el.remove()
        }
        $grid.append($cell)
      })

      if (group.length > 9) {
        $grid.find('.moments-img-cell').eq(8).addClass('has-more').append(
          $('<span class="moments-img-more"></span>').text('+' + (group.length - 9))
        )
      }
    })
  }

  function initImageGrids($root) {
    $root.each(function () {
      var $content = $(this)
      buildImageGrid($content)
      $content.find('.post-gallery').each(function () {
        buildImageGrid($(this))
      })
    })
  }

  initImageGrids($('.moments-content .content'))
  initImageGrids($('#page-content .article-container'))

  $(document).on('click', '.moments-action-btn', function (e) {
    e.stopPropagation()
    var $actions = $(this).closest('.moments-actions')
    $('.moments-actions.is-open').not($actions).removeClass('is-open')
    $actions.toggleClass('is-open')
  })

  $(document).on('click', function () {
    $('.moments-actions.is-open').removeClass('is-open')
  })

  $(document).on('click', '.moments-action-menu', function (e) {
    e.stopPropagation()
  })
})
