import { useEffect } from 'react'
import useDeck from './use-deck'

export const useSteps = length => {
  const context = useDeck()
  useEffect(() => {
    if (typeof context.register !== 'function') return
    context.register(context.index, 'steps', length)
  }, [])
  if (context.preview) return length
  return context.step
}

export default useSteps
