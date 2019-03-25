import React from 'react'
import { globalHistory } from '@reach/router'
import Zoom from './Zoom'
import Slide from './Slide'
import Pre from './Pre'
import Clock from './Clock'

export const Presenter = props => {
  const { slides, index, step } = props
  const Current = slides[index]
  const { notes, steps } = Current.meta || {}
  // "next" slide in Presenter includes all the animations
  const nextStep = step < steps ? step + 1 : 0
  // nextStep==0 means we are out of steps and/or the current slide has no steps
  const Next = nextStep == 0 ? slides[index + 1] : Current

  return (
    <div
      style={{
        color: 'white',
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
              <Slide step={nextStep}>
                <Next />
              </Slide>
            )}
          </Zoom>
          <Pre>{notes}</Pre>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Pre>
          {index} of {slides.length - 1}
        </Pre>
        <div style={{ margin: 'auto' }} />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={globalHistory.location.origin + globalHistory.location.pathname}
          style={{
            color: 'inherit',
          }}
        >
          Open New Window
        </a>
        <div style={{ margin: 'auto' }} />
        <Clock />
      </div>
    </div>
  )
}

export default Presenter
