#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const findup = require('find-up')
const open = require('react-dev-utils/openBrowser')
const chalk = require('chalk')
const pkg = require('./package.json')

const config = require('pkg-conf').sync('mdx-deck')

const log = (...args) => {
  console.log(chalk.green('[mdx-deck]'), ...args)
}
log.error = (...args) => {
  console.log(chalk.red('[err]'), ...args)
}

const cli = meow(
  `
  ${chalk.gray('Usage')}

    $ ${chalk.green('mdx-deck deck.mdx')}

    $ ${chalk.green('mdx-deck build deck.mdx')}

  ${chalk.gray('Options')}

      -h --host     Dev server host
      -p --port     Dev server port
      --no-open     Prevent from opening in default browser
      --webpack     Path to webpack config file
      -d --out-dir  Output directory for exporting

`,
  {
    description: chalk.green('[mdx-deck] ') + chalk.gray(pkg.description),
    flags: {
      port: {
        type: 'string',
        alias: 'p',
      },
      host: {
        type: 'string',
        alias: 'h',
      },
      open: {
        type: 'boolean',
        alias: 'o',
        default: true,
      },
      outDir: {
        type: 'string',
        alias: 'd',
      },
      webpack: {
        type: 'string',
      },
    },
  }
)

const [cmd, file] = cli.input
const doc = file || cmd

if (!doc) cli.showHelp(0)

const opts = Object.assign(
  {
    dirname: path.dirname(path.resolve(doc)),
    globals: {
      FILENAME: JSON.stringify(path.resolve(doc)),
    },
    host: 'localhost',
    port: 8080,
    outDir: 'dist',
  },
  config,
  cli.flags
)

opts.outDir = path.resolve(opts.outDir)
if (opts.webpack) {
  opts.webpack = require(path.resolve(opts.webpack))
} else {
  const webpackConfig = findup.sync('webpack.config.js', { cwd: opts.dirname })
  if (webpackConfig) opts.webpack = require(webpackConfig)
}

let dev

switch (cmd) {
  case 'build':
    log('building')
    const build = require('./lib/build')
    build(opts)
      .then(res => {
        log('done')
        process.exit(0)
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
  case 'dev':
  default:
    log('starting dev server')
    dev = require('./lib/dev')
    dev(opts)
      .then(server => {
        const { address, port } = server.address()
        const url = `http://localhost:${port}`
        if (opts.open) open(url)
        log('listening on', chalk.green(url))
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
}
