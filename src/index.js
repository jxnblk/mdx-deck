import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'
import { ThemeProvider } from 'styled-components'
import debounce from 'lodash.debounce'

import { Provider } from './context'
import Carousel from './Carousel'
import Slide from './Slide'
import Dots from './Dots'
import Root from './Root'
import Presenter from './Presenter'
import GoogleFonts from './GoogleFonts'

import defaultTheme from './themes'
import defaultComponents from './components'

export { default as Image } from './Image'
export { default as Notes } from './Notes'
export { default as components } from './components'

// themes
export { default as theme } from './themes'
export * as themes from './themes'

export const inc = state => ({ index: (state.index + 1) % state.length })
export const dec = state => state.index > 0
  ? ({ index: (state.index - 1) % state.length })
  : null


const modes = {
  normal: 'NORMAL',
  presenter: 'PRESENTER',
}

export class SlideDeck extends React.Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
  }

  static defaultProps = {
    slides: [],
    theme: defaultTheme,
    components: {} ,
    width: '100vw',
    height: '100vh',
    ignoreKeyEvents: false
  }

  state = {
    length: this.props.slides.length,
    index: 0,
    mode: modes.normal
  }

  update = fn => this.setState(fn)

  handleKeyDown = e => {
    if (this.props.ignoreKeyEvents) {
      return
    }

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault()
        this.update(inc)
        break
      case 'ArrowLeft':
        e.preventDefault()
        this.update(dec)
        break
      case 'p':
        this.update(state => ({
          mode: state.mode === modes.presenter ? modes.normal : modes.presenter
        }))
    }
  }

  handleHashChange = e => {
    this.isHashChange = true
    this.hashToState()
  }

  hashToState = () => {
    const { hash } = window.location
    const index = parseInt(hash.replace(/^#/, ''), 10)
    if (isNaN(index)) return
    this.setState({ index })
  }

  getMode = () => {
    const { search } = window.location
    const presenter = search.includes('presenter')
    if (presenter) {
      this.setState({
        mode: modes.presenter
      })
    }
  }

  handleStorageChange = e => {
    const index = parseInt(e.newValue, 10)
    this.setState({ index })
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('hashchange', this.handleHashChange)
    window.addEventListener('storage', this.handleStorageChange)
    this.hashToState()
    this.getMode()
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('hashchange', this.handleHashChange)
    window.removeEventListener('storage', this.handleStorageChange)
  }

  componentDidUpdate () {
    if (this.isHashChange) {
      this.isHashChange = false
      return
    }
    const { index } = this.state
    history.pushState(null, null, '#' + index)
    localStorage.setItem('mdx-slide', index)
  }

  render () {
    const {
      slides,
      theme,
      components,
      width,
      height
    } = this.props
    const { index, length, mode } = this.state

    const Wrapper = mode === modes.presenter
      ? Presenter
      : Root

    const context = {
      ...this.state,
      slides,
    }

    return (
      <Provider value={context}>
        <ThemeProvider theme={theme}>
          <MDXProvider
            components={{
              ...defaultComponents,
              ...components
            }}>
            <Wrapper
              {...this.state}
              slides={slides}
              width={width}
              height={height}>
              <GoogleFonts />
              <Carousel index={index}>
                {slides.map((Component, i) => (
                  <Slide
                    key={i}
                    id={'slide-' + i}
                    index={i}>
                    <Component />
                  </Slide>
                ))}
              </Carousel>
              <Dots
                mt={-32}
                mx='auto'
                index={index}
                length={length}
                onClick={index => {
                  this.setState({ index })
                }}
              />
            </Wrapper>
          </MDXProvider>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default SlideDeck
