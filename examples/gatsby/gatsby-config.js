module.exports = {
  pathPrefix: '/mdx-deck',
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        basePath: '/slides',
      },
    },
  ],
}
