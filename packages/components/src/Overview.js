import React from 'react'
import { Location, Link } from '@reach/router'
import Zoom from './Zoom'
import Slide from './Slide'

const noop = () => {}

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

export const Overview = withLocation(props => {
  const { index, slides } = props

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        height: '100vh',
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
          <Link
            key={i}
            to={'/' + i}
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
          </Link>
        ))}
      </div>
      <div
        style={{
          width: 200 / 3 + '%',
          margin: 'auto',
        }}
      >
        <Zoom zoom={2 / 3}>{props.children}</Zoom>
        <pre style={{ color: 'white' }}>
          {index}/{slides.length}
        </pre>
      </div>
    </div>
  )
})

export default Overview
