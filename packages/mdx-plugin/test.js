import test from 'ava'
import mdx from '@mdx-js/mdx'
import plugin from '.'

const src = `
export default props =>
  <section>
    {props.children}
  </section>

# Hello
---
## Two
---
## Three
`

test('adds an export', t => {
  const code = mdx.sync(src, {
    mdPlugins: [plugin],
  })
  t.is(typeof code, 'string')
  t.snapshot(code)
})
