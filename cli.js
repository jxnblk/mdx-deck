#!/usr/bin/env node

const open = require('react-dev-utils/openBrowser')
const dev = require('./lib/dev')

const opts = {
}

dev(opts)
  .then(res => {
    const url = 'http://localhost:' + res.port
    open(url)
    console.log(url)
  })
  .catch(err => {
    console.error(err)
  })
