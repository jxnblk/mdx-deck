import React, { useEffect } from 'react'
import Zoom from './Zoom'
import Slide from './Slide'
import Pre from './Pre'

export const Overview = props => {
  const { goto, index, slides } = props
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
        display: 'flex',
        alignItems: 'flex-start',
        height: '100vh',
        color: 'white',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          flex: 'none',
          height: '100vh',
          paddingLeft: 4,
          paddingRight: 4,
          overflowY: 'auto',
          marginRight: 'auto',
        }}
      >
        {slides.map((Component, i) => (
          <div
            ref={i === index ? activeThumb : null}
            key={i}
            role="link"
            onClick={e => {
              goto(i)
            }}
            style={{
              display: 'block',
              color: 'inherit',
              textDecoration: 'none',
              padding: 0,
              marginTop: 4,
              marginBottom: 4,
              cursor: 'pointer',
              outline: i === index ? '4px solid #0cf' : null,
            }}
          >
            <Zoom zoom={1 / 6}>
              <Slide>
                <Component />
              </Slide>
            </Zoom>
          </div>
        ))}
      </div>
      <div
        style={{
          width: 200 / 3 + '%',
          margin: 'auto',
        }}
      >
        <Zoom zoom={2 / 3}>{props.children}</Zoom>
        <Pre>
          {index} of {slides.length - 1}
        </Pre>
      </div>
    </div>
  )
}

export default Overview
