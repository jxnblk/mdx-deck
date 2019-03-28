import { useContext, useEffect } from 'react'
import { Context as C } from './context'

export const useStepsFactory = Context => length => {
  const context = useContext(Context)
  const { register, index, step } = context

  useEffect(() => {
    if (typeof register !== 'function') return
    register(index, { steps: length })
  }, [length])

  return step
}

export default useStepsFactory(C)
