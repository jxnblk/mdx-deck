/* v1 API
export { withDeck, withSlide } from './context'
export { Head } from './Head'
export { default as SlideDeck } from './SlideDeck'
export { default as Image } from './Image'
export { default as Notes } from './Notes'
export { default as Appear } from './Appear'
export { default as Code } from './Code'
export { default as components } from './components'

// themes
export { default as theme } from './themes'
export * as themes from './themes'

// internals for third-party components
export * as updaters from './updaters'
export * as constants from './constants'
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Router, globalHistory, navigate } from '@reach/router'
import styled, { ThemeProvider } from 'styled-components'

export const Context = React.createContext(null)

export const withContext = Component => props => (
  <Context.Consumer
    children={context => <Component {...props} context={context} />}
  />
)

const themed = key => props => props.theme[key]

// TODO check against v1 styles
const SlideRoot = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themed('Slide')
)

const Slide = ({ children, ...props }) => (
  <Context.Provider value={props}>
    <SlideRoot>{children}</SlideRoot>
  </Context.Provider>
)

export class MDXDeck extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.slides)

    this.state = {
      slides: props.slides,
      step: 0,
    }
  }

  handleKeyDown = ({ key }) => {
    switch (key) {
      case 'ArrowLeft':
        this.previous()
        break
      case 'ArrowRight':
        this.next()
        break
    }
  }

  getIndex = () => {
    const { pathname } = globalHistory.location
    return Number(pathname.split('/')[1] || 0)
  }

  getMeta = i => {
    const { slides } = this.state
    const { meta = {} } = slides[i] || {}
    return meta
  }

  goto = i => {
    const current = this.getIndex()
    const reverse = i < current
    navigate('/' + i)
    const meta = this.getMeta(i)
    this.setState({
      step: reverse ? meta.steps || 0 : 0,
    })
  }

  previous = () => {
    const { slides, step } = this.state
    const index = this.getIndex()
    const meta = this.getMeta(index)
    if (meta.steps && step > 0) {
      this.setState(state => ({
        step: state.step - 1,
      }))
    } else {
      const previous = index - 1
      if (previous < 0) return
      this.goto(previous)
    }
  }

  next = () => {
    const { slides, step } = this.state
    const index = this.getIndex()
    const meta = this.getMeta(index)
    if (meta.steps && step < meta.steps) {
      this.setState(state => ({
        step: state.step + 1,
      }))
    } else {
      const next = index + 1
      if (next > slides.length - 1) return
      this.goto(next)
    }
  }

  register = (index, meta) => {
    const { slides } = this.state
    slides[index].meta = meta
    this.setState({ slides })
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { slides } = this.state
    const context = {
      ...this.state,
      register: this.register,
    }

    const [FirstSlide] = slides

    return (
      <Router>
        <Slide path="/" index={0} {...context}>
          <FirstSlide path="/" />
        </Slide>
        {slides.map((Component, i) => (
          <Slide key={i} path={i + '/*'} index={i} {...context}>
            <Component path={i + '/*'} />
          </Slide>
        ))}
      </Router>
    )
  }
}

MDXDeck.propTypes = {
  slides: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  components: PropTypes.object,
  Provider: PropTypes.func,
}
MDXDeck.defaultProps = {
  slides: [],
  theme: {},
}

// Additional API
// export const Appear
