import React from 'react'
import PropTypes from 'prop-types'
import { withSlide } from './Slide'

export default withSlide(class Appear extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    slide: PropTypes.object.isRequired
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (!this.props.slide.active) return
    const { children } = this.props
    const { update } = this.props.slide
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        update(state => ({
          step: state.step < children.length - 1 ? state.step + 1 : state.step
        }))
        break
      case 'ArrowUp':
        e.preventDefault()
        update(state => ({ step: state.step >= 0 ? state.step - 1 : -1 }))
        break
    }
  }

  render() {
    const { children } = this.props
    const { step } = this.props.slide
    return (
      <React.Fragment>
        {children.map((fragment, index) =>
          typeof fragment === 'string' ? (
            <div
              key={index}
              style={{
                visibility: index <= step ? 'visible' : 'hidden'
              }}>
              {fragment}
            </div>
          ) : (
            React.cloneElement(fragment, {
              key: index,
              style: {
                visibility: index <= step ? 'visible' : 'hidden'
              }
            })
        ))}
      </React.Fragment>
    )
  }
})
