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
import Provider from './Provider'
import Slide from './Slide'
import GoogleFonts from './GoogleFonts'
import Ratio from './Ratio'
import splitSlides from './splitSlides'

const Placeholder = ({ index }) => (
  <pre style={{ fontSize: 16 }}>not found: slide {index}</pre>
)

const wrapper = props => {
  const { slides, theme, themes, ratio, zoom } = splitSlides(props)
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
            width: 100 / zoom + '%',
            height: 100 / zoom + '%',
            transformOrigin: '0 0',
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
  <Deck components={{ wrapper }} slide={slide} ratio={ratio} zoom={zoom} />
)

export default Embed
