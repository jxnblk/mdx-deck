import React from 'react'
import { navigate } from '@reach/router'
import { Helmet } from 'react-helmet'
import split from './split-slides'
import { Context } from './context'
import Keyboard from './keyboard'
import modes from './modes'

/**
 * TODO
 *  - [ ] local storage
 *  - [ ] slide styles
 *  - [ ] header/footer styles
 *  - [ ] presenter mode
 *  - [ ] overview mode
 *  - [ ] themes
 *  - [ ] print mode
 */

const getIndex = props => {
  if (!props.location) return 0
  const paths = props.location.pathname.split('/')
  const n = Number(paths[paths.length - 1]) || 0
  return n
}

const setIndex = ({ slug, index }) => fn => {
  const n = fn(index)
  navigate([slug, n].join(''))
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

  const [step, setStep] = React.useState(0)
  const [steps, setSteps] = React.useState(0)
  const clearSteps = () => {
    setStep(0)
    setSteps(0)
  }

  const lastIndex = React.useRef()
  const direction = index - lastIndex.current

  React.useEffect(() => {
    lastIndex.current = index
  },[index])

  const context = {
    slides,
    slug,
    index,
    length: slides.length,
    slide,
    mode,
    setMode,
    toggleMode,
    location: props.location,
    step,
    setStep,
    steps,
    notes: slide.notes,
  }

  context.setSteps = l => {
    setSteps(l)
    if (direction < 0) setStep(l)
  }

  context.setIndex = setIndex(context)

  context.previous = () => {
    if (steps && step > 0) {
      setStep(n => n - 1)
    } else {
      context.setIndex(n => n > 0 ? n - 1 : n)
      if (!!steps) clearSteps()
    }
  }

  context.next = () => {
    if (steps && step < steps) {
      setStep(n => n + 1)
    } else {
      context.setIndex(n => n < slides.length - 1 ? n + 1 : n)
      if (steps) clearSteps()
    }
  }

  // console.log({ step, steps, direction, context })

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <Helmet>
        {slides.head.children}
      </Helmet>
      {slides.header}
      <div
        style={{
          padding: 32,
          backgroundColor: 'lightgray',
        }}>
        {slide}
      </div>
      {slides.footer}

      <div>
        {/** temp */}
        {slide.notes}
      </div>
    </Context.Provider>
  )
}
