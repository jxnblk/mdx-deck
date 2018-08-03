import React from 'react'
import PropTypes from 'prop-types'

export default class FragmentBlock extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fragments: props.children,
      fragmentStep: -1
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.setState(state => {
          return {
            fragmentStep:
              state.fragmentStep < state.fragments.length - 1
                ? state.fragmentStep + 1
                : state.fragmentStep
          }
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        this.setState(state => {
          return {
            fragmentStep: state.fragmentStep >= 0 ? state.fragmentStep - 1 : -1
          }
        })
        break
    }
  }

  render() {
    const {fragments, fragmentStep} = this.state;
    return (
      <div>
        {fragments.map((fragment, index) => (
          <div
            style={{
              visibility: index <= fragmentStep ? 'visible' : 'hidden'
            }}
            key={index}>
            {fragment}
          </div>
        ))}
      </div>
    )
  }
}
