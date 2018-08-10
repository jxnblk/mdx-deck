import React from 'react'
import PropTypes from 'prop-types'

class AutoTransition extends React.Component {
  static propTypes = {
    updateAutoTransition: PropTypes.func.isRequired,
    autoTransition: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isActive: props.autoTransition > 0
    }
  }

  toggleActive = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      this.setState({ isActive: true })
    } else {
      this.props.updateAutoTransition(0)
      this.setState({ isActive: false })
    }
  }

  update = (e) => {
    const value = parseInt(e.target.value, 10)
    if (isNaN(value)) {
      this.props.updateAutoTransition(0)
    } else {
      this.props.updateAutoTransition(value)
    }
  }

  render() {
    const { autoTransition } = this.props
    const { isActive } = this.state
    return (
      <div>
        auto transition
        <input type="checkbox" checked={isActive} onChange={this.toggleActive} />
        {isActive && <input value={autoTransition} onChange={this.update} />}
      </div>
    )
  }
}

export default AutoTransition
