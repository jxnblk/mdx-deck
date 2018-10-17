import React from 'react'
import PropTypes from 'prop-types'
import { withDeck } from './context'
import { setSteps } from './updaters'
import { modes } from './constants'

export default withDeck(
  class Appear extends React.Component {
    static propTypes = {
      children: PropTypes.array.isRequired,
      alt: PropTypes.bool,
      deck: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props)
      const { update, index } = props.deck
      const steps = React.Children.toArray(props.children).length
      update(setSteps(index, steps))
    }

    render() {
      const children = React.Children.toArray(this.props.children).map(
        child => (typeof child === 'string' ? <div>{child}</div> : child)
      )
      const {
        alt,
        deck: { step, mode },
      } = this.props

      if (mode === modes.grid) {
        return children
      }

      const onlyCurrentChild = (_, i) => !alt || (alt && i === step - 1)

      return (
        <React.Fragment>
          {children.filter(onlyCurrentChild).map((child, i) =>
            React.cloneElement(child, {
              key: i,
              style: {
                visibility: step >= i + 1 ? 'visible' : 'hidden',
              },
            })
          )}
        </React.Fragment>
      )
    }
  }
)
