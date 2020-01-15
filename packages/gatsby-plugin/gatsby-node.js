const fs = require('fs')
const path = require('path')
const { createPath, validatePath } = require('gatsby-page-utils')
const remarkPlugins = [
  require('remark-images'),
  require('remark-emoji'),
]

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
            {
              loader: '@mdx-js/loader',
              options: {
                remarkPlugins,
              }
            },
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
