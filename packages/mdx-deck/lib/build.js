const path = require('path')
const webpack = require('webpack')
const React = require('react')
const { renderToString, renderToStaticMarkup } = require('react-dom/server')
const HTMLPlugin = require('@mdx-deck/webpack-html-plugin')
const rimraf = require('rimraf')
const createConfig = require('./config')

const getApp = async (config, opts) => {
  const serverConfig = Object.assign({}, config, {
    target: 'node',
    output: {
      path: opts.outDir,
      filename: '__app.js',
      libraryTarget: 'umd',
    },
    externals: ['react', 'react-dom'],
  })
  const compiler = webpack(serverConfig)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      if (stats.compilation.errors && stats.compilation.errors.length) {
        reject(stats.compilation.errors)
        return
      }

      const filename = path.resolve(opts.outDir, './__app.js')
      const App = require(filename).default
      rimraf.sync(filename)
      resolve(App)
    })
  })
}

const renderHTML = async App => {
  const headTags = []
  const body = renderToString(
    React.createElement(App, {
      headTags,
    })
  )
  const head = renderToStaticMarkup(
    React.createElement(React.Fragment, null, headTags)
  )
  return { body, head }
}

const build = async (opts = {}) => {
  const config = createConfig(opts)

  const App = await getApp(config, opts)
  const { body, head } = await renderHTML(App)

  config.mode = 'production'
  config.output = {
    path: opts.outDir,
  }

  config.plugins.push(
    new HTMLPlugin({
      context: { head },
    }),
    new HTMLPlugin({
      filename: '404.html',
      context: { head },
    })
  )

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }

      if (stats.compilation.errors && stats.compilation.errors.length) {
        reject(stats.compilation.errors)
        return
      }

      resolve(stats)
    })
  })
}

module.exports = build
