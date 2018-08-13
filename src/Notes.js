import React from 'react'
import { withDeck } from './context'
import { withSlide } from './Slide'

export default withDeck(withSlide(class extends React.Component {
  setNotes = (props) => {
    const { slide, deck, children } = props
    if (typeof slide.index === 'undefined') return
    deck.addNotes({
      index: slide.index,
      children
    })
  }

  componentWillMount () {
    this.setNotes(this.props)
  }

  render () {
    return false
  }
}))
