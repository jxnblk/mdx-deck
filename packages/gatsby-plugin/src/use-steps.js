import React from 'react'
import { useDeck } from './context'

export const useSteps = length => {
  const context = useDeck()

  React.useEffect(() => {
    if (!context.main) return
    context.setSteps(length)
    if (context.direction < 0) context.setStep(length)
  }, [length, context])

  if (!context.main) return length
  return context.step
}

export default useSteps
