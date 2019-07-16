const path = require('path')
const fs = require('fs-extra')
const initit = require('initit')

const template = 'jxnblk/mdx-deck/packages/starter'

module.exports = async ({ cwd, filename }) => {
  await initit({
    template,
    name: cwd,
  })
  fs.moveSync(filename, path.join(cwd, 'decks'))
}
