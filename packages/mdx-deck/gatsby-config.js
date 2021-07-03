const path = require('path')

const src = process.env.__SRC__
const url = process.env.__URL__
const dirname = path.dirname(src)

module.exports = {
  plugins: [
    {
      resolve: '@mdx-deck/gatsby-plugin',
      options: {
        path: src,
        url,
        dirname,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: dirname,
        ignore: ['node_modules', 'public', '.cache'],
      },
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['mdx-deck', '@mdx-deck/themes'],
      },
    },
  ],
}
