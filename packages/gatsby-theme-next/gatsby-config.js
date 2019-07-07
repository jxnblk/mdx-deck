const IS_LOCAL = process.cwd() === __dirname

const config = (opts = {}) => {
  const { mdx = true, contentPath: name = 'content/decks' } = opts

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
    ].filter(Boolean),
  }
}

module.exports = IS_LOCAL ? config() : config
