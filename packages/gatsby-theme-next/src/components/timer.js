/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect } from 'react'
import hhmmss from 'hhmmss'
import useDeck from '../hooks/use-deck'

let ticker

export const Timer = props => {
  const { setState, timer = false, seconds = 0 } = useDeck()

  useEffect(() => {
    const tick = () => {
      if (!timer) return
      setState({
        seconds: seconds + 1,
      })
    }
    ticker = setInterval(tick, 1000)
    return () => {
      clearInterval(ticker)
    }
  }, [timer, seconds])

  const toggle = () => {
    setState({
      timer: !timer,
    })
  }

  const reset = () => {
    setState({ seconds: 0 })
  }

  return (
    <React.Fragment>
      <button
        onClick={reset}
        disabled={!seconds}
        title="Reset timer"
        sx={{
          mx: 1,
        }}>
        Reset
      </button>{' '}
      <button
        title={timer ? 'Stop timer' : 'Start timer'}
        onClick={toggle}
        sx={{
          mx: 1,
        }}>
        {timer ? 'Stop' : 'Start'}
      </button>{' '}
      {hhmmss(seconds)}
    </React.Fragment>
  )
}

export default Timer
