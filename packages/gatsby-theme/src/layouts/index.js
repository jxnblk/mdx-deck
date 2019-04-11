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

const Thumb = props => {
  console.log(props)

  return <MDXProvider components={{ wrapper }}>{props.children}</MDXProvider>
}

export default props => (
  <Root>
    <div css={{}}>
      <h1>MDX Decks</h1>
      <ul
        css={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {props.decks.map(deck => (
          <li key={deck.id}>
            <div
              role="link"
              css={{
                cursor: 'pointer',
              }}
              onClick={e => {
                navigate(deck.slug)
              }}
            >
              <Thumb {...props} {...deck} />
              {deck.slug}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </Root>
)
