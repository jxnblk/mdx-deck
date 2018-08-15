const chalk = require('chalk')

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

module.exports = log
