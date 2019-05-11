import React, { useEffect, useRef } from 'react'
import { useDeck } from './context'
import { useStep } from './useStep'

export const Notes = props => {
  const context = useDeck()
  if (!context || !context.register) {
    // The slide was rendered as a preview by the <Presenter> component.
    return false
  }

  const index = useRef(context.index).current
  const step = useStep()
  useEffect(() => {
    // The context changes before this component is unmounted.
    if (context.index !== index) return
    // Only render notes for the current step.
    if (context.step !== step) return

    // Only re-render if the notes changed.
    const meta = context.metadata[index] || {}
    if (meta.notes === props.children) return

    // Note: The last <Notes/> per slide always takes precedence.
    context.register(index, {
      notes: props.children,
    })
  })

  return false
}

export default Notes
