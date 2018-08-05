import React from 'react'
import styled from 'styled-components'
import { space, color } from 'styled-system'

const Root = styled.div([], {
  display: 'flex',
  alignItems: 'center'
})

const Button = styled.button([], {
  appearance: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'bold',
  borderRadius: '4px',
  border: 'none',
  width: '2em',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px magenta'
  }
}, space, color)
Button.defaultProps = {
  m: 0,
  px: 3,
  py: 2,
  color: 'background',
  bg: 'text'
}

const Samp = styled.samp([], {
}, space)


export default class Counter extends React.Component {
  state = {
    count: 0
  }

  inc = () => {
    this.setState(state => ({count: state.count + 1}))
  }

  dec = () => {
    this.setState(state => ({count: state.count - 1}))
  }

  render() {
    return (
      <Root>
        <Button ml='auto' onClick={this.dec}>-</Button>
        <Samp mx={3}>{this.state.count}</Samp>
        <Button mr='auto' onClick={this.inc}>+</Button>
      </Root>
    )
  }
}
