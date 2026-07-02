$(function () {
  var loadFlag = false

  function search(path) {
    $.ajax({
      url: GLOBAL_CONFIG.root + path,
      dataType: 'xml',
      success: function (xmlResponse) {
        var datas = $('entry', xmlResponse).map(function () {
          return {
            title: $('title', this).text(),
            content: $('content', this).text(),
            url: $('url', this).text()
          }
        }).get()
        var $input = $('#site-search-input input')[0]
        var $resultContent = $('#site-search-hits')[0]
        $input.addEventListener('input', function () {
          var str = '<div class="search-result-list">'
          var keywords = this.value.trim().toLowerCase().split(/[\s]+/)
          $resultContent.innerHTML = ''
          if (this.value.trim().length <= 0) {
            return
          }
          var count = 0
          datas.forEach(function (data) {
            var isMatch = true
            var dataTitle = data.title.trim().toLowerCase()
            var dataContent = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase()
            var dataUrl = data.url
            var indexTitle = -1
            var indexContent = -1
            if (dataTitle !== '' && dataContent !== '') {
              keywords.forEach(function (keyword) {
                indexTitle = dataTitle.indexOf(keyword)
                indexContent = dataContent.indexOf(keyword)
                if (indexTitle < 0 && indexContent < 0) {
                  isMatch = false
                } else if (indexContent < 0) {
                  indexContent = 0
                }
              })
            }
            if (isMatch) {
              if (!dataUrl.startsWith('/')) {
                dataUrl = '/' + dataUrl
              }
              str += '<div class="search__hit-item"><a href="' + dataUrl + '" class="search-result-title">' + dataTitle + '</a></div>'
              count += 1
            }
          })
          if (count === 0) {
            str += '<div class="search__hits-empty">' + GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/, this.value.trim()) + '</div>'
          }
          $resultContent.innerHTML = str
        })
      }
    })
  }

  window.YinSearchBackend = {
    open: function () {
      YinSearchDialog.open(function () {
        if (!loadFlag) {
          search(GLOBAL_CONFIG.localSearch.path)
          loadFlag = true
        }
      })
    }
  }

  YinSearchDialog.bind()
})
