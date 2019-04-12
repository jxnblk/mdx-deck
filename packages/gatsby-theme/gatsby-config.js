const path = require('path')
const pkg = require('./package.json')

const remarkPlugins = [require('remark-emoji'), require('remark-unwrap-images')]

const IS_LOCAL = process.cwd() === __dirname

const themeConfig = (opts = {}) => {
  const { path: source = 'src/decks', name = 'decks' } = opts

  return {
    plugins: [
      'gatsby-plugin-emotion',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name,
          path: path.resolve(source),
        },
      },
      {
        resolve: 'gatsby-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          remarkPlugins,
        },
      },
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: [
            pkg.name,
            '@mdx-deck/components',
            '@mdx-deck/themes',
            '@mdx-deck/layouts',
          ],
        },
      },
    ],
  }
}

module.exports = IS_LOCAL ? themeConfig() : themeConfig
