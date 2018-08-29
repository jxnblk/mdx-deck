import React from 'react'
import { withDeck } from './context'
import { setNotes } from './updaters'

export default withDeck(class extends React.Component {
  constructor (props) {
    super(props)
    const { deck, children } = props
    if (typeof deck.index === 'undefined') return
    deck.update(setNotes(deck.index, children))
  }

  render () {
    return false
  }
})
