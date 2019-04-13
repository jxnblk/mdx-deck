import React from 'react'
import { navigate } from 'gatsby'
import { Embed } from '@mdx-deck/components'
import Root from './root'
import Header from './header'
import Footer from './footer'

const Thumb = props => (
  <div
    role="link"
    css={{
      cursor: 'pointer',
      overflow: 'hidden',
    }}
    onClick={e => {
      navigate(props.slug)
    }}
  >
    <Embed src={props.Component} zoom={1 / 2} />
    <div
      css={{
        textAlign: 'center',
        padding: 4,
      }}
    >
      {props.title}
    </div>
  </div>
)

export default props => (
  <Root>
    <Header {...props} />
    <ul
      css={{
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {props.decks.map(deck => (
        <li
          key={deck.id}
          css={{
            width: '100%',
            padding: 32,
            '@media screen and (min-width: 48em)': {
              width: '50%',
            },
            '@media screen and (min-width: 56em)': {
              width: '33.333%',
            },
          }}
        >
          <Thumb {...props} {...deck} />
        </li>
      ))}
    </ul>
    <Footer {...props} />
  </Root>
)
