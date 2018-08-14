const webpack = require('webpack')
const createConfig = require('./config')
const renderHTML = require('./html')

const build = async (opts = {}) => {
  const { body, head } = await renderHTML(opts)
  opts.head = head
  opts.body = body
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
