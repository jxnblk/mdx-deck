const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const Debug = require('debug')
const mkdirp = require('mkdirp')

const debug = Debug('@mdx-deck/gatsby-theme')

exports.onPreBootstrap = ({ store }) => {
  const { program } = store.getState()

  const dir = path.join(program.directory, `src/decks`)

  debug(`Initializing ${dir} directory`)
  mkdirp.sync(dir)
}

exports.onCreateNode = ({ node, actions, getNode }, opts = {}) => {
  const { name = 'decks' } = opts
  if (node.internal.type !== 'Mdx') return

  const value = path.join('/', name, createFilePath({ node, getNode }))
  actions.createNodeField({
    name: 'slug',
    node,
    value,
  })
}

const stripSlash = str => str.replace(/\/$/, '')

exports.createPages = async ({ graphql, actions }, opts = {}) => {
  const { name = 'decks' } = opts

  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    debug(result.errors)
    return
  }

  const decks = result.data.allMdx.edges
    .filter(edge => {
      return edge.node.parent.sourceInstanceName === 'decks'
    })
    .map(edge => edge.node)

  // index page
  actions.createPage({
    path: path.join('/', name),
    component: require.resolve('./src/decks.js'),
  })

  decks.forEach(deck => {
    const matchPath = path.join(deck.fields.slug, '*')
    actions.createPage({
      path: deck.fields.slug,
      matchPath: path.join(deck.fields.slug, '*'),
      component: require.resolve('./src/template.js'),
      context: {
        id: deck.id,
        basepath: stripSlash(deck.fields.slug),
      },
    })
  })
}
