import React from 'react'
import { render } from 'react-dom'
import { MDXDeck } from './index'

const mod = require(FILENAME)
const slides = mod.default
const { theme, components, Provider } = mod

export default class App extends React.Component {
  render() {
    return (
      <MDXDeck
        slides={slides}
        theme={theme}
        components={components}
        Provider={Provider}
      />
    )
  }
}

if (typeof document !== 'undefined') {
  render(<App />, document.getElementById('root'))
}

if (module.hot) module.hot.accept()
