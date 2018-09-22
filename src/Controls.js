import React, { Fragment } from 'react'
import styled, { withTheme } from 'styled-components'
import { previous, next } from './updaters'

const Button = styled.div([], {
  cursor: 'pointer',
  width: '64px',
  height: '100vh',
})
const Previous = styled(Button)([], {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
})
const Next = styled(Button)([], {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
})

const Controls = ({ update, theme: { controls } }) =>
  controls !== false ? (
    <Fragment>
      {console.log(controls)}
      <Previous
        role="button"
        title="Previous Slide"
        onClick={e => {
          update(previous)
        }}
      />
      <Next
        role="button"
        title="Next Slide"
        onClick={e => {
          update(next)
        }}
      />
    </Fragment>
  ) : null

export default withTheme(Controls)
