import React from 'react'
import createFocusTrap from 'focus-trap'

export default class extends React.Component {
  root = React.createRef()

  activate = () => {
    this.trap.activate()
  }

  deactivate = () => {
    this.trap.deactivate()
  }

  componentDidMount () {
    this.trap = createFocusTrap(this.root.current, {
      initialFocus: document.body,
      fallbackFocus: document.body,
      clickOutsideDeactivates: false,
    })
    if (this.props.active) this.activate()
  }

  componentDidUpdate () {
    if (this.props.active) {
      this.activate()
    } else {
      this.deactivate()
    }
  }

  render () {
    const {
      children,
      active,
      ...props
    } = this.props

    return (
      <div
        ref={this.root}
        {...props}>
        {children}
      </div>
    )
  }
}
