import React from 'react'
import Zoom from './Zoom'
import Slide from './Slide'

const noop = () => {}

export const Presenter = props => {
  const { slides, index } = props
  const Current = slides[index]
  const Next = slides[index + 1]
  const { notes } = Current.meta || {}

  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: 500 / 8 + '%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Zoom zoom={5 / 8}>{props.children}</Zoom>
        </div>
        <div
          style={{
            width: 100 / 4 + '%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Zoom zoom={1 / 4}>
            {Next && (
              <Slide>
                <Next />
              </Slide>
            )}
          </Zoom>
          {notes}
        </div>
      </div>
      <div
        style={{
          color: 'white',
          padding: 16,
          fontSize: 20,
        }}
      >
        <pre style={{ fontFamily: 'Menlo, monospace' }}>
          {index + 1} of {slides.length}
        </pre>
      </div>
    </div>
  )
}

export default Presenter
