import React from 'react'
import hhmmss from 'hhmmss'
import Flex from './Flex'
import Box from './Box'
import Mono from './Mono'

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

  getElapsed = () => {
    return hhmmss(this.state.seconds)
  }

  tick = () => {
    const now = new Date()
    this.setState(state => ({
      time: now.toLocaleTimeString(),
      seconds: state.on
        ? state.seconds + 1
        : state.seconds
    }))
  }

  componentDidMount () {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    if (!this.timer) return
    clearInterval(this.timer)
  }

  render () {
    const { time, on } = this.state
    const elapsed = this.getElapsed()

    return (
      <Flex>
        <button onClick={this.toggle}>
          {on ? 'stop' : 'start'}
        </button>
        <button onClick={this.reset}>
          reset
        </button>
        <Mono px={2}>
          {elapsed} |
        </Mono>
        <Mono>
          {time}
        </Mono>
      </Flex>
    )
  }
}

export default Timer
