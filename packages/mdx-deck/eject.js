const path = require('path')
const fs = require('fs-extra')
const initit = require('initit')

// TODO: update after v3 is in master
const template = 'jxnblk/mdx-deck/templates/basic'

module.exports = async ({ cwd, filename }) => {
  await initit({
    template,
    name: cwd,
  })
  fs.moveSync(filename, path.join(cwd, 'decks'))
}
