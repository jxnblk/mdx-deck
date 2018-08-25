#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const initit = require('initit')

const logo = chalk.magenta('[mdx-deck]')
const log = (...args) => {
  console.log(logo, ...args)
}
log.error = (...args) => {
  console.log(chalk.red('[ERROR]'), ...args)
}

const template = 'jxnblk/mdx-deck/templates/basic'

const cli = meow(`
  Usage

    $ npm init deck my-presentation

    $ npx create-deck my-presentation

`, {
  booleanDefault: undefined,
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    }
  }
})

const [ name ] = cli.input

if (!name) {
  cli.showHelp(0)
}

// todo: ensure directory doesn't exist
initit({ name, template })
  .then(res => {
    log('created mdx-deck')
    process.exit(0)
  })
  .catch(err => {
    log.error('failed to create mdx-deck')
    log.error(err)
    process.exit(1)
  })
