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

const getIndex = props => {
  if (!props.location) return 0
  const paths = props.location.pathname.split('/')
  const n = Number(paths[paths.length - 1]) || 0
  return n
}

export default props => {
  const slides = split(props)
  // const index = getIndex(props)
  const [index, setIndex] = React.useState(getIndex(props))
  const { slug } = props.pageContext || {}
  const slide = slides[index]

  const [mode, setMode] = React.useState(modes.default)
  const toggleMode = next => setMode(current =>
    current === next ? modes.default : next
  )

  const lastIndex = React.useRef(0)
  const direction = index - lastIndex.current

  React.useEffect(() => {
    lastIndex.current = index
  }, [index])

  // steps
  const [step, setStep] = React.useState(0)
  const [steps, setSteps] = React.useState(0)

  const context = {
    slides,
    slug,
    index,
    direction,
    length: slides.length,
    slide,
    mode,
    setMode,
    toggleMode,
    notes: slide.notes,
    step,
    setStep,
    steps,
    setSteps,
  }
  /*
  context.setIndex = fn => {
    const n = typeof fn === 'function' ? fn(index) : fn
    props.navigate('/' + n)
  }
  */

  context.previous = () => {
    if (steps && step > 0) {
      setStep(n => n - 1)
    } else {
      setIndex(n => n > 0 ? n - 1 : n)
      setStep(0)
      setSteps(0)
    }
  }

  context.next = () => {
    if (step < steps) {
      setStep(n => n + 1)
    } else {
      setIndex(n => n < slides.length - 1 ? n + 1 : n)
      setStep(0)
      setSteps(0)
    }
  }

  React.useEffect(() => {
    props.navigate('/' + index, {
      replace: true,
    })
  }, [index])

  const theme = merge(baseTheme, props.theme || {})
  // console.log(context)

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <Storage />
      <Helmet>
        {slides.head.children}
      </Helmet>
      <ThemeProvider theme={theme}>
        <Container>
          <Slide>
            {slide}
          </Slide>
        </Container>
      </ThemeProvider>
    </Context.Provider>
  )
}
