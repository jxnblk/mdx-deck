const fs = require('fs')
const path = require('path')

const isDir = p => fs.statSync(p).isDirectory()

module.exports = ({
  path: source = 'src/decks',
} = {}) => {
  const dirname = isDir(source) ? source : path.dirname(source)
  console.log({ source, dirname })
  return {
    plugins: [
      /*
      {
        resolve: 'gatsby-plugin-page-creator',
        options: {
          path: dirname,
        },
      },
      */
      'gatsby-plugin-react-helmet',
    ],
  }
}
