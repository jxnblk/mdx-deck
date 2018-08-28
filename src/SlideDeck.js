import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'
import { ThemeProvider } from 'styled-components'
import debounce from 'lodash.debounce'
import querystring from 'querystring'
import Swipeable from 'react-swipeable'
import { HeadProvider } from './Head'
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
import {
  inc,
  dec,
  incStep,
  decStep,
  toggleMode,
} from './updaters'
import {
  modes,
  keys,
  MDX_SLIDE_INDEX,
  MDX_SLIDE_STEP,
} from './constants'

export class SlideDeck extends React.Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
    theme: PropTypes.object,
    components: PropTypes.object,
    Provider: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    ignoreKeyEvents: PropTypes.bool,
    headTags: PropTypes.array.isRequired,
  }

  static defaultProps = {
    slides: [],
    theme: defaultTheme,
    components: {} ,
    Provider: DefaultProvider,
    width: '100vw',
    height: '100vh',
    ignoreKeyEvents: false,
    headTags: [],
  }

  state = {
    length: this.props.slides.length,
    index: 0,
    mode: modes.normal,
    // contextual metadata for slides
    metadata: {},
    step: 0
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
        this.update(inc)
        break
      case keys.left:
        e.preventDefault()
        this.update(dec)
        break
      case keys.p:
        if (alt) {
          this.update(toggleMode('presenter'))
        }
        break
      case keys.o:
        if (alt) {
          this.update(toggleMode('overview'))
        }
        break
      case keys.g:
        if (alt) {
          this.update(toggleMode('grid'))
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

  render () {
    const {
      slides,
      theme,
      components: propsComponents,
      Provider: PropsProvider,
      width,
      height,
      headTags
    } = this.props
    const {
      index,
      mode,
      metadata,
    } = this.state

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
      update: this.update
    }

    return (
      <HeadProvider tags={headTags}>
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
                  onSwipedRight={() => this.update(dec)}>
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
                          {...context}
                          index={i}
                          className='Slide'
                          active={i === index}
                          metadata={metadata[i]}>
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
      </HeadProvider>
    )
  }
}

export default SlideDeck
