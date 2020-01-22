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
  const n = Number(props.location.hash.replace(/^#/, ''))
  return n
}

export default props => {
  const slides = split(props)
  const [index, setIndex] = React.useState(getIndex(props))
  const { slug } = props.pageContext || {}
  const slide = slides[index]

  const [mode, setMode] = React.useState(modes.default)
  const toggleMode = next => setMode(current =>
    current === next ? modes.default : next
  )

  const [step, setStep] = React.useState(0)
  const [steps, setSteps] = React.useState(0)

  const lastIndex = React.useRef(0)
  const direction = index - lastIndex.current

  React.useEffect(() => {
    lastIndex.current = index
  }, [index])

  React.useEffect(() => {
    if (props.location.pathname === '/print') return
    props.navigate('/#' + index, {
      replace: true,
    })
  }, [index])

  React.useEffect(() => {
    if (props.location.pathname === '/print') {
      setMode(modes.print)
    }
    if (!slide) {
      props.navigate('/')
      setIndex(0)
    }
  }, [])

  if (!slide) return false

  const context = {
    slides,
    slug,
    index,
    setIndex,
    direction,
    length: slides.length,
    slide,
    mode,
    setMode,
    toggleMode,
    notes: slide.notes,
    header: slides.header,
    footer: slides.footer,
    step,
    setStep,
    steps,
    setSteps,
  }

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

  const theme = merge(baseTheme, props.theme || {})

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <Storage />
      <Helmet>
        {slides.head.children}
        {theme.googleFont && <link rel='stylesheet' href={theme.googleFont} />}
      </Helmet>
      <ThemeProvider
        theme={theme}
        components={theme.components}>
        <Container>
          <Slide>
            {slide}
          </Slide>
        </Container>
      </ThemeProvider>
    </Context.Provider>
  )
}
