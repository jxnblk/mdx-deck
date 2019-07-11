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
import splitSlides from './splitSlides'

// fix for regression in gatsby-theme
import merge from 'lodash.merge'
import defaultTheme from '@mdx-deck/themes/base'

const Placeholder = ({ index }) => (
  <pre style={{ fontSize: 16 }}>not found: slide {index}</pre>
)

// fix for regression in gatsby-theme
const mergeThemes = themes =>
  themes.reduce(
    (acc, theme) =>
      typeof theme === 'function' ? theme(acc) : merge(acc, theme),
    {}
  )

const wrapper = props => {
  const { slides, theme: baseTheme, themes, ratio, zoom } = splitSlides(props)
  // fix for regression in gatsby-theme
  const theme = mergeThemes([
    defaultTheme,
    baseTheme,
    ...themes,
    {
      aspectRatio: ratio,
      Slide: {
        maxWidth: '100%',
        height: 'auto',
      },
    },
  ])
  const Content = slides[props.slide - 1] || Placeholder

  return (
    <Provider theme={theme}>
      <GoogleFonts />
      <Slide zoom={zoom}>
        <Content index={props.slide - 1} />
      </Slide>
    </Provider>
  )
}

export const Embed = ({
  src: Deck,
  slide = 1,
  ratio = 16 / 9,
  zoom = 1,
  ...props
}) => (
  <Deck
    {...props}
    components={{ wrapper }}
    slide={slide}
    ratio={ratio}
    zoom={zoom}
  />
)

export default Embed
