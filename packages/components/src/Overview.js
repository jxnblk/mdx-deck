import React from 'react'
import { Link } from '@reach/router'
import Zoom from './Zoom'
import Slide from './Slide'

const noop = () => {}

export const Overview = props => {
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
              <Slide register={noop}>
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
}

export default Overview
