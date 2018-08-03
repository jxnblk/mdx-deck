import React from 'react'
import { withDeck } from './context'
import { withSlide } from './Slide'

export default withDeck(withSlide(class extends React.Component {
  componentDidUpdate () {
    console.log(
      this.props.children,
      this.props.slide,
      this.props.deck
    )
  }

  render () {
    return false
  }
}))
