import React from 'react'

export default props => {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString())

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return time
}
