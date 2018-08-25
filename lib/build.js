const webpack = require('webpack')
const createConfig = require('./config')
const renderHTML = require('./html')
const log = require('./log')

const build = async (opts = {}) => {
  if (opts.html) {
    log('rendering static html')
    const { body, head, css } = await renderHTML(opts)
    Object.assign(opts, {
      body,
      head,
      css,
    })
  }

  log('bundling js')
  const config = createConfig(opts)

  config.mode = 'production'
  config.output = {
    path: opts.outDir
  }

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      resolve(stats)
    })
  })
}

module.exports = build
