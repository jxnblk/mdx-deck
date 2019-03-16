import React, { useEffect } from 'react'
import { Location, navigate } from '@reach/router'
import Zoom from './Zoom'
import Slide from './Slide'

const getIndex = ({ pathname }) => {
  return Number(pathname.split('/')[1] || 0)
}

const withLocation = Component => props => (
  <Location
    children={({ location }) => (
      <Component {...props} location={location} index={getIndex(location)} />
    )}
  />
)

export const Grid = withLocation(props => {
  const { index, slides, modes, update } = props
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
              navigate('/' + i)
              update({ mode: modes.NORMAL })
            }}
            style={{
              display: 'block',
              width: '25vw',
              height: '25vh',
              padding: '2px',
              overflow: 'hidden',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
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
})

export default Grid
