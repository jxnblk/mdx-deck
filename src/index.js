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

/*
 *
 *  todo:
 *  - [x] Head
 *  - [x] Image
 *  - [x] Notes
 *  - [x] Appear
 *  - [ ] Code
 *    - [ ] notes code fence
 *    - [ ] syntax highlighting
 *  - [ ] mdx components
 *  - [ ] themes
 *  - [ ] layouts
 *  - [ ] presenter mode
 *  - [ ] overview mode
 *  - [ ] localStorage
 *  - [ ] keyboard shortcuts
 */

import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Router, globalHistory, navigate } from '@reach/router'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'
import { width, height } from 'styled-system'

const NORMAL = 'NORMAL'
const PRESENTER = 'PRESENTER'
const OVERVIEW = 'OVERVIEW'

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

const DefaultProvider = props => <>{props.children}</>

const components = {
  // h1,
  // h2,
  // h3,
  // h4,
  // h5,
  // h6,
  // a,
  // p,
  // blockquote,
  // ul,
  // ol,
  // li,
  pre: props => props.children,
  // code,
  // inlineCode,
  // img,
  // table,
}

const keys = {
  right: 39,
  left: 37,
  space: 32,
  p: 80,
  o: 79,
}

const toggleMode = key => state => ({
  mode: state.mode === key ? NORMAL : key,
})

export class MDXDeck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slides: props.slides,
      step: 0,
      mode: NORMAL,
    }
  }

  handleKeyDown = e => {
    const { key, keyCode, metaKey, ctrlKey, altKey, shiftKey } = e
    const { activeElement } = document
    if (activeElement.tagName !== 'BODY' && activeElement.tagName !== 'DIV')
      return
    if (metaKey || ctrlKey) return
    const alt = altKey && !shiftKey
    const shift = shiftKey && !altKey

    if (alt) {
      switch (keyCode) {
        case keys.p:
          this.setState(toggleMode(PRESENTER))
          break
        case keys.o:
          this.setState(toggleMode(OVERVIEW))
          break
      }
    } else {
      switch (keyCode) {
        case keys.left:
          e.preventDefault()
          this.previous()
          break
        case keys.right:
        case keys.space:
          e.preventDefault()
          this.next()
          break
      }
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
    const initialMeta = slides[index].meta || {}
    slides[index].meta = { ...initialMeta, ...meta }
    this.setState({ slides })
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { headTags, theme, components } = this.props
    const { slides } = this.state
    const index = this.getIndex()
    const { meta = {} } = slides[index]
    const context = {
      ...this.state,
      register: this.register,
    }
    const {
      Provider = DefaultProvider,
      components: themeComponents = {},
    } = theme

    const [FirstSlide] = slides

    const mdxComponents = {
      ...components,
      ...themeComponents,
    }

    return (
      <HeadProvider tags={headTags}>
        <ThemeProvider theme={theme}>
          <MDXProvider components={mdxComponents}>
            <Provider {...this.state} index={index}>
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
            </Provider>
          </MDXProvider>
        </ThemeProvider>
      </HeadProvider>
    )
  }
}

MDXDeck.propTypes = {
  slides: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  components: PropTypes.object,
  // Provider: PropTypes.func,
  headTags: PropTypes.array.isRequired,
}
MDXDeck.defaultProps = {
  slides: [],
  theme: {},
  headTags: [],
  components,
}

const HeadContext = React.createContext({
  tags: [],
  push: () => {
    console.warn('Missing HeadProvider')
  },
})

const HeadProvider = ({ tags = [], children }) => {
  const push = elements => {
    tags.push(...elements)
  }
  const context = { push }
  return <HeadContext.Provider value={context}>{children}</HeadContext.Provider>
}

export class Head extends React.Component {
  state = {
    didMount: false,
  }
  rehydrate = () => {
    const children = React.Children.toArray(this.props.children)
    const nodes = [...document.head.querySelectorAll('[data-head]')]
    nodes.forEach(node => {
      node.remove()
    })
    children.forEach(child => {
      if (child.type === 'title') {
        const title = document.head.querySelector('title')
        if (title) title.remove()
      }
      if (child.type === 'meta') {
        const { name } = child.props
        let meta
        if (name) meta = document.head.querySelector(`meta[name="${name}"]`)
        if (meta) meta.remove()
      }
    })
    this.setState({ didMount: true })
  }

  componentDidMount() {
    this.rehydrate()
  }

  render() {
    const children = React.Children.toArray(this.props.children).map(child =>
      React.cloneElement(child, {
        'data-head': true,
      })
    )
    if (!this.state.didMount) {
      return (
        <HeadContext.Consumer
          children={({ push }) => {
            push(children)
            return false
          }}
        />
      )
    }
    return createPortal(children, document.head)
  }
}

export const Image = styled.div(
  {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  props => ({
    backgroundSize: props.size,
    backgroundImage: `url(${props.src})`,
  }),
  width,
  height
)

Image.defaultProps = {
  size: 'cover',
  width: '100vw',
  height: '100vh',
}

export const Notes = withContext(
  class extends React.Component {
    constructor(props) {
      super(props)
      const { context, children } = props
      if (!context || typeof context.index === 'undefined') return
      context.register(context.index, { notes: children })
    }

    render() {
      return false
    }
  }
)

export const Appear = withContext(
  class extends React.Component {
    constructor(props) {
      super(props)
      const { register, index } = props.context
      const { length } = props.children
      register(index, { steps: length })
    }
    render() {
      const { step } = this.props.context
      const arr = React.Children.toArray(this.props.children)
      const children = arr.slice(0, step)
      return <>{children}</>
    }
  }
)

// Additional API
// export const Appear
