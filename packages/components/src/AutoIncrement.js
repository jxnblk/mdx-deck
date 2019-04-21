import React, { useEffect } from 'react'
import { useDeck } from './context'

export const AutoIncrement = ({ delay }) => {
  const context = useDeck()
  useEffect(() => {
    if (!context.next) return
    const inc = () => {
      context.next()
    }
    const timer = window.setInterval(inc, delay)
    return () => {
      window.clearInterval(timer)
    }
  }, [context.metadata])

  return false
}

AutoIncrement.defaultProps = {
  delay: 3000,
}

export default AutoIncrement
