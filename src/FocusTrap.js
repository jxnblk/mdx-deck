import React from 'react'
import tabbable from 'tabbable'

export default class extends React.Component {
  root = React.createRef()
  active = false

  handleKeyDown = e => {
    console.log('keydown', e, this.props.index)
  }

  handleFocusIn = e => {
    console.log('focusin', e, this.nodes)
    e.stopImmediatePropagation()
  }

  activate = () => {
    this.active = true
    document.addEventListener('focusin', this.handleFocusIn, true)
    document.addEventListener('keydown', this.handleKeyDown, true)
    // document.addEventListener('mousedown', checkPointerDown, true)
    // document.addEventListener('touchstart', checkPointerDown, true)
    // document.addEventListener('click', checkClick, true)
  }

  deactivate = () => {
    this.active = false
    document.removeEventListener('focusin', this.handleFocusIn, true)
    document.removeEventListener('keydown', this.handleKeyDown, true)
  }

  componentDidMount () {
    this.nodes = tabbable(this.root.current)
    if (this.props.active) this.activate()
  }

  componentDidUpdate () {
    if (this.props.active) {
      this.activate()
    } else if (this.active) {
      this.deactivate()
    }
  }

  render () {
    const {
      children,
      active,
      ...props
    } = this.props

    if (active) console.log('focusTrap', props)
    // if (!active) return children

    return (
      <div
        ref={this.root}
        {...props}>
        {children}
      </div>
    )
  }
}
