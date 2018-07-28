import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import SlideDeck from './SlideDeck'

// todo: dynamic import
import slides, {
  theme,
  components,
  meta
} from '../docs/index.mdx'


class App extends React.Component {
  render () {
    const {
      slides,
      theme,
      components
    } = this.props

    return (
      <SlideDeck
        slides={slides}
        theme={theme}
        components={components}
      />
    )
  }
}

render(
  <App
    slides={slides}
    theme={theme}
    components={components}
  />,
  window.root
)

if (module.hot) module.hot.accept()
