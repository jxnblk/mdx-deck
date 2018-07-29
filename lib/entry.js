import React from 'react'
import PropTypes from 'prop-types'
import SlideDeck from '../src'

const mod = require(DOC_FILENAME)
const slides = mod.default
const { theme, components } = mod

export default class App extends React.Component {
  render () {
    return (
      <SlideDeck
        slides={slides}
        theme={theme}
        components={components}
      />
    )
  }
}
