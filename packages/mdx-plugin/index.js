const visit = require('unist-util-visit')
const is = require('unist-util-is')
const mdxAstToMdxHast = require('@mdx-js/mdx/mdx-ast-to-mdx-hast')

// custom implementation
// this can be removed in favor of https://github.com/mdx-js/mdx/issues/454
const toTemplateLiteral = text =>
  '{`' + text.replace(/\\/g, '\\\\').replace(/`/g, '\\`') + '`}'

const toJSX = (node, parent, opts = {}) => {
  const { preserveNewlines = false } = opts
  let children = ''

  if (node.type === 'root') {
    const jsxNodes = []
    let layout = ''

    for (const child of node.children) {
      // imports/exports should already be handled for the root mdx component
      if (child.type === 'import') continue
      if (child.type === 'export') {
        if (!child.default) continue
        layout = child.value
          .replace(/^export\s+default\s+/, '')
          .replace(/;\s*$/, '')
        continue
      }
      jsxNodes.push(child)
    }

    return [
      '(props => {',
      `  const Layout = ${layout ? layout : '"div"'}`,
      '  return <Layout',
      '    name="wrapper"',
      '    components={props.components}>',
      '    ' + jsxNodes.map(child => toJSX(child, node)).join('\n    '),
      '  </Layout>',
      '})',
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (node.children) {
    children = node.children
      .map(child => {
        return toJSX(child, node, {
          preserveNewlines: preserveNewlines || node.tagName === 'pre',
        })
      })
      .join('')
  }

  if (node.type === 'element') {
    let props = ''
    if (Object.keys(node.properties).length > 0) {
      props = JSON.stringify(node.properties)
    }
    return [
      `<${node.tagName}`,
      parent.tagName && ` parentName="${parent.tagName}"`,
      props && ` {...${props}}`,
      '>',
      children,
      `</${node.tagName}>`,
    ]
      .filter(Boolean)
      .join('')
  }

  if (node.type === 'text') {
    const shouldPreserveNewlines = preserveNewlines || parent.tagName === 'p'
    if (node.value === '\n' && !shouldPreserveNewlines) {
      return node.value
    }
    return toTemplateLiteral(node.value)
  }

  if (node.type === 'comment') {
    return `{/*${node.value}*/}`
  }

  return node.value
}

const delimiter = 'thematicBreak'

module.exports = (opts = {}) => {
  return (tree, file) => {
    const { children } = tree
    const splits = []
    const slides = []

    visit(tree, node => {
      if (is(delimiter, node)) {
        const i = children.indexOf(node)
        splits.push(i)
      }
    })

    let previousSplit = 0

    for (let i = 0; i < splits.length; i++) {
      const split = splits[i]
      slides.push(children.slice(previousSplit, split))
      previousSplit = split + 1
    }

    slides.push(children.slice(previousSplit))

    const jsx = slides.map(slide => {
      const hast = mdxAstToMdxHast()({
        type: 'root',
        children: slide,
      })
      const code = toJSX(hast, {}, { skipExport: true })
      return code
    })

    tree.children.push({
      type: 'export',
      default: false,
      value: `export const slides = [${jsx.join(',\n')}]`,
    })
  }
}
