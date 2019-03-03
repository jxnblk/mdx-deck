import React from 'react'
import Zoom from './Zoom'
import Slide from './Slide'

const noop = () => {}

const SpeakerNotes = props => (
  <pre
    {...props}
    style={{
      fontSize: 20,
      textAlign: 'left',
      whiteSpace: 'pre-wrap',
    }}
  />
)

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
            minWidth: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Zoom zoom={5 / 8}>{props.children}</Zoom>
        </div>
        <div
          style={{
            width: 100 / 4 + '%',
            minWidth: 0,
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
          <SpeakerNotes>{notes}</SpeakerNotes>
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
