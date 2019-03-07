const path = require('path')

module.exports = (opts = {}) => {
  const src = path.resolve(opts.path || 'src/decks')

  return {
    plugins: [
      'gatsby-plugin-emotion',
      /*
       * probably can't use this as-is
      {
        resolve: 'gatsby-mdx',
        options: {
          extensions: [ '.md', '.mdx' ],
          mdPlugins: [
            require('@mdx-deck/mdx-plugin'),
          ]
        }
      },
       */
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'decks',
          path: src,
        },
      },
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['gatsby-theme-mdx-deck'],
        },
      },
    ],
  }
}
