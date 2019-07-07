import React from 'react'

export default ({ slides = [], ...props }) => {
  return (
    <div>
      <pre>DECK {slides.length} slides</pre>
      {slides.map((slide, i) => (
        <div key={i}>{slide}</div>
      ))}
    </div>
  )
}
