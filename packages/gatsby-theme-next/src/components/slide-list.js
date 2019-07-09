/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useRef } from 'react'
import Zoom from './zoom'
import Slide from './slide'
import useDeck from '../hooks/use-deck'

const noop = () => {}

export const SlideList = ({
  slides = [],
  ratio = 16 / 9,
  zoom = 1 / 4,
  onClick = noop,
  ...props
}) => {
  const { index } = useDeck()
  const thumb = useRef(null)

  useEffect(() => {
    const el = thumb.current
    if (!el) return
    if (typeof el.scrollIntoViewIfNeeded === 'function') {
      el.scrollIntoViewIfNeeded()
    }
  })

  return (
    <React.Fragment>
      {slides.map((slide, i) => (
        <div
          {...props}
          key={i}
          role="link"
          ref={i === index ? thumb : null}
          onClick={e => {
            onClick(i)
          }}
          style={
            index === i
              ? {
                  position: 'relative',
                  zIndex: 1,
                }
              : null
          }
          sx={{
            m: 2,
            cursor: 'pointer',
            outline: index === i ? `4px solid cyan` : null,
          }}>
          <Zoom zoom={zoom} ratio={ratio}>
            <Slide slide={slide} preview />
          </Zoom>
        </div>
      ))}
    </React.Fragment>
  )
}

export default SlideList
