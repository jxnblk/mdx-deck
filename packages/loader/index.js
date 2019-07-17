const { getOptions } = require('loader-utils')
const mdx = require('@mdx-js/mdx')
const mdxPlugin = require('@mdx-deck/mdx-plugin')

module.exports = function(src) {
  const options = getOptions(this) || {}
  options.remarkPlugins = [
    ...options.remarkPlugins,
    ...(options.mdPlugins || []),
  ]
  options.remarkPlugins.push(mdxPlugin)

  const code = mdx.sync(src, options)
  return `/** @jsx mdx */
    import { mdx } from '@mdx-js/react'
    ${code}`
}
