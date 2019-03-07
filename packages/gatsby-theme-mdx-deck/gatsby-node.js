const path = require('path')
const mkdirp = require('mkdirp')
const mdx = require('@mdx-js/mdx')
const { createFilePath } = require('gatsby-source-filesystem')
const mdPlugins = [require('@mdx-deck/mdx-plugin')]

exports.onPreBootstrap = ({ store, reporter }, opts) => {
  // skip if user configured path is provided
  if (opts.path) return
  const { program } = store.getState()

  const dirs = [path.join(program.directory, 'src/decks')]

  dirs.forEach(dir => {
    reporter.log(`ensuring the ${dir} directory exists`)
    mkdirp.sync(dir)
  })
}

exports.resolvableExtensions = () => ['.mdx']
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  getNode,
}) => {
  if (node.internal.type !== 'File') return
  if (node.ext !== '.mdx') return
  const content = await loadNodeContent(node)
  const code = await mdx(content, { mdPlugins })
  console.log(code)

  const value = createFilePath({ node, getNode })

  const mdxNode = {
    id: createNodeId(`${node.id} >>> MdxDeck`),
    node,
    parent: node.id,
    children: [],
    internal: {
      type: 'MdxDeck',
      content,
      contentDigest: content,
    },
    code,
  }
  actions.createNode(mdxNode)
  actions.createParentChildLink({
    parent: node,
    child: mdxNode,
  })
}
/*
 */

/*
exports.preprocessSource = async ({ filename, contents }, opts) => {
  const ext = path.extname(filename)
  console.log('preprocess', filename, ext)
  if (ext !== '.mdx') return null
  const code = await mdx(contents, {
    mdPlugins: [
      plugin
    ]
  })
  console.log(code)
  return code
}
*/

/* gatsby-mdx version */
/*
exports.onCreateNode = ({
  node,
  actions,
  getNode,
}) => {
  if (node.internal.type !== 'Mdx') return
  const value = createFilePath({ node, getNode })
  actions.createNodeField({
    name: 'slug',
    node,
    value,
  })
}
*/

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allMdxDeck {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) console.error(result.errors)

  result.data.allMdxDeck.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.fields.slug,
      component: path.join(__dirname, './src/index.js'),
      context: {
        id: node.id,
      },
    })
  })
}
