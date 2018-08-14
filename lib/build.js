const webpack = require('webpack')
const createConfig = require('./config')
const renderHTML = require('./html')
const dev = require('./dev')
const screenshot = require('./screenshot')
const log = require('./log')

const build = async (opts = {}) => {
  // get og:image
  log('rendering og image')
  const { server } = await dev(opts)
  opts.card = await screenshot(opts)
  await server.close()

  // get head and ssr
  log('building static html')
  const { body, head } = await renderHTML(opts)
  opts.head = head
  opts.body = body

  // bundle
  const config = createConfig(opts)

  config.mode = 'production'
  config.output = {
    path: opts.outDir
  }

  const compiler = webpack(config)
  log('bundling js')

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
