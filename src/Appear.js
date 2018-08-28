import React from 'react'
import PropTypes from 'prop-types'
import { withDeck } from './context'
import { incStep, decStep } from './updaters'
import { modes } from './constants'

export default withDeck(class Appear extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    deck: PropTypes.object.isRequired
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (!this.props.deck.active) return
    const { children } = this.props
    const { update } = this.props.deck
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        update(incStep(children))
        break
      case 'ArrowUp':
        e.preventDefault()
        update(decStep())
        break
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
})
