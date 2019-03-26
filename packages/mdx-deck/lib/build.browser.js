const webpack = require('webpack')
const createConfig = require('./config')

const buildBrowser = async (opts = {}) => {
  const config = createConfig(opts)

  config.mode = 'production'
  config.output = {
    path: opts.outDir,
    filename: '[name].[contenthash:8].js',
  }
  config.optimization = {
    splitChunks: {
      chunks: 'all',
    },
  }

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

module.exports = buildBrowser
