const path = require('path')
const pkg = require('./package.json')

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
        extensions: [
          '.mdx',
          '.md', // '.mdxs',
        ],
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
