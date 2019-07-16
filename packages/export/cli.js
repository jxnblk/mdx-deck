#!/usr/bin/env node
const path = require('path')
const meow = require('meow')

const cli = meow(
  `

  Usage:

    $ mdx-deck-export pdf deck.mdx
    $ mdx-deck-export png deck.mdx

  Options:

    -d --out-dir    Output directory
    -f --out-file   Output filename
    -p --port       Server port
    -w --width      Width in pixels
    -h --height     Height in pixels
    --no-sandbox    Disable puppeteer sandbox

`,
  {
    flags: {
      outDir: {
        type: 'string',
        alias: 'd',
        default: 'dist',
      },
      outFile: {
        type: 'string',
        alias: 'f',
        default: 'presentation.pdf',
      },
      port: {
        type: 'string',
        alias: 'p',
        default: '8000',
      },
      width: {
        type: 'string',
        alias: 'w',
        default: 1280,
      },
      height: {
        type: 'string',
        alias: 'h',
        default: 960,
      },
      sandbox: {
        type: 'boolean',
        default: true,
      },
    },
  }
)

const [cmd, input] = cli.input

if (!input || !cmd) {
  cli.showHelp(0)
}

const opts = Object.assign({}, cli.flags, {
  input,
  dirname: path.dirname(path.resolve(input)),
  globals: {
    FILENAME: JSON.stringify(path.resolve(input)),
  },
  host: 'localhost',
  type: cmd,
})

require('./index')(opts)
  .then(filename => {
    console.log(`saved ${cmd} to`, filename)
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
