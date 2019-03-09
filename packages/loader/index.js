const { getOptions } = require('loader-utils')
const mdx = require('@mdx-js/mdx')
const mdxPlugin = require('@mdx-deck/mdx-plugin')

module.exports = async function(src) {
  const callback = this.async()
  const options = getOptions(this) || {}
  options.mdPlugins = options.mdPlugins || []
  options.mdPlugins.push(mdxPlugin)

  const result = mdx.sync(src, options)

  const code = `/** @jsx mdx */
  import mdx from '@mdx-js/mdx/create-element'
  ${result}`

  return callback(null, code)
}
