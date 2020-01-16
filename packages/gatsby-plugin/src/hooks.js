import React from 'react'
import { useDeck } from './context'

export const useSteps = (length) => {
  const context = useDeck()
  React.useEffect(() => {
    // if (!context.isMain) return
    context.setSteps(length)
  }, [length])

  // if (!context.isMain) return length

  return context.step
}
