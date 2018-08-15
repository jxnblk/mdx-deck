const { getOptions } = require('loader-utils')
const mdx = require('@mdx-js/mdx')
const matter = require('gray-matter')
const stringifyObject = require('stringify-object')
const normalizeNewline = require('normalize-newline')

const SLIDEREG = /\n---\n/

module.exports = async function (src) {
  const callback = this.async()
  const options = getOptions(this) || {}
  options.skipExport = true

  const { data, content } = matter(src)

  const modules = []
  const slides = normalizeNewline(content)
    .split(SLIDEREG)
    .map(str => {
      const code = mdx.sync(str, options)
      const lines = code.split('\n')
      const tagIndex = lines.findIndex(str => /^</.test(str))
      modules.push(
        ...lines.slice(0, tagIndex)
          .filter(Boolean)
      )
      const jsx = lines.slice(tagIndex).join('\n')

      return `({ components, ...props }) => ${jsx}`
    })
    .map(str => str.trim())

  const code = `import React from 'react'
import { MDXTag } from '@mdx-js/tag'
${modules.join('\n')}
export const meta = ${stringifyObject(data)}

export default [
  ${slides.join(',\n\n')}
]`

  return callback(null, code)
}
