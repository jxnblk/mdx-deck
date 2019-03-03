import React from 'react'
import { render } from 'react-dom'
import { MDXDeck } from '@mdx-deck/components'

const mod = require(FILENAME)
const { slides, theme, themes } = mod

export default class App extends React.Component {
  render() {
    return <MDXDeck slides={slides} theme={theme} themes={themes} />
  }
}

if (typeof document !== 'undefined') {
  render(<App />, document.getElementById('root'))
}

if (module.hot) module.hot.accept()
