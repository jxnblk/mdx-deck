const fs = require('fs')
const path = require('path')
const { createPath, validatePath } = require('gatsby-page-utils')
const remarkPlugins = [
  require('remark-images'),
  require('remark-unwrap-images'),
  require('remark-emoji'),
]

exports.onPreBootstrap = ({}, opts = {}) => {
  opts.dirname = opts.dirname || __dirname
  const staticSourceDir = path.join(opts.dirname, 'static')
  const hasStaticDir = fs.existsSync(staticSourceDir)

  if (fs.existsSync('./static')) {
    // remove temp directory
    fs.unlinkSync('./static')
  }

  if (hasStaticDir) {
    // link to source static directory
    fs.symlinkSync(staticSourceDir, './static')
  }
}

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
