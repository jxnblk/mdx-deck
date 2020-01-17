/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import hhmmss from 'hhmmss'

export default props => {
  const [seconds, setSeconds] = React.useState(0)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!active) return
      setSeconds(n => n + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [active])

  return (
    <button
      onClick={e => {
        setActive(!active)
        if (active) setSeconds(0)
      }}
      title={active ? 'Stop Timer' : 'Start Timer'}
      sx={{
        appearance: 'none',
        fontFamily: '"Roboto Mono", Menlo, monospace',
        fontSize: 'inherit',
        color: 'white',
        bg: 'black',
        border: 0,
        padding: 2,
      }}>
      {hhmmss(seconds)}
    </button>
  )
}
