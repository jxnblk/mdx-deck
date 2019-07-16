const IS_LOCAL = process.cwd() === __dirname

const config = (opts = {}) => {
  const { mdx = true, contentPath: name = 'decks' } = opts

  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name,
          path: name,
        },
      },
      mdx && 'gatsby-plugin-mdx',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-emotion',
      'gatsby-plugin-catch-links',
      'gatsby-plugin-theme-ui',
    ].filter(Boolean),
  }
}

module.exports = IS_LOCAL ? config() : config
