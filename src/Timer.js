import React from 'react'
import hhmmss from 'hhmmss'
import Flex from './Flex'
import Box from './Box'
import Mono from './Mono'
import Button from './Button'
class Timer extends React.Component {
  state = {
    on: false,
    time: new Date().toLocaleTimeString(),
    seconds: 0
  }

  toggle = () => {
    this.setState(state => ({ on: !state.on }))
  }

  reset = () => {
    this.setState({ seconds: 0 })
  }

  tick = () => {
    const now = new Date()
    this.setState(state => ({
      time: now.toLocaleTimeString(),
      seconds: state.on ? state.seconds + 1 : state.seconds
    }))
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    if (!this.timer) return
    clearInterval(this.timer)
  }

  render() {
    const { time, seconds, on } = this.state
    const elapsed = hhmmss(seconds)

    return (
      <Flex css={{ alignItems: 'center' }}>
        {!on &&
          seconds > 0 && (
            <Button mr={1} onClick={this.reset}>
              reset
            </Button>
          )}
        <Button bg={on ? '#600' : '#060'} onClick={this.toggle}>
          {on ? 'stop' : 'start'}
        </Button>
        <Mono px={2}>{elapsed} |</Mono>
        <Mono>{time}</Mono>
      </Flex>
    )
  }
}

export default Timer
