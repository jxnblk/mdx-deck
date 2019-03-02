const visit = require('unist-util-visit')
const is = require('unist-util-is')

// do i need this?
const mdxAstToMdxHast = require('@mdx-js/mdx/mdx-ast-to-mdx-hast')
// const mdx = require('@mdx-js/mdx')
// removes html comments
// const toMDXAST = require('@mdx-js/mdx/md-ast-to-mdx-ast')
// const mdxHastToJsx = require('@mdx-js/mdx/mdx-hast-to-jsx')
// const { toJSX } = require('@mdx-js/mdx/mdx-hast-to-jsx')

// custom implementation
const toJSX = (node, parent) => {
  let children = ''
  if (node.type === 'root') {
    const jsxNodes = []
    let layout = ''

    for (const child of node.children) {
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
      '(props => (',
      '  <MDXTag',
      '    name="wrapper"',
      layout && `    Layout={${layout}}`,
      '    components={props.components}>',
      '    ' + jsxNodes.map(child => toJSX(child, node)).join('\n    '),
      '  </MDXTag>',
      '))',
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (node.children) {
    children = node.children
      .map(child => {
        return toJSX(child, node)
      })
      .join('')
  }

  if (node.type === 'element') {
    let props = ''
    if (Object.keys(node.properties).length > 0) {
      props = JSON.stringify(node.properties)
    }
    return [
      '<MDXTag',
      ` name="${node.tagName}"`,
      ' components={props.components}',
      parent.tagName && ` parentName="${parent.tagName}"`,
      props && ` props={${props}}`,
      '>',
      children,
      '</MDXTag>',
    ]
      .filter(Boolean)
      .join('')
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
      // no idea what I'm doing
      // not sure how to convert ast to jsx here...
      const hast = mdxAstToMdxHast()({
        type: 'root',
        children: slide,
      })
      const code = toJSX(
        hast,
        {},
        {
          skipExport: true,
        }
      )
      return code
      // const wrapped = `(() => ${code})()`
      // return wrapped
    })

    tree.children.push({
      type: 'export',
      default: false,
      value: `export const slides = [${jsx.join(',\n')}]`,
    })
    // console.log(tree)
  }
}
