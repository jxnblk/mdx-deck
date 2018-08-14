#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const open = require('react-dev-utils/openBrowser')
const chalk = require('chalk')
const remark = {
  emoji: require('remark-emoji'),
  unwrapImages: require('remark-unwrap-images')
}
const pkg = require('./package.json')

const config = require('pkg-conf').sync('mdx-deck')

const log = (...args) => {
  console.log(
    chalk.magenta('[mdx-deck]'),
    ...args
  )
}
log.error = (...args) => {
  console.log(
    chalk.red('[err]'),
    ...args
  )
}

const cli = meow(`
  ${chalk.gray('Usage')}

    $ ${chalk.magenta('mdx-deck deck.mdx')}

    $ ${chalk.magenta('mdx-deck build deck.mdx')}

    $ ${chalk.magenta('mdx-deck pdf deck.mdx')}

  ${chalk.gray('Options')}

    --title       Title for the HTML document

    ${chalk.gray('Dev server options')}

      -p --port     Dev server port
      --no-open     Prevent from opening in default browser

    ${chalk.gray('Build options')}

      -d --out-dir  Output directory for exporting

    ${chalk.gray('PDF options')}

      --out-file    Filename for PDF export
      --width       Width in pixels
      --heigh       Height in pixels

`, {
  description: chalk.magenta('[mdx-deck] ') + chalk.gray(pkg.description),
  flags: {
    port: {
      type: 'string',
      alias: 'p'
    },
    open: {
      type: 'boolean',
      alias: 'o',
      default: true
    },
    outDir: {
      type: 'string',
      alias: 'd'
    },
    title: {
      type: 'string'
    },
    outFile: {
      type: 'string',
    }
  }
})

const [ cmd, file ] = cli.input
const doc = file || cmd

if (!doc) cli.showHelp(0)

const opts = Object.assign({
  dirname: path.dirname(path.resolve(doc)),
  globals: {
    FILENAME: JSON.stringify(path.resolve(doc))
  },
  title: 'mdx-deck',
  port: 8080,
  outDir: 'dist',
  outFile: 'presentation.pdf'
}, config, cli.flags)

opts.outDir = path.resolve(opts.outDir)

let dev

switch (cmd) {
  case 'build':
    log('building')
    const build = require('./lib/build')
    build(opts)
      .then(res => {
        log('done')
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
  case 'pdf':
    log('exporting to PDF')
    const pdf = require('./lib/pdf')
    dev = require('./lib/dev')
    dev(opts)
      .then(({ server }) => {
        log('rendering PDF')
        pdf(opts)
          .then(filename => {
            server.close()
            log('done', filename)
            process.exit(0)
          })
          .catch(err => {
            log.error(err)
            process.exit(1)
          })
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
  case 'screenshot':
    log('exporting to PNG')
    const screenshot = require('./lib/screenshot')
    dev = require('./lib/dev')
    dev(opts)
      .then(({ server }) => {
        log('rendering screenshot')
        screenshot(opts)
          .then(filename => {
            server.close()
            log('done', filename)
            process.exit(0)
          })
          .catch(err => {
            log.error(err)
            process.exit(1)
          })
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
      .then(res => {
        const url = 'http://localhost:' + res.port
        if (opts.open) open(url)
        log('listening on', chalk.magenta(url))
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
}
