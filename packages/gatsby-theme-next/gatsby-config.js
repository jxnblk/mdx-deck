const IS_LOCAL = process.cwd() === __dirname

const config = (opts = {}) => {
  const { mdx = true, path: source = 'src/decks', name = '' } = opts

  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name,
          path: path.resolve(source),
        },
      },
      mdx && 'gatsby-plugin-mdx',
    ].filter(Boolean),
  }
}

module.exports = IS_LOCAL ? config() : config
