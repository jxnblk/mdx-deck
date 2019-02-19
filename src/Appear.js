import React from 'react'
import PropTypes from 'prop-types'
import { withDeck } from './context'
import { setSteps } from './updaters'
import { modes } from './constants'

export default withDeck(
  class Appear extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      deck: PropTypes.object.isRequired,
    }

    static getDerivedStateFromProps(props) {
      const { deck } = props
      if (!deck.active) return null
      return {
        step: deck.step,
      }
    }

    constructor(props) {
      super(props)
      const { update, index } = props.deck
      const steps = React.Children.toArray(props.children).length
      this.state = {
        step: 0,
      }
      update(setSteps(index, steps))
    }

    render() {
      const children = React.Children.toArray(this.props.children).map(child =>
        typeof child === 'string' ? <div>{child}</div> : child
      )
      const { mode } = this.props.deck

      if (mode === modes.grid) {
        return children
      }

      if (
        typeof window !== 'undefined' &&
        window.navigator.userAgent.includes('Print/PDF')
      ) {
        return children
      }

      const { step } = this.state

      return (
        <React.Fragment>
          {children.map((child, i) =>
            React.cloneElement(child, {
              key: i,
              style: {
                ...((child.props || {}).style || {}),
                visibility: step >= i + 1 ? 'visible' : 'hidden',
              },
            })
          )}
        </React.Fragment>
      )
    }
  }
)
