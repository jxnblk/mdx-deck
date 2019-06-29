// based on mini-html-webpack-plugin
const path = require('path')
const { RawSource } = require('webpack-sources')

class HTMLPlugin {
  constructor(options = {}) {
    this.options = options
    this.plugin = this.plugin.bind(this)
  }

  plugin(compilation, callback) {
    const { publicPath } = compilation.options.output
    const {
      filename = 'index.html',
      template = defaultTemplate,
      context,
    } = this.options

    const files = getFiles(compilation.entrypoints)
    const links = generateCSSReferences(files.css, publicPath)
    const scripts = generateJSReferences(files.js, publicPath)
    const ctx = Object.assign(
      {},
      files,
      {
        publicPath,
        links,
        scripts,
      },
      context
    )

    compilation.assets[filename] = new RawSource(template(ctx))

    callback()
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('MDXDeckHTMLPlugin', this.plugin)
  }
}

const getFiles = entrypoints => {
  const files = {}

  entrypoints.forEach(entry => {
    entry.getFiles().forEach(file => {
      const extension = path.extname(file).replace(/\./, '')

      if (!files[extension]) {
        files[extension] = []
      }

      files[extension].push(file)
    })
  })

  return files
}

const defaultTemplate = ({
  links,
  scripts,
  title = '',
  body = '',
  head = '',
  css = '',
  publicPath,
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
    <style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}</style>
    <meta name='generator' content='mdx-deck'>
    ${head}${links}
  </head>
  <body>
    <div id=root>${body}</div>
    ${scripts}
  </body>
</html>`

const generateCSSReferences = (files = [], publicPath = '') =>
  files
    .map(file => `<link href='${publicPath + file}' rel='stylesheet'>`)
    .join('')

const generateJSReferences = (files = [], publicPath = '') =>
  files.map(file => `<script src='${publicPath + file}'></script>`).join('')

module.exports = HTMLPlugin
module.exports.template = defaultTemplate
