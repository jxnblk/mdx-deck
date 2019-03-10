import React, { useState, useEffect } from 'react'
import hhmmss from 'hhmmss'
import Pre from './Pre'

const spacer = <div style={{ margin: 4 }} />

let timer

const Clock = props => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [seconds, setSeconds] = useState(0)
  const [on, setTimer] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
      if (on) setSeconds(seconds + 1)
    }
    timer = setInterval(tick, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <button
        disabled={!seconds || on}
        onClick={e => {
          setSeconds(0)
        }}
      >
        Reset
      </button>
      {spacer}
      <button
        onClick={e => {
          setTimer(!on)
        }}
      >
        {on ? 'Pause' : 'Start'}
      </button>
      {spacer}
      <Pre>
        {hhmmss(seconds)} | {time}
      </Pre>
    </div>
  )
}

export default Clock
