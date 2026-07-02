$(function () {
  var config = GLOBAL_CONFIG.algoliaSearch
  if (!config || !config.appId || !config.apiKey || !config.indexName) return

  var client = algoliasearch(config.appId, config.apiKey)
  var index = client.initIndex(config.indexName)
  var $input = $('#site-search-input input')
  var $resultContent = $('#site-search-hits')
  var debounceTimer = null

  function renderHits(hits, query) {
    if (!query.trim()) {
      $resultContent.empty()
      return
    }
    if (!hits.length) {
      $resultContent.html(
        '<div class="search__hits-empty">' +
          config.languages.hits_empty.replace(/\$\{query}/, query.trim()) +
        '</div>'
      )
      return
    }
    var html = '<div class="search-result-list">'
    hits.forEach(function (hit) {
      var url = hit.url || hit.permalink || hit.link || ''
      if (url && !url.startsWith('/')) {
        url = '/' + url
      }
      var title = hit.title || hit._highlightResult && hit._highlightResult.title && hit._highlightResult.title.value || 'Untitled'
      html += '<div class="search__hit-item"><a href="' + url + '" class="search-result-title">' + title + '</a></div>'
    })
    html += '</div>'
    $resultContent.html(html)
  }

  function search(query) {
    index.search(query, {
      hitsPerPage: config.hitsPerPage || 10,
      attributesToRetrieve: ['title', 'url', 'permalink'],
      attributesToHighlight: ['title']
    }).then(function (result) {
      renderHits(result.hits, query)
    }).catch(function () {
      $resultContent.html(
        '<div class="search__hits-empty">' +
          config.languages.hits_empty.replace(/\$\{query}/, query.trim()) +
        '</div>'
      )
    })
  }

  window.YinSearchBackend = {
    open: function () {
      YinSearchDialog.open()
    }
  }

  YinSearchDialog.bind()

  $input.on('input', function () {
    var query = this.value
    window.clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(function () {
      search(query)
    }, 200)
  })
})
