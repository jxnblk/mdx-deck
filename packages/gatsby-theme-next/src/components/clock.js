import { useEffect, useState } from 'react'

export const Clock = props => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
    }
    const timer = setInterval(tick, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return time
}

export default Clock
