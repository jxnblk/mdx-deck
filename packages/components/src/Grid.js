import React, { useEffect } from 'react'
import Zoom from './Zoom'
import Slide from './Slide'

export const Grid = props => {
  const { index, slides, modes, update, goto } = props
  const activeThumb = React.createRef()

  useEffect(() => {
    const el = activeThumb.current
    if (!el) return
    if (typeof el.scrollIntoViewIfNeeded === 'function') {
      el.scrollIntoViewIfNeeded()
    }
  })

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        color: 'white',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {slides.map((Component, i) => (
          <div
            ref={i === index ? activeThumb : null}
            key={i}
            role="link"
            onClick={e => {
              goto(i)
              update({ mode: modes.NORMAL })
            }}
            style={{
              display: 'block',
              width: 'calc(25vw - 4px)',
              height: 'calc(25vh - 4px)',
              margin: '2px',
              overflow: 'hidden',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
              outline: i === index ? '4px solid #0cf' : null,
            }}
          >
            <Zoom zoom={1 / 4}>
              <Slide>
                <Component />
              </Slide>
            </Zoom>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid
