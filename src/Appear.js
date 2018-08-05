import React from 'react'
import PropTypes from 'prop-types'
import { withDeck } from './context'
import { withEvent } from './event'
import { withSlide } from './Slide'
import { modes, incStep, decStep } from './index'

export default withDeck(withSlide(withEvent(class Appear extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    slide: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.unsubscribe = this.props.event.subscribe(
      this.props.slide.index,
      this.handleKeyDown
    )
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  handleKeyDown = (e, next) => {
    const { children, deck } = this.props
    const { update } = this.props.deck
    switch (e.key) {
      case 'ArrowRight':
        if (deck.step >= children.length - 1) {
          next()
          return
        }
        e.preventDefault()
        update(incStep(children))
        break
      case 'ArrowLeft':
        if (deck.step === - 1) {
          next()
          return
        }
        e.preventDefault()
        update(decStep())
    }
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
})))
