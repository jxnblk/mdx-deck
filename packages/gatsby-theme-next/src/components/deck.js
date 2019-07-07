import React from 'react'
import { Router } from '@reach/router'

const Route = ({ style }) => <div style={style} />

const Slide = ({ slide, ...props }) => (
  <div
    style={{
      outline: '2px solid cyan',
    }}>
    {slide}
  </div>
)

export default ({ slides = [], pageContext: { slug }, ...props }) => {
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
