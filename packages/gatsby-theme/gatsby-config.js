const IS_LOCAL = process.cwd() === __dirname

const fs = require('fs')
const path = require('path')
const remarkPlugins = [require('remark-unwrap-images'), require('remark-emoji')]

const config = (opts = {}) => {
  const { mdx = true, contentPath: name = 'decks' } = opts

  /*
  const filepath = path.isAbsolute(name) ? name : path.resolve(name)
  const isDirectory = fs.statSync(filepath).isDirectory()
  const assetPath = isDirectory
    ? filepath // path.join(filepath, 'static')
    : path.dirname(filepath) // path.join(path.dirname(filepath), 'static')
  */

  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name,
          path: name,
        },
      },
      mdx && {
        resolve: 'gatsby-plugin-mdx',
        options: {
          remarkPlugins,
        },
      },
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-emotion',
      'gatsby-plugin-catch-links',
      'gatsby-plugin-theme-ui',
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['@mdx-deck/themes'],
        },
      },
    ].filter(Boolean),
  }
}

module.exports = IS_LOCAL ? config() : config
