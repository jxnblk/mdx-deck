import React from 'react'
import styled from 'styled-components'
import { space, color } from 'styled-system'

const Button = styled.button([], {
  appearance: 'none',
  fontFamily: 'inherit',
  fontSize: '12px',
  fontWeight: 'bold',
  borderRadius: '4px',
  border: 'none',
  margin: '10px'
}, space, color)


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
      <div>
        {this.state.count}
        <hr />
        <Button onClick={this.inc}>Inc</Button>
        <Button onClick={this.dec}>Dec</Button>
      </div>
    )
  }
}
