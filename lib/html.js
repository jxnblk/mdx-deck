const fs = require('fs')
const path = require('path')
const React = require('react')
const {
  renderToString,
  renderToStaticMarkup
} = require('react-dom/server')
const { ServerStyleSheet } = require('styled-components')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const createConfig = require('./config')

const getApp = async opts => {
  opts.tempdir = path.join(opts.outDir, 'TEMP')

  if (!fs.existsSync(opts.outDir)) mkdirp.sync(opts.outDir)
  if (!fs.existsSync(opts.tempdir)) mkdirp.sync(opts.tempdir)

  const config = createConfig(opts)

  config.output = {
    path: opts.tempdir,
    filename: '[name].js',
    libraryTarget: 'umd'
  }
  config.entry = {
    App: path.join(__dirname, '../dist/entry.js')
  }
  config.target = 'node'
  config.externals = [
    nodeExternals({
      whitelist: [
        'mdx-deck',
        'mdx-deck/themes',
        'mdx-deck/layouts'
      ]
    })
  ]

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      const App = require(
        path.resolve(opts.tempdir, './App.js')
      ).default
      rimraf(opts.tempdir, err => {
        if (err) console.error(err)
      })
      resolve(App)
    })
  })
}

const renderHTML = async opts => {
  const App = await getApp(opts)
  const headTags = []
  const sheet = new ServerStyleSheet()
  const body = renderToString(
    sheet.collectStyles(
      React.createElement(App, { headTags })
    )
  )
  const head = renderToStaticMarkup(headTags)
  const css = sheet.getStyleTags()
  return { body, head, css }
}

module.exports = renderHTML
