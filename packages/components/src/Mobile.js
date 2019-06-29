import React from 'react'
import Zoom from './Zoom'

import styled from '@emotion/styled'

const Button = styled.button(() => ({
  color: 'black',
  backgroundColor: 'white',
  width: '100%',
  height: '3rem',
}))

export const Mobile = props => {
  const { previous, next } = props

  return (
    <div
      style={{
        color: 'white',
        backgroundColor: '#111111',
        display: 'flex',
        userSelect: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button onClick={previous}>Previous</Button>
      <div style={{ flex: 'auto' }}>
        <Zoom zoom={0.9}>{props.children}</Zoom>
      </div>
      <Button onClick={next}>Next</Button>
    </div>
  )
}

export default Mobile
