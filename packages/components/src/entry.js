import React from 'react'
import { render } from 'react-dom'
import { MDXDeck } from './index'

const mod = require(FILENAME)
const { slides } = mod
const { theme, components, Provider } = mod

console.log(slides)

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
