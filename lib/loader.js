const mdx = require('@mdx-js/mdx')
const matter = require('gray-matter')
const stringifyObject = require('stringify-object')

const EXREG = /export\sdefault\s/g

module.exports = async function (src) {
  const callback = this.async()

  const { data, content } = matter(src)

  const slides = content.split('---\n')
    .map(str => mdx.sync(str))
    .map(str => str.trim())
    .map(str => str.replace(EXREG, ''))

  console.log(data)
  const {
    modules = []
  } = data

  const code = `import React from 'react'
import { MDXTag } from '@mdx-js/tag'
${modules.join('\n')}

export const meta = ${stringifyObject(data)}

export default [
  ${slides.join(',\n\n')}
]`
  // console.log(code)

  return callback(null, code)
}
