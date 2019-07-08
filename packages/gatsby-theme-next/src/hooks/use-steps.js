import { useEffect } from 'react'
import useDeck from './use-deck'

export default length => {
  const context = useDeck()
  useEffect(() => {
    if (typeof context.register !== 'function') return
    context.register(context.index, {
      steps: length,
    })
  }, [])
  return context.step
}
