import React from 'react'
import { withContext } from './context'

export const Notes = withContext(
  class extends React.Component {
    constructor(props) {
      super(props)
      const { context, children } = props
      if (
        !context ||
        typeof context.index === 'undefined' ||
        typeof context.register !== 'function'
      ) {
        return
      }
      context.register(context.index, { notes: children })
    }

    render() {
      return false
    }
  }
)

export default Notes
