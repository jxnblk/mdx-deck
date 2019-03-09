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

test('adds an export', () => {
  const code = mdx.sync(src, {
    mdPlugins: [plugin],
  })
  expect(typeof code).toBe('string')
  expect(code).toMatchSnapshot()
})
