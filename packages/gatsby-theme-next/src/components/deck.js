import React from 'react'
import { Router, globalHistory } from '@reach/router'
import get from 'lodash.get'
import useKeyboard from '../hooks/use-keyboard'
import useStorage from '../hooks/use-storage'
import useDeck from '../hooks/use-deck'
import Context from '../context'
import Slide from './slide'

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

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <Storage />
      <Router basepath={slug}>
        <Slide index={0} path="/" slide={slides[0]} />
        {slides.map((slide, i) => (
          <Slide key={i} index={i} path={i + '/*'} slide={slide} />
        ))}
      </Router>

      {context.notes && <pre>{context.notes}</pre>}
    </Context.Provider>
  )
}
