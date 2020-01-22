const src = process.env.__SRC__

module.exports = {
  plugins: [
    {
      resolve: '@mdx-deck/gatsby-plugin',
      options: {
        path: src,
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
