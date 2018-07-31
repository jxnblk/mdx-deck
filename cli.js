#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const open = require('react-dev-utils/openBrowser')
const chalk = require('chalk')
const ok = require('ok-cli')

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

const getConfig = conf => {
  conf.module.rules = [
    ...conf.module.rules
    .filter(rule => !rule.test.test('.mdx')),
    {
      test: /\.mdx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              'babel-preset-env',
              'babel-preset-stage-0',
              'babel-preset-react',
            ].map(require.resolve)
          }
        },
        require.resolve('./lib/loader.js'),
      ]
    }
  ]
  conf.module.rules[1].include.push(
    path.join(__dirname, './src')
  )

  return conf
}

const cli = meow(`
  ${chalk.magenta('[mdx-deck]')}

  ${chalk.gray('Usage')}

    $ ${chalk.magenta('mdx-deck deck.mdx')}

    $ ${chalk.magenta('mdx-deck build deck.mdx')}

    $ ${chalk.magenta('mdx-deck export deck.mdx')}

  ${chalk.gray('Options')}

    -p --port     Dev server port

    --no-open     Prevent from opening in default browser

    -d --out-dir  Output directory for exporting

    --title       Title for the HTML document

    --out-file    Filename for PDF export

`, {
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
      default: 'presentation.pdf'
    }
  }
})

const [ cmd, file ] = cli.input
const doc = file || cmd

if (!doc) cli.showHelp(0)

const opts = Object.assign({
  entry: path.join(__dirname, './src/entry.js'),
  dirname: path.dirname(path.resolve(doc)),
  globals: {
    DOC_FILENAME: JSON.stringify(path.resolve(doc))
  },
  config: getConfig,
  title: 'mdx-deck',
  outDir: 'dist'
}, config, cli.flags)

opts.outDir = path.resolve(opts.outDir)

switch (cmd) {
  case 'build':
    log('building')
    ok.build(opts)
      .then(res => {
        log('done')
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
  case 'export':
    log('building')
    const pdf = require('./lib/pdf')
    ok(opts)
      .then(({ server }) => {
        log('rendering PDF')
        pdf(opts)
          .then(filename => {
            server.close()
            log('PDF exported', filename)
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
    ok(opts)
      .then(res => {
        const url = 'http://localhost:' + res.port
        open(url)
        log('listening on', chalk.magenta(url))
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
}
