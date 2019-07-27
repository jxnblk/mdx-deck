// based on gatsby-theme-blog
const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const crypto = require(`crypto`)
const Debug = require(`debug`)
const pkg = require('./package.json')

const debug = Debug(pkg.name)

let basePath
let contentPath

const DeckTemplate = require.resolve(`./src/templates/deck`)
const DecksTemplate = require.resolve(`./src/templates/decks`)

exports.onPreBootstrap = ({ store }, opts = {}) => {
  const { program } = store.getState()

  basePath = opts.basePath || `/`
  contentPath = opts.contentPath || `decks`

  if (opts.cli) return
  const dirname = path.join(program.directory, contentPath)
  mkdirp.sync(dirname)

  debug(`Initializing ${dirname} directory`)
}

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

const resolveTitle = async (...args) => {
  const headings = await mdxResolverPassthrough('headings')(...args)
  const [first = {}] = headings
  return first.value || ''
}

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(
    schema.buildObjectType({
      name: `Deck`,
      fields: {
        id: { type: `ID!` },
        slug: {
          type: `String!`,
        },
        title: {
          type: `String!`,
          resolve: resolveTitle,
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`],
    })
  )
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allDeck {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const { allDeck } = result.data
  const decks = allDeck.edges

  // single deck mode
  if (decks.length === 1) {
    const [deck] = decks
    const matchPath = [basePath, '*'].join('/')
    const slug = basePath === '/' ? '' : basePath
    createPage({
      path: basePath,
      matchPath,
      component: DeckTemplate,
      context: {
        ...deck.node,
        slug,
      },
    })
    return
  }

  decks.forEach(({ node }, index) => {
    const { slug } = node
    const matchPath = [slug, '*'].join('/')

    createPage({
      path: slug,
      matchPath,
      component: DeckTemplate,
      context: node,
    })
    createPage({
      path: slug + '/print',
      component: DeckTemplate,
      context: node,
    })
  })

  // index page
  createPage({
    path: basePath,
    component: DecksTemplate,
    context: {
      decks,
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions

  const toPath = node => {
    const { dir } = path.parse(node.relativePath)
    return path.join(basePath, dir, node.name)
  }

  if (node.internal.type !== `Mdx`) return

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === contentPath) {
    const slug = toPath(fileNode)

    createNode({
      slug,
      // Required fields.
      id: createNodeId(`${node.id} >>> Deck`),
      parent: node.id,
      children: [],
      internal: {
        type: `Deck`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify({ slug }))
          .digest(`hex`),
        content: JSON.stringify({ slug }),
        description: `Slide Decks`,
      },
    })
    createParentChildLink({ parent: fileNode, child: node })
  }
}

exports.onCreateDevServer = ({ app }) => {
  console.log('onCreateDevServer')
  if (typeof process.send !== 'function') return
  process.send({
    mdxDeck: true,
  })
}
