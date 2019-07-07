import React, { useEffect, useReducer } from 'react'
import { Router, globalHistory, navigate } from '@reach/router'

const Slide = ({ slide, ...props }) => (
  <div
    style={{
      outline: '2px solid cyan',
    }}>
    {slide}
  </div>
)

const reducer = (state, next) => ({ ...state, ...next })

const getIndex = () => {
  const { pathname } = globalHistory.location
  const paths = pathname.split('/')
  const n = Number(paths[paths.length - 1])
  const index = isNaN(n) ? 0 : n
  return index
}

const next = ({ slug, length }) => {
  const i = getIndex()
  const n = i + 1
  if (n >= length) return
  navigate([slug, n].join('/'))
}

const previous = ({ slug }) => {
  const i = getIndex()
  const n = i - 1
  if (n < 0) return
  navigate([slug, n].join('/'))
}

export default ({ slides = [], pageContext: { slug }, ...props }) => {
  const [state, setState] = useReducer(reducer, {
    mode: 'normal',
  })
  const { length } = slides

  useEffect(() => {
    const handleKeyDown = e => {
      switch (e.key) {
        case 'ArrowRight':
          next({ slug, length })
          break
        case 'ArrowLeft':
          previous({ slug })
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div>
      <pre>DECK {slides.length} slides</pre>
      <Router basepath={slug}>
        <Slide path="/" slide={slides[0]} />
        {slides.map((slide, i) => (
          <Slide key={i} path={i + '/*'} slide={slide} />
        ))}
      </Router>
    </div>
  )
}
