const fs = require('fs')
const path = require('path')
const { createPath, validatePath } = require('gatsby-page-utils')

const isDir = p => fs.statSync(p).isDirectory()

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mdx$/,
          use: [
            loaders.js(),
            '@mdx-js/loader',
          ]
        }
      ]
    }
  })
}

exports.resolvableExtensions = () => ['.mdx']

exports.createPages = ({
  actions,
}, {
  path: source,
} = {}) => {
  if (!source) return

  actions.createPage({
    path: '/',
    matchPath: '/*',
    component: source,
  })
}

// does it need to filter by plugin?
/*
exports.onCreatePage = ({ page, actions }) => {
  const basePage = Object.assign({}, page)
  const matchPath = page.path + '*'
  actions.deletePage(basePage)

  actions.createPage({
    ...page,
    matchPath,
    context: {
      slug: page.path,
    }
  })
}
*/
