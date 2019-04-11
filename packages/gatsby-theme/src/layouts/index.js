import React from 'react'
import { navigate } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Provider, Zoom, Slide } from '@mdx-deck/components'
import Root from './root'
import splitter from '../splitter'

const wrapper = props => {
  const { slides, theme, themes } = splitter(props)
  const [First] = slides
  return (
    <Provider theme={theme} themes={themes}>
      <Zoom zoom={1 / 3}>
        <Slide>
          <First />
        </Slide>
      </Zoom>
    </Provider>
  )
}

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
    <MDXProvider components={{ wrapper }}>{props.children}</MDXProvider>
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
    <div
      css={{
        padding: 32,
      }}
    >
      <h1>MDX Decks</h1>
      <ul
        css={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {props.decks.map(deck => (
          <li key={deck.id} style={{ width: 100 / 3 + '%' }}>
            <Thumb {...props} {...deck} />
          </li>
        ))}
      </ul>
    </div>
  </Root>
)
