import React from 'react'
import { useDeck } from './context'

export const useSteps = (length) => {
  const context = useDeck()
  React.useEffect(() => {
    context.setSteps(length)
  }, [length])

  return context.step
}
