import React from 'react'

export class Catch extends React.Component {
  state = {
    err: null,
  }

  componentDidCatch(err) {
    this.setState({ err })
  }

  componentDidUpdate() {
    if (!this.state.err) return
    this.setState({ err: null })
  }

  render() {
    if (this.state.err) {
      return <pre children={this.state.err.toString()} />
    }
    return <>{this.props.children}</>
  }
}

export default Catch
