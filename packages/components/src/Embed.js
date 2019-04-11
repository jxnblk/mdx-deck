/** @jsx jsx */
// experimental component for embedding MDX Decks
// in other React applications
/*
 *
 *    import React from 'react'
 *    import { DeckEmbed } from '@mdx-deck/components'
 *    import deck from './my-deck.mdx'
 *
 *    export default props =>
 *      <>
 *        <h1>The first slide</h1>
 *        <DeckEmbed src={deck} />
 *        <h1>The second slide</h1>
 *        <DeckEmbed src={deck} slide={2} />
 *      </>
 *
 */

import { jsx } from '@emotion/core'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Provider from './Provider'
import Slide from './Slide'
import GoogleFonts from './GoogleFonts'

// from @mdx-deck/gatsby-theme
// todo: reorganize things
const splitter = props => {
  const { theme, themes } = props
  const arr = React.Children.toArray(props.children)
  const splits = []
  const slides = []

  arr.forEach((child, i) => {
    if (child.props.mdxType === 'hr') splits.push(i)
  })

  let previousSplit = 0
  splits.forEach(i => {
    const children = [...arr.slice(previousSplit, i)]
    slides.push(() => children)
    previousSplit = i + 1
  })
  slides.push(() => [...arr.slice(previousSplit)])

  return {
    ...props,
    theme,
    themes,
    slides,
  }
}

const Ratio = ({ ratio, children }) => (
  <div
    css={{
      outline: '1px solid tomato',
      width: '100%',
      height: 0,
      paddingBottom: ratio * 100 + '%',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {children}
  </div>
)

const Placeholder = ({ index }) => (
  <pre style={{ fontSize: 16 }}>not found: slide {index}</pre>
)

const wrapper = props => {
  const { slides, theme, themes, ratio, zoom } = splitter(props)
  const Content = slides[props.slide - 1] || Placeholder

  return (
    <Provider theme={theme} themes={themes}>
      <GoogleFonts />
      <Ratio ratio={ratio}>
        <Slide
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            transform: `scale(${zoom})`,
          }}
        >
          <Content index={props.slide - 1} />
        </Slide>
      </Ratio>
    </Provider>
  )
}

export const Embed = ({ src: Deck, slide = 1, ratio = 9 / 16, zoom = 1 }) => (
  <MDXProvider
    components={{
      wrapper,
    }}
  >
    <Deck slide={slide} ratio={ratio} zoom={zoom} />
  </MDXProvider>
)

export default Embed
