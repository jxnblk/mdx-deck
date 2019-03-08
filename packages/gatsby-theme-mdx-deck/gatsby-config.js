const path = require('path')

/*
module.exports = (opts = {}) => {
  const src = path.resolve(opts.path || 'src/decks')

  return {
    plugins: [
      'gatsby-plugin-emotion',
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['gatsby-theme-mdx-deck'],
        },
      },
    ],
  }
}
*/
module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-mdx-deck'],
      },
    },
  ],
}
