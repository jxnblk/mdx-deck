import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import SlideDeck from './SlideDeck'

const mod = require(FILENAME)
const slides = mod.default
const { theme, components, Provider } = mod

export default class App extends React.Component {
  render () {
    return (
      <SlideDeck
        {...this.props}
        slides={slides}
        theme={theme}
        components={components}
        Provider={Provider}
      />
    )
  }
}

if (typeof document !== 'undefined') {
  render(
    <App />,
    document.getElementById('root')
  )
}

if (module.hot) module.hot.accept()
