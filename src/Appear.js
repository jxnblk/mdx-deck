import React from 'react'
import PropTypes from 'prop-types'
import { withDeck } from './context'
import { withSlide } from './Slide'
import { modes } from './index'

export default withDeck(withSlide(class Appear extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    slide: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { slide, deck, children } = this.props
    deck.addFragments({
      index: slide.index,
      children
    })
  }

  render() {
    const { children } = this.props
    const { step, mode } = this.props.deck
    const isOverview = mode === modes.overview
    return (
      <React.Fragment>
        {children.map((fragment, index) =>
          typeof fragment === 'string' ? (
            <div
              key={index}
              style={{
                visibility: (isOverview || index <= step) ? 'visible' : 'hidden'
              }}>
              {fragment}
            </div>
          ) : (
            React.cloneElement(fragment, {
              key: index,
              style: {
                visibility: (isOverview || index <= step) ? 'visible' : 'hidden'
              }
            })
        ))}
      </React.Fragment>
    )
  }
}))
