import React from 'react'
import PropTypes from 'prop-types'
import hhmmss from 'hhmmss'
import styled from 'styled-components'
import { space, color } from 'styled-system'
import Flex from './Flex'
import Box from './Box'
import Mono from './Mono'

const Button = styled.button([], {
  appearance: 'none',
  fontFamily: 'inherit',
  fontSize: '12px',
  fontWeight: 'bold',
  borderRadius: '4px',
  border: 'none'
}, space, color)

Button.propTypes = {
  ...space.propTypes,
  ...color.propTypes
}

Button.defaultProps = {
  m: 0,
  px: 2,
  py: 1,
  color: 'white',
  bg: '#333'
}

const direction = {
  normal: 0,
  countdown: 1
}

const MINUTES = 60

class Timer extends React.Component {

  static propTypes = {
    timer: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      on: false,
      time: new Date().toLocaleTimeString(),
      seconds: 0,
      directionMode: direction.normal,
      countdownTime: props.timer * MINUTES
    }
  }

  toggle = () => {
    this.setState(state => ({ on: !state.on }))
  }

  toggleDirection = () => {
    this.setState(state => {
      if (state.directionMode == direction.normal) {
        return {
          directionMode: direction.countdown,
          seconds: 0
        }
      }

      return {
        directionMode: direction.normal,
        seconds: 0
      }
    })
  }

  updateCountdownTime = (e) => {
    const value = e.target.value
    const countdownTime = parseInt(value, 10) * MINUTES || 0
    this.setState(state => ({ countdownTime, seconds: 0 }))
  }

  reset = () => {
    this.setState(state => ({ seconds: 0}))
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
    const { time, seconds, on, directionMode, countdownTime } = this.state
    const elapsed = directionMode === direction.normal
      ? hhmmss(seconds)
      : countdownTime - seconds >= 0
        ? hhmmss(countdownTime - seconds)
        : (
          <span style={{color: "#600"}}>
            - {hhmmss(seconds - countdownTime)}
          </span>
        )

    return (
      <Flex css={{ alignItems: 'center' }}>
        {!on && (
          <Button
            bg={directionMode === direction.normal ? '#666' : '#060'}
            onClick={this.toggleDirection}> switch to {' '}
            {directionMode === direction.normal
              ? 'countdown mode'
              : 'normal mode'
            }
          </Button>
        )}
        {!on && seconds > 0 && (
          <Button mr={1} onClick={this.reset}>
            reset
          </Button>
        )}
        {directionMode === direction.countdown && (
          <Mono px={2}>Presentation Time:
            <input
              value={countdownTime/MINUTES}
              onChange={this.updateCountdownTime}
              type="number"
              disabled={on}
              min="0"
              step="1"
            />
            minutes
          </Mono>
        )}
        <Button
          bg={on ? '#600' : '#060'}
          onClick={this.toggle}>
          {on ? 'stop' : 'start'}
        </Button>
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
