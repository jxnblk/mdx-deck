const webpack = require('webpack')
const createConfig = require('./config')
const log = require('./log')

// todo
// - [ ] render static head
// - [ ] render static css

const build = async (opts = {}) => {
  log('bundling js')
  const config = createConfig(opts)

  config.mode = 'production'
  config.output = {
    path: opts.outDir,
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
