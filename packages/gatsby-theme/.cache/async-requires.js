// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  'component---src-decks-js': () =>
    import('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/src/decks.js' /* webpackChunkName: "component---src-decks-js" */),
  'component---src-template-js': () =>
    import('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/src/template.js' /* webpackChunkName: "component---src-template-js" */),
  'component---cache-dev-404-page-js': () =>
    import('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/.cache/dev-404-page.js' /* webpackChunkName: "component---cache-dev-404-page-js" */),
  'component---src-pages-index-mdx': () =>
    import('/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/src/pages/index.mdx' /* webpackChunkName: "component---src-pages-index-mdx" */),
}

exports.data = () =>
  import(/* webpackChunkName: "pages-manifest" */ '/Users/jxnblk/repos/mdx-deck/packages/gatsby-theme/.cache/data.json')
