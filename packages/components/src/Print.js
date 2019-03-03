import React from 'react'
import Slide from './Slide'

export const Print = props => (
  <>
    {props.slides.map((Component, i) => (
      <Slide key={i} index={i}>
        <Component />
      </Slide>
    ))}
  </>
)

export default Print
