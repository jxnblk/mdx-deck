import React from 'react'
import Root from './Root'
import { Context } from './context'

export const Slide = ({ index, context, ...props }) => (
  <Context.Provider
    value={{
      index,
      ...context,
      ...props,
    }}
  >
    <Root {...props} />
  </Context.Provider>
)

Slide.defaultProps = {
  step: Infinity,
}

export default Slide
