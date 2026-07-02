(function () {
  var STORAGE_KEY = 'yin-theme-mode'
  var config = (window.GLOBAL_CONFIG && window.GLOBAL_CONFIG.darkMode) || {}
  if (!config.enable) return

  var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  function resolveTheme(mode) {
    if (mode === 'dark' || mode === 'light') return mode
    return mediaQuery.matches ? 'dark' : 'light'
  }

  function getStoredMode() {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch (err) {
      return null
    }
  }

  function setStoredMode(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch (err) {
      // ignore quota / privacy mode errors
    }
  }

  function applyTheme(resolved) {
    document.documentElement.setAttribute('data-theme', resolved)
    document.documentElement.style.colorScheme = resolved
    updateToggle(resolved)
  }

  function updateToggle(resolved) {
    var button = document.getElementById('dark-mode-toggle')
    if (!button) return
    var isDark = resolved === 'dark'
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false')
    button.setAttribute('aria-label', config.labels.toggle)
    button.title = isDark ? config.labels.light : config.labels.dark
    var icon = button.querySelector('.fa')
    if (icon) {
      icon.className = 'fa ' + (isDark ? 'fa-sun-o' : 'fa-moon-o')
    }
  }

  function getCurrentMode() {
    return getStoredMode() || config.default || 'auto'
  }

  function refreshTheme() {
    applyTheme(resolveTheme(getCurrentMode()))
  }

  function toggleTheme() {
    var current = getCurrentMode()
    var resolved = resolveTheme(current)
    var next = resolved === 'dark' ? 'light' : 'dark'
    setStoredMode(next)
    applyTheme(next)
  }

  function init() {
    refreshTheme()
    var button = document.getElementById('dark-mode-toggle')
    if (button) {
      button.addEventListener('click', toggleTheme)
    }
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', function () {
        if (getStoredMode() === 'auto' || !getStoredMode()) {
          refreshTheme()
        }
      })
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(function () {
        if (getStoredMode() === 'auto' || !getStoredMode()) {
          refreshTheme()
        }
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
