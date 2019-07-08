import React from 'react'
import { Router, globalHistory } from '@reach/router'
import { Global } from '@emotion/core'
import { Helmet } from 'react-helmet'
import get from 'lodash.get'
import useKeyboard from '../hooks/use-keyboard'
import useStorage from '../hooks/use-storage'
import useDeck from '../hooks/use-deck'
import Context from '../context'
import Wrapper from './wrapper'
import Slide from './slide'
import { modes } from '../constants'

import Presenter from './presenter'

const Keyboard = () => {
  useKeyboard()
  return false
}

const Storage = () => {
  useStorage()
  return false
}

const getIndex = () => {
  const { pathname } = globalHistory.location
  const paths = pathname.split('/')
  const n = Number(paths[paths.length - 1])
  const index = isNaN(n) ? 0 : n
  return index
}

export default ({ slides = [], pageContext: { slug }, ...props }) => {
  const outer = useDeck()
  const index = getIndex()

  const context = {
    ...outer,
    slug,
    length: slides.length,
    index,
    steps: get(outer, `metadata.${index}.steps`),
    notes: get(outer, `metadata.${index}.notes`),
  }
  const [head] = slides.heads

  let Mode = ({ children }) => <React.Fragment children={children} />
  switch (context.mode) {
    case modes.presenter:
      Mode = Presenter
      break
  }

  return (
    <Context.Provider value={context}>
      {false && head && <Helmet {...head.props} />}
      <Global styles={{ body: { margin: 0 } }} />
      <Keyboard />
      <Storage />
      <Wrapper>
        <Mode slides={slides}>
          <Router
            basepath={slug}
            style={{
              height: '100%',
            }}>
            <Slide index={0} path="/" slide={slides[0]} />
            {slides.map((slide, i) => (
              <Slide key={i} index={i} path={i + '/*'} slide={slide} />
            ))}
          </Router>
        </Mode>
      </Wrapper>
      {false && context.notes && <pre>{context.notes}</pre>}
    </Context.Provider>
  )
}
