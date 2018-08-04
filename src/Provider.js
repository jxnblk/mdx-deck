import React from 'react'
import styled from 'styled-components'
import Dots from './Dots'

const Bottom = styled.div([], {
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
})

export default class Provider extends React.Component {
  render () {
    const {
      children,
      index,
      length,
      update,
    } = this.props

    return (
      <React.Fragment>
        {children}
        <Bottom>
          <Dots
            mx='auto'
            mb={2}
            index={index}
            length={length}
            onClick={index => {
              update({ index })
            }}
          />
        </Bottom>
      </React.Fragment>
    )
  }
}
