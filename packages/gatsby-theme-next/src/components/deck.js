import React from 'react'
import { Router, globalHistory } from '@reach/router'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'theme-ui'
import { Helmet } from 'react-helmet'
import get from 'lodash.get'
import merge from 'lodash.merge'
import useKeyboard from '../hooks/use-keyboard'
import useStorage from '../hooks/use-storage'
import useDeck from '../hooks/use-deck'
import Context from '../context'
import Wrapper from './wrapper'
import Slide from './slide'
import { modes } from '../constants'
import convertLegacyTheme from '../convert-legacy-theme'

import Presenter from './presenter'
import Overview from './overview'
import Grid from './grid'

const Keyboard = () => {
  useKeyboard()
  return false
}

const Storage = () => {
  useStorage()
  return false
}

const Print = ({ slides }) => (
  <React.Fragment>
    {slides.map((slide, i) => (
      <Slide key={i} slide={slide} preview />
    ))}
  </React.Fragment>
)

const getIndex = () => {
  const { pathname } = globalHistory.location
  const paths = pathname.split('/')
  const n = Number(paths[paths.length - 1])
  const index = isNaN(n) ? 0 : n
  return index
}

export default ({
  slides = [],
  pageContext: { title, slug },
  theme,
  themes = [],
  ...props
}) => {
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

  const head = slides.head.children

  const legacyTheme =
    !!theme || themes.length
      ? convertLegacyTheme(merge({}, theme, ...themes))
      : { theme: {} }

  let Mode = ({ children }) => <React.Fragment children={children} />
  switch (context.mode) {
    case modes.presenter:
      Mode = Presenter
      break
    case modes.overview:
      Mode = Overview
      break
    case modes.grid:
      Mode = Grid
      break
    default:
      break
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {head}
      </Helmet>
      <Context.Provider value={context}>
        <ThemeProvider {...legacyTheme}>
          <Global
            styles={{
              body: {
                margin: 0,
                overflow: context.mode === modes.normal ? 'hidden' : null,
              },
            }}
          />
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
                <Print path="/print" slides={slides} />
              </Router>
            </Mode>
          </Wrapper>
        </ThemeProvider>
      </Context.Provider>
    </>
  )
}
