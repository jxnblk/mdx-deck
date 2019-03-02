const { getOptions } = require('loader-utils')
const mdx = require('@mdx-js/mdx')
// const normalizeNewline = require('normalize-newline')
const mdxPluginSplit = require('mdx-plugin-split')

module.exports = async function(src) {
  const callback = this.async()
  const options = getOptions(this) || {}
  // options.skipExport = true
  options.mdPlugins = options.mdPlugins || []
  options.mdPlugins.push(mdxPluginSplit)

  const result = mdx.sync(src, options)

  const code = `import React from 'react'
  import { MDXTag } from '@mdx-js/tag'
  ${result}`

  console.log(code)

  return callback(null, code)
}
