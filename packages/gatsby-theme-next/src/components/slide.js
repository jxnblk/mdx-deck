import React from 'react'
import Context from '../context'
import useDeck from '../hooks/use-deck'

export const Slide = ({ slide, index, ...props }) => {
  const outer = useDeck()
  const context = {
    ...outer,
    index,
  }
  return (
    <Context.Provider value={context}>
      <div
        style={{
          padding: 32,
          outline: '2px solid cyan',
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

export default Slide
