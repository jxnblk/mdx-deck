import React from 'react'
import { navigate } from '@reach/router'
import { Helmet } from 'react-helmet'
import split from './split-slides'
import { Context } from './context'
import Keyboard from './keyboard'
import modes from './modes'

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
  // console.log('MDXDeck', props)
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
    slide,
    mode,
    setMode,
    toggleMode,
    location: props.location,
  }
  context.setIndex = setIndex(context)
  console.log(slides)

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
