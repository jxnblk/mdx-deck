import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'
import { ThemeProvider } from 'styled-components'
import debounce from 'lodash.debounce'

import { Provider as ContextProvider } from './context'
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
export { default as Appear } from './Appear'
export { default as components } from './components'

// themes
export { default as theme } from './themes'
export * as themes from './themes'

const MDX_SLIDE_INDEX = 'mdx-slide-index'
const MDX_SLIDE_STEP = 'mdx-slide-step'

export const inc = state => ({
  index: (state.index + 1) % state.length, step: -1
})
export const dec = state => state.index > 0
  ? ({ index: (state.index - 1) % state.length, step: -1 })
  : null

export const incStep = steps => state => ({
  step: state.step < steps.length - 1 ? state.step + 1 : state.step
})

export const decStep = () => state => ({
  step: state.step >= 0 ? state.step - 1 : -1
})

const modes = {
  normal: 'NORMAL',
  presenter: 'PRESENTER',
}

export class SlideDeck extends React.Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
    components: PropTypes.object,
    theme: PropTypes.object,
    Provider: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    ignoreKeyEvents: PropTypes.bool
  }

  static defaultProps = {
    slides: [],
    theme: defaultTheme,
    components: {} ,
    Provider: props => <React.Fragment children={props.children} />,
    width: '100vw',
    height: '100vh',
    ignoreKeyEvents: false
  }

  state = {
    length: this.props.slides.length,
    index: 0,
    mode: modes.normal,
    notes: {},
    step: -1
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
    const [index_, step_] = hash.replace(/^#/, '').split('.')
    const index = parseInt(index_, 10)
    const step = parseInt(step_, 10)
    if (isNaN(index)) return
    this.setState({ index, step: isNaN(step) ? -1 : step - 1 })
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
    if (e.key === MDX_SLIDE_INDEX) {
      const index = parseInt(e.newValue, 10)
      this.setState({ index })
    } else if (e.key === MDX_SLIDE_STEP, 10) {
      const step = parseInt(e.newValue, 10)
      this.setState({ step })
    }
  }

  addNotes = ({ index, children }) => {
    this.setState(state => ({
      notes: {
        ...state.notes,
        [index]: children
      }
    }))
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
    const { index, mode, step } = this.state
    let query = '?'
    if (mode === modes.presenter) query += 'presenter'
    const step_ = step !== -1 ? ('.' + (step + 1)) : ''
    history.pushState(null, null, query + '#' + index + step_)
    localStorage.setItem(MDX_SLIDE_INDEX, index)
    localStorage.setItem(MDX_SLIDE_STEP, step)
  }

  render () {
    const {
      slides,
      theme,
      components,
      Provider,
      width,
      height
    } = this.props
    const { index, length, mode, step} = this.state

    const Wrapper = mode === modes.presenter
      ? Presenter
      : Root

    const context = {
      ...this.state,
      slides,
      addNotes: this.addNotes,
      update: this.update
    }

    return (
      <ContextProvider value={context}>
        <ThemeProvider theme={theme}>
          <MDXProvider
            components={{
              ...defaultComponents,
              ...components
            }}>
            <Provider {...this.state}>
              <Wrapper
                {...this.state}
                slides={slides}
                width={width}
                height={height}
                update={this.update}>
                <GoogleFonts />
                <Carousel index={index}>
                  {slides.map((Component, i) => (
                    <Slide
                      key={i}
                      id={'slide-' + i}
                      index={i}
                    >
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
            </Provider>
          </MDXProvider>
        </ThemeProvider>
      </ContextProvider>
    )
  }
}

export default SlideDeck
