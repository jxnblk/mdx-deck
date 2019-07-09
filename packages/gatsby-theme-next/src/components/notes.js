import { useEffect } from 'react'
import useDeck from '../hooks/use-deck'

export const Notes = props => {
  const context = useDeck()
  useEffect(() => {
    context.register(context.index, 'notes', props.children)
  }, [props.children])

  return false
}

export default Notes
