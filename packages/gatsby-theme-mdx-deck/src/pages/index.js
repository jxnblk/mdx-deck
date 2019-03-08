import React from 'react'
import Deck, {
  slides,
  theme,
  themes,
} from '!babel-loader!@mdx-deck/loader!../deck.mdx'

export default props => (
  <div>
    <pre>gatsby-theme-mdx-deck</pre>
    {typeof slides}
  </div>
)
