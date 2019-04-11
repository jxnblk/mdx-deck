const { hot } = require('react-hot-loader/root')

// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  'component---src-decks-js': hot(
    preferDefault(
      require('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/src/decks.js')
    )
  ),
  'component---src-template-js': hot(
    preferDefault(
      require('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/src/template.js')
    )
  ),
  'component---cache-dev-404-page-js': hot(
    preferDefault(
      require('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/.cache/dev-404-page.js')
    )
  ),
  'component---src-pages-index-mdx': hot(
    preferDefault(
      require('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/src/pages/index.mdx')
    )
  ),
}
