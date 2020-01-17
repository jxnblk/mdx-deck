import React from 'react'
import { Helmet } from 'react-helmet'
import { ThemeProvider, merge } from 'theme-ui'
import split from './split-slides'
import { Context } from './context'
import Keyboard from './keyboard'
import modes from './modes'
import Storage from './storage'
import Container from './container'
import Slide from './slide'
import baseTheme from './theme'

/**
 *  - [ ] presenter styles
 *  - [ ] overview styles
 *  - [ ] timer/clock
 *  - [ ] Ditch layouts?
 *  - [ ] themes
 *  - [ ] base theme
 *  - [ ] test local images
 */

const getIndex = props => {
  if (!props.location) return 0
  const paths = props.location.pathname.split('/')
  const n = Number(paths[paths.length - 1]) || 0
  return n
}

export default props => {
  const slides = split(props)
  const index = getIndex(props)
  const { slug } = props.pageContext || {}
  const slide = slides[index]

  const [mode, setMode] = React.useState(modes.default)
  const toggleMode = next => setMode(current =>
    current === next ? modes.default : next
  )

  const context = {
    slides,
    slug,
    index,
    length: slides.length,
    slide,
    mode,
    setMode,
    toggleMode,
    notes: slide.notes,
  }

  context.setIndex = fn => {
    const n = typeof fn === 'function' ? fn(index) : fn
    props.navigate('/' + n)
  }

  context.previous = () => {
    context.setIndex(n => n > 0 ? n - 1 : n)
  }

  context.next = () => {
    context.setIndex(n => n < slides.length - 1 ? n + 1 : n)
  }

  // const theme = merge(baseTheme, props.theme)
  // console.log(context)

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <Storage />
      <Helmet>
        {slides.head.children}
      </Helmet>
      <ThemeProvider theme={baseTheme}>
        <Container>
          <Slide>
            {slide}
          </Slide>
        </Container>
      </ThemeProvider>
    </Context.Provider>
  )
}
