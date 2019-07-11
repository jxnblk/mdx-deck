import { useEffect } from 'react'
import { useDeck } from './context'

export const Notes = props => {
  const context = useDeck()
  useEffect(() => {
    if (!context || !context.register) return
    if (typeof context.index === 'undefined') return
    context.register(context.index, {
      notes: props.children,
    })
  }, [])

  return false
}

export default Notes
