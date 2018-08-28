import React from 'react'
import { withDeck } from './context'

export default withDeck(class extends React.Component {
  setNotes = (props) => {
    const { deck, children } = props
    if (typeof deck.index === 'undefined') return
    deck.addNotes({
      index: deck.index,
      children
    })
  }

  componentWillMount () {
    this.setNotes(this.props)
  }

  render () {
    return false
  }
})
