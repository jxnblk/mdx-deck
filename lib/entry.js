import React from 'react'
import PropTypes from 'prop-types'
import SlideDeck from '../src'

const mod = require(DOC_FILENAME)
const slides = mod.default
const { theme, components } = mod

export default class App extends React.Component {
  static defaultProps = {
    slides,
    theme,
    components
  }

  render () {
    const {
      slides,
      theme,
      components
    } = this.props
    console.log(theme)

    return (
      <SlideDeck
        slides={slides}
        theme={theme}
        components={components}
      />
    )
  }
}

if (module.hot) module.hot.accept()
