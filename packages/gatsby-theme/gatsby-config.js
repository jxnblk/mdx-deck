const path = require('path')
const pkg = require('./package.json')

const remarkPlugins = [require('remark-emoji'), require('remark-unwrap-images')]

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'decks',
        path: path.resolve('src/decks'),
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
        modules: [pkg.name],
      },
    },
  ],
}
