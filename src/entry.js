import React from 'react'
import PropTypes from 'prop-types'
import SlideDeck from './index'

const mod = require(DOC_FILENAME)
const slides = mod.default
const { theme, components, Provider, timer } = mod

export default class App extends React.Component {
  render () {
    return (
      <SlideDeck
        slides={slides}
        theme={theme}
        components={components}
        Provider={Provider}
        timer={timer}
      />
    )
  }
}
