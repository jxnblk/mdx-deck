import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'
import { ThemeProvider } from 'styled-components'
import debounce from 'lodash.debounce'
import querystring from 'querystring'
import Swipeable from 'react-swipeable'
import { Provider as ContextProvider } from './context'
import DefaultProvider from './Provider'
import Carousel from './Carousel'
import Slide from './Slide'
import Dots from './Dots'
import Root from './Root'
import Presenter from './Presenter'
import Overview from './Overview'
import Grid from './Grid'
import GoogleFonts from './GoogleFonts'

import defaultTheme from './themes'
import defaultComponents from './components'

export { default as Image } from './Image'
export { default as Notes } from './Notes'
export { default as Appear } from './Appear'
export { default as Code } from './Code'
export { default as components } from './components'

// themes
export { default as theme } from './themes'
export * as themes from './themes'

const MDX_SLIDE_INDEX = 'mdx-slide-index'
const MDX_SLIDE_STEP = 'mdx-slide-step'

export const inc = state => state.index < state.length - 1
  ? ({
    index: (state.index + 1) % state.length,
    step: -1
  })
  : null
export const dec = state => state.index > 0
  ? ({
    index: (state.index - 1) % state.length,
    step: -1
  })
  : null

export const incStep = steps => state => ({
  step: state.step < steps.length - 1 ? state.step + 1 : state.step
})

export const decStep = () => state => ({
  step: state.step >= 0 ? state.step - 1 : -1
})

export const modes = {
  normal: 'NORMAL',
  presenter: 'PRESENTER',
  overview: 'OVERVIEW',
  grid: 'GRID',
}

export const toggleMode = key => state => ({
  mode: state.mode === modes[key] ? modes.normal : modes[key]
})

const keys = {
  'right': 39,
  'left': 37,
  'space': 32,
  'p': 80,
  'o': 79,
  'g': 71,
}

export class SlideDeck extends React.Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
    theme: PropTypes.object,
    components: PropTypes.object,
    Provider: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    ignoreKeyEvents: PropTypes.bool
  }

  static defaultProps = {
    slides: [],
    theme: defaultTheme,
    components: {} ,
    Provider: DefaultProvider,
    width: '100vw',
    height: '100vh',
    ignoreKeyEvents: false
  }

  state = {
    length: this.props.slides.length,
    index: 0,
    mode: modes.normal,
    notes: {},
    fragments: {},
    step: -1,
    seconds: 0,
    autoTransition: 0
  }

  update = fn => this.setState(fn)

  handleKeyDown = e => {
    if (document.activeElement.tagName !== 'BODY'
      || this.props.ignoreKeyEvents) {
      return
    }

    if (e.metaKey || e.ctrlKey || e.shiftKey) return

    const alt = e.altKey

    switch (e.keyCode) {
      case keys.right:
      case keys.space:
        e.preventDefault()
        this.next()
        break
      case keys.left:
        e.preventDefault()
        this.previous()
        break
      case keys.p:
        if (alt) {
          this.updateMode('presenter')
        }
        break
      case keys.o:
        if (alt) {
          this.updateMode('overview')
        }
        break
      case keys.g:
        if (alt) {
          this.updateMode('grid')
        }
        break
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
    const { mode } = querystring.parse(window.location.search.replace(/^\?/, ''))
    this.setState({
      mode: modes[mode] || modes.normal
    })
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

  addFragments = ({ index, children }) => {
    this.setState(state => ({
      fragments: {
        ...state.fragments,
        [index]: children
      }
    }))
  }

  setAutoTransition = (value) => {
    const autoTransition = parseInt(value, 10)
    if (isNaN(autoTransition)) return
    this.setState({ autoTransition })
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
    if (this.autoTransitionTimer) {
      clearInterval(this.autoTransitionTimer)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { index, mode, step, autoTransition } = this.state
    if (prevState.autoTransition !== autoTransition) {
      if (autoTransition > 0) {
        this.autoTransitionTimer = setInterval(this.autoTransition, 1000)
      } else if (this.autoTransitionTimer) {
        clearInterval(this.autoTransitionTimer)
      }
    }
    if (this.isHashChange) {
      this.isHashChange = false
      return
    }
    
    let query = ''
    if (mode && mode !== modes.normal) {
      query += '?' + querystring.stringify({
        mode: (mode || '').toLowerCase()
      })
    } else if (mode === modes.normal) {
      query += window.location.pathname
    }
    const step_ = step !== -1 ? ('.' + (step + 1)) : ''
    history.pushState(null, null, query + '#' + index + step_)
    localStorage.setItem(MDX_SLIDE_INDEX, index)
    localStorage.setItem(MDX_SLIDE_STEP, step)
  }

  autoTransition = () => {
    if (this.state.seconds >= this.state.autoTransition) {
      this.next()
      this.setState({ seconds: 1 })
    } else {
      this.setState(state => ({ seconds: state.seconds + 1 }))
    }
  }

  next = () => {
    const { fragments, index, step } = this.state
    const steps = fragments[index]
    if (steps && step < steps.length -1) {
      this.update(incStep(steps))
    } else {
      this.update(inc)
    }
  }

  previous = () => {
    const { fragments, index, step } = this.state
    const steps = fragments[index]
    if (steps && step !== - 1) {
      this.update(decStep())
    } else {
      this.update(dec)
    }
  }

  updateMode = (mode) => {
    this.update(toggleMode(mode))
  }

  render () {
    const {
      slides,
      theme,
      components: propsComponents,
      Provider: PropsProvider,
      width,
      height
    } = this.props
    const { index, length, mode, step} = this.state

    const {
      components = propsComponents,
      Provider = PropsProvider
    } = theme

    let Wrapper = Root
    if (mode === modes.presenter) {
      Wrapper = Presenter
    } else if (mode === modes.overview) {
      Wrapper = Overview
    }

    const context = {
      ...this.state,
      slides,
      addNotes: this.addNotes,
      addFragments: this.addFragments
    }

    return (
      <ContextProvider value={context}>
        <ThemeProvider theme={theme}>
          <MDXProvider
            components={{
              ...defaultComponents,
              ...components
            }}>
            <Provider {...this.state} update={this.update}>
              {mode === modes.grid ? (
                <Grid
                  slides={slides}
                  update={this.update}
                />
              ) : (
                <Swipeable
                  onSwipedLeft={() => this.update(inc)}
                  onSwipedRight={() => this.update(dec)}
                  trackMouse>
                  <Wrapper
                    {...this.state}
                    slides={slides}
                    width={width}
                    height={height}
                    update={this.update}
                    updateAutoTransition={this.setAutoTransition}>
                    <GoogleFonts />
                    <Carousel index={index}>
                      {slides.map((Component, i) => (
                        <Slide
                          key={i}
                          id={'slide-' + i}
                          index={i}
                          className='Slide'
                        >
                          <Component />
                        </Slide>
                      ))}
                    </Carousel>
                  </Wrapper>
                </Swipeable>
              )}
            </Provider>
          </MDXProvider>
        </ThemeProvider>
      </ContextProvider>
    )
  }
}

export default SlideDeck
