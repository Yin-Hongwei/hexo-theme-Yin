(function () {
  var LANG_LABELS = {
    js: 'JavaScript',
    javascript: 'JavaScript',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    bash: 'Shell',
    sh: 'Shell',
    shell: 'Shell',
    python: 'Python',
    py: 'Python',
    java: 'Java',
    html: 'HTML',
    xml: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    vue: 'Vue',
    svelte: 'Svelte',
    ejs: 'EJS',
    nuxt: 'Nuxt',
    react: 'React',
    jsx: 'JSX',
    tsx: 'TSX',
    docker: 'Dockerfile',
    dockerfile: 'Dockerfile',
    graphql: 'GraphQL',
    gql: 'GraphQL',
    nginx: 'Nginx',
    rust: 'Rust',
    rs: 'Rust',
    kotlin: 'Kotlin',
    kt: 'Kotlin',
    swift: 'Swift',
    php: 'PHP',
    csharp: 'C#',
    cs: 'C#',
    terminal: 'Terminal',
    console: 'Terminal',
    git: 'Git',
    npm: 'NPM',
    yarn: 'Yarn',
    pnpm: 'PNPM',
    env: 'Env',
    properties: 'Properties',
    ini: 'INI',
    toml: 'TOML',
    http: 'HTTP',
    https: 'HTTP',
    go: 'Go',
    c: 'C',
    cpp: 'C++',
    'c++': 'C++',
    sql: 'SQL',
    md: 'Markdown',
    markdown: 'Markdown',
    diff: 'Diff',
    plaintext: 'Text',
    text: 'Text',
    tree: 'Tree',
    dir: 'Tree',
    directory: 'Tree'
  }

  function getLanguage(figure) {
    var lang = figure.className
      .replace('highlight', '')
      .trim()
      .split(/\s+/)[0]
    return LANG_LABELS[lang] || lang || 'Code'
  }

  function getCodeText(figure) {
    var codeEl = figure.querySelector('.code pre') || figure.querySelector('pre')
    if (!codeEl) return ''
    return codeEl.innerText || codeEl.textContent || ''
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy') ? resolve() : reject()
      } catch (err) {
        reject(err)
      } finally {
        document.body.removeChild(textarea)
      }
    })
  }

  function setIcon(button, iconClass) {
    var icon = button.querySelector('.fa')
    if (!icon) return
    icon.className = 'fa ' + iconClass
  }

  function showCopyFeedback(button) {
    setIcon(button, 'fa-check')
    button.classList.add('copied')
    window.setTimeout(function () {
      setIcon(button, 'fa-copy')
      button.classList.remove('copied')
    }, 2000)
  }

  function showCopyError(button) {
    setIcon(button, 'fa-times')
    button.classList.add('copy-error')
    window.setTimeout(function () {
      setIcon(button, 'fa-copy')
      button.classList.remove('copy-error')
    }, 2000)
  }

  function initCodeBlocks() {
    document.querySelectorAll('figure.highlight').forEach(function (figure) {
      if (figure.closest('.code-block-wrap')) return

      var wrap = document.createElement('div')
      wrap.className = 'code-block-wrap'
      figure.parentNode.insertBefore(wrap, figure)
      wrap.appendChild(figure)

      var header = document.createElement('div')
      header.className = 'code-block-header'

      var lang = document.createElement('span')
      lang.className = 'code-block-lang'
      lang.textContent = getLanguage(figure)

      var button = document.createElement('button')
      button.type = 'button'
      button.className = 'code-block-copy'
      button.setAttribute('aria-label', '复制代码')
      button.innerHTML = '<i class="fa fa-copy" aria-hidden="true"></i>'

      button.addEventListener('click', function () {
        copyText(getCodeText(figure))
          .then(function () {
            showCopyFeedback(button)
          })
          .catch(function () {
            showCopyError(button)
          })
      })

      header.appendChild(lang)
      header.appendChild(button)
      wrap.insertBefore(header, figure)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeBlocks)
  } else {
    initCodeBlocks()
  }
})()
