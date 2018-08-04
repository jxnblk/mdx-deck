import React from 'react'
import PropTypes from 'prop-types'
import SlideDeck from './index'

const mod = require(DOC_FILENAME)
const slides = mod.default
const { theme, highlight, components, Provider } = mod

export default class App extends React.Component {
  render () {
    return (
      <SlideDeck
        slides={slides}
        theme={{...theme, highlight}}
        components={components}
        Provider={Provider}
      />
    )
  }
}
