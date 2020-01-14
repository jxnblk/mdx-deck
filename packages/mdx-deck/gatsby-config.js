const path = process.env.__SRC__

module.exports = {
  plugins: [
    {
      resolve: '@mdx-deck/gatsby-plugin',
      options: {
        path,
      },
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [
          'mdx-deck',
          '@mdx-deck/gatsby-plugin',
          '@mdx-deck/themes'
        ],
      },
    },
  ],
}
