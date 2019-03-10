const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const history = require('connect-history-api-fallback')
const serveStatic = require('serve-static')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const createConfig = require('./config')

module.exports = async (opts = {}) => {
  const config = createConfig(opts)

  config.entry.unshift('webpack-hot-middleware/client')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.mode = 'development'

  const app = connect()
  const compiler = webpack(config)

  app.use(history())
  app.use(serveStatic(opts.dirname))
  app.use(
    devMiddleware(compiler, {
      stats: 'errors-only',
      logLevel: 'error',
      publicPath: '/',
    })
  )
  app.use(
    hotMiddleware(compiler, {
      log: false,
    })
  )

  return new Promise(resolve => {
    const server = http.createServer(app)
    compiler.hooks.done.tap('mdx-deck', () => {
      resolve(server)
    })
    const port = Number(opts.port)
    server.listen(port)
  })
}
