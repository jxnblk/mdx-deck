const path = require('path')
const Koa = require('koa')
const getPort = require('get-port')
const koaWebpack = require('koa-webpack')
const koaStatic = require('koa-static')
const createConfig = require('./config')

const devMiddleware = {
  publicPath: '/',
  clientLogLevel: 'error',
  stats: 'errors-only',
  logLevel: 'error',
}

const start = async (opts = {}) => {
  const app = new Koa()
  opts.host = opts.host || 'localhost'
  opts.hotPort = await getPort()
  const hotClient = {
    port: opts.hotPort,
    host: opts.host,
    logLevel: 'error'
  }
  opts.dirname = opts.dirname || path.dirname(opts.entry)
  const config = createConfig(opts)
  config.entry.push(
    path.join(__dirname, './overlay.js')
  )

  const middleware = await koaWebpack({
    config,
    devMiddleware,
    hotClient
  })
  const port = opts.port || await getPort()
  app.use(middleware)
  app.use(koaStatic(opts.dirname))

  const server = app.listen(port, opts.host)
  return new Promise((resolve) => {
    middleware.devMiddleware.waitUntilValid(() => {
      resolve({ server, app, middleware, port })
    })
  })
}

module.exports = start
