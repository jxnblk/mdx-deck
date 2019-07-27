/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment } from 'react'
import Context from '../context'
import useDeck from '../hooks/use-deck'
import useSwipe from '../hooks/use-swipe'
import { modes } from '../constants'

export const Slide = ({ slide, index, preview, ...props }) => {
  const outer = useDeck()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }

  return (
    <Context.Provider value={context}>
      <div
        {...(!preview ? swipeProps : {})}
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          height: context.mode === modes.print ? '100vh' : '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          color: 'text',
          bg: 'background',
          variant: 'styles.Slide',
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

export default Slide
