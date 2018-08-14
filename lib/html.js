const fs = require('fs')
const path = require('path')
const React = require('react')
const {
  renderToString,
  renderToStaticMarkup
} = require('react-dom/server')
const webpack = require('webpack')
const rimraf = require('rimraf')
const createConfig = require('./config')

const getApp = async opts => {
  opts.tempdir = path.join(opts.outDir, 'TEMP')

  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir)
  if (!fs.existsSync(opts.tempdir)) fs.mkdirSync(opts.tempdir)

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
        console.error(err)
      })
      resolve(App)
    })
  })
}

const renderHTML = async opts => {
  const App = await getApp(opts)
  const headTags = []
  const body = renderToString(
    React.createElement(App, { headTags })
  )
  const head = renderToStaticMarkup(headTags)
  return { body, head }
}

module.exports = renderHTML
