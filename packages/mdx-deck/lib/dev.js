const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const history = require('connect-history-api-fallback')
const serveStatic = require('serve-static')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const createConfig = require('./config')
const WebSocket = require('ws')

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
    const wss = new WebSocket.Server({ server, path: '/__socket' })
    wss.on('connection', ws => {
      ws.on('message', data => {
        try {
          const message = JSON.parse(data)
          if (message.type === 'broadcast') {
            wss.clients.forEach(client => {
              if (client != ws) {
                client.send(JSON.stringify(message))
              }
            })
          }
        } catch (err) {
          console.error('error in parsing message ', err)
        }
      })
    })
    compiler.hooks.done.tap('mdx-deck', () => {
      resolve(server)
    })
    const port = Number(opts.port)
    server.listen(port)
  })
}
