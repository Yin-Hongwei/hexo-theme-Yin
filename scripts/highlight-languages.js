'use strict'

const hljs = require('highlight.js')
const alias = require('hexo-util/highlight_alias.json')

function registerLanguage(name, definer) {
  if (!hljs.getLanguage(name)) {
    hljs.registerLanguage(name, definer)
  }
}

function registerAlias(key, value) {
  if (!alias.aliases[key]) {
    alias.aliases[key] = value
  }
}

function registerAliases(pairs) {
  pairs.forEach(function (pair) {
    registerAlias(pair[0], pair[1])
  })
}

function vueLanguage(hljs) {
  return {
    name: 'Vue',
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<!--', '-->', { relevance: 10 }),
      {
        begin: /^(\s*)(<script>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'javascript',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<script\s+[^>]*lang=["']ts["'][^>]*>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'typescript',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style(\s+scoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'css',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style\s+[^>]*lang=["'](scss|sass)["'][^>]*>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'scss',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style\s+[^>]*lang=["']stylus["'][^>]*>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'stylus',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  }
}

function svelteLanguage(hljs) {
  return {
    name: 'Svelte',
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<!--', '-->', { relevance: 10 }),
      {
        begin: /^(\s*)(<script(\s*context="module")?>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'javascript',
        excludeBegin: true,
        excludeEnd: true,
        contains: [
          {
            begin: /^(\s*)(\$:)/gm,
            end: /(\s*)/gm,
            className: 'keyword'
          }
        ]
      },
      {
        begin: /^(\s*)(<script\s+[^>]*lang=["']ts["'][^>]*>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'typescript',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style[^>]*>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'css',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /\{/gm,
        end: /\}/gm,
        subLanguage: 'javascript',
        contains: [
          { begin: /[\{]/, end: /[\}]/, skip: true },
          {
            begin: /([#:\/@])(if|else|each|await|then|catch|debug|html)/gm,
            className: 'keyword',
            relevance: 10
          }
        ]
      }
    ]
  }
}

function ejsLanguage(hljs) {
  return {
    name: 'EJS',
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<%#', '%>'),
      {
        begin: /<%[=-]?/,
        end: /%>/,
        subLanguage: 'javascript',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  }
}

function treeLanguage(hljs) {
  return {
    name: 'Tree',
    aliases: ['dir', 'directory'],
    contains: [
      {
        className: 'keyword',
        begin: /[│├└─]+/
      },
      {
        className: 'string',
        begin: /[\w.-]+\.(vue|js|ts|tsx|jsx|css|scss|sass|less|styl|html|json|md|yml|yaml|xml|svg|png|jpg|ico)\b/
      },
      {
        className: 'title',
        begin: /\b(src|assets|css|js|dist|build|public|node_modules|components|pages|layouts)\b/
      }
    ]
  }
}

registerLanguage('vue', vueLanguage)
registerLanguage('svelte', svelteLanguage)
registerLanguage('ejs', ejsLanguage)
registerLanguage('tree', treeLanguage)

registerAliases([
  ['vue', 'vue'],
  ['svelte', 'svelte'],
  ['ejs', 'ejs'],
  ['tree', 'tree'],
  ['dir', 'tree'],
  ['directory', 'tree']
])

hljs.registerAliases(['nuxt'], { languageName: 'vue' })
hljs.registerAliases(['htm', 'wxml', 'pom', 'svg', 'xsl', 'xslt', 'spring'], { languageName: 'xml' })
hljs.registerAliases(['sass'], { languageName: 'scss' })
hljs.registerAliases(['postcss'], { languageName: 'css' })
hljs.registerAliases(['terminal', 'console'], { languageName: 'shell' })
hljs.registerAliases(['env'], { languageName: 'properties' })
hljs.registerAliases(['git', 'npm', 'yarn', 'pnpm'], { languageName: 'bash' })
hljs.registerAliases(['react'], { languageName: 'javascript' })

registerAliases([
  ['nuxt', 'vue'],
  ['htm', 'xml'],
  ['pom', 'xml'],
  ['svg', 'xml'],
  ['xsl', 'xml'],
  ['xslt', 'xml'],
  ['spring', 'xml'],
  ['sass', 'scss'],
  ['postcss', 'css'],
  ['terminal', 'shell'],
  ['env', 'properties'],
  ['git', 'bash'],
  ['npm', 'bash'],
  ['yarn', 'bash'],
  ['pnpm', 'bash'],
  ['react', 'javascript'],
  ['wxml', 'xml']
])

;['vue', 'svelte', 'ejs', 'tree'].forEach(function (lang) {
  if (!alias.languages.includes(lang)) {
    alias.languages.push(lang)
  }
})
