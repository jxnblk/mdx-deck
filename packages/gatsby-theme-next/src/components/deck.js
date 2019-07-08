import React, { useEffect, useReducer } from 'react'
import { Router, globalHistory, navigate } from '@reach/router'
import merge from 'lodash.merge'
import get from 'lodash.get'
import useKeyboard from '../hooks/use-keyboard'
import useDeck from '../hooks/use-deck'
import Context from '../context'

const Slide = ({ slide, index, ...props }) => {
  const outer = useDeck()
  const context = {
    ...outer,
    index,
  }
  return (
    <Context.Provider value={context}>
      <div
        style={{
          padding: 32,
          outline: '2px solid cyan',
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

const Keyboard = () => {
  useKeyboard()
  return false
}

const reducer = (state, next) => merge({}, state, next)

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
  }

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <div>
        <pre>DECK {slides.length} slides</pre>
        <Router basepath={slug}>
          <Slide index={0} path="/" slide={slides[0]} />
          {slides.map((slide, i) => (
            <Slide key={i} index={i} path={i + '/*'} slide={slide} />
          ))}
        </Router>
        <pre children={JSON.stringify(context, null, 2)} />
      </div>
    </Context.Provider>
  )
}
