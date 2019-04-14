import React from 'react'
import { render } from 'react-dom'
import { MDXDeck } from '@mdx-deck/components'

const mod = require(FILENAME)
const { default: mdx, slides, theme, themes } = mod

export default class App extends React.Component {
  render() {
    return (
      <MDXDeck
        {...this.props}
        slides={slides}
        theme={theme}
        themes={themes}
        mdx={mdx}
      />
    )
  }
}

const { basepath } = OPTIONS
App.defaultProps = {
  basepath,
}

if (typeof document !== 'undefined') {
  const div = document.getElementById('root')
  render(<App />, div)
}

if (module.hot) module.hot.accept()
