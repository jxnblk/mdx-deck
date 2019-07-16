const src = process.env.__SRC__
const dirname = process.env.__DIRNAME__
const chalk = require('chalk')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        cli: true,
        contentPath: src,
      },
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['mdx-deck'],
      },
    },
  ],
}
