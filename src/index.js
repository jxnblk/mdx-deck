/*
 *  mdx-deck v2 prototype
 *
 *  todo:
 *  - [x] Head
 *  - [x] Image
 *  - [x] Notes
 *  - [x] Appear
 *  - [ ] Code
 *    - [x] notes code fence
 *    - [ ] syntax highlighting
 *  - [x] history api fallback
 *  - [x] mdx components
 *  - [x] themes
 *  - [ ] layouts
 *  - [ ] presenter mode
 *  - [ ] overview mode
 *  - [ ] localStorage
 *  - [ ] keyboard shortcuts
 *
 *  extras
 *  - [ ] Print view
 *  - [ ] PDF export?
 *  - [ ] dots??
 *  - [ ] swipeable
 */

import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Router, globalHistory, navigate, Link } from '@reach/router'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'
import { Swipeable } from 'react-swipeable'
import { default as defaultTheme } from './themes'

const NORMAL = 'NORMAL'
const PRESENTER = 'PRESENTER'
const OVERVIEW = 'OVERVIEW'
const PRINT = 'PRINT'

export const Context = React.createContext(null)

export const withContext = Component => props => (
  <Context.Consumer
    children={context => <Component {...props} context={context} />}
  />
)

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
  props => props.theme.Slide
)

const Slide = ({ children, ...props }) => (
  <Context.Provider value={props}>
    <SlideRoot>{children}</SlideRoot>
  </Context.Provider>
)

const DefaultProvider = props => <>{props.children}</>

// MDX components
const Heading = styled.h1({ margin: 0 })

const inlineCode = styled.code(
  props => ({
    fontFamily: props.theme.monospace,
  }),
  props => props.theme.code
)

const code = styled.pre(
  props => ({
    fontFamily: props.theme.monospace,
    fontSize: '.75em',
  }),
  props => props.theme.pre
)

const img = styled.img({
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'cover',
})

const TableWrap = styled.div({
  overflowX: 'auto',
})
const Table = styled.table({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  '& td, & th': {
    textAlign: 'left',
    paddingRight: '.5em',
    paddingTop: '.25em',
    paddingBottom: '.25em',
    borderBottom: '1px solid',
    verticalAlign: 'top',
  },
})
const table = props => (
  <TableWrap>
    <Table {...props} />
  </TableWrap>
)

const components = {
  pre: props => props.children,
  code,
  inlineCode,
  img,
  table,
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

const ZoomOuter = styled.div(props => ({
  backgroundColor: props.theme.colors.background,
  width: 100 * props.zoom + 'vw',
  height: 100 * props.zoom + 'vh',
}))
const ZoomInner = styled.div(props => ({
  transformOrigin: '0 0',
  transform: `scale(${props.zoom})`,
}))
const Zoom = props => (
  <ZoomOuter zoom={props.zoom}>
    <ZoomInner {...props} />
  </ZoomOuter>
)
Zoom.defaultProps = {
  zoom: 1,
}

const noop = () => {}

const Presenter = props => {
  const { slides, index } = props
  const Current = slides[index]
  const Next = slides[index + 1]
  const { notes } = Current.meta || {}

  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          display: 'flex',
        }}>
        <div
          style={{
            width: 500 / 8 + '%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Zoom zoom={5 / 8}>{props.children}</Zoom>
        </div>
        <div
          style={{
            width: 100 / 4 + '%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Zoom zoom={1 / 4}>
            {Next && (
              <Slide register={noop}>
                <Next />
              </Slide>
            )}
          </Zoom>
          {notes}
        </div>
      </div>
      <div
        style={{
          color: 'white',
          padding: 16,
          fontSize: 20,
        }}>
        <pre style={{ fontFamily: 'Menlo, monospace' }}>
          {index + 1} of {slides.length}
        </pre>
      </div>
    </div>
  )
}

const Overview = props => {
  const { index, slides } = props

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        height: '100vh',
        backgroundColor: 'black',
      }}>
      <div
        style={{
          flex: 'none',
          height: '100vh',
          paddingLeft: 4,
          paddingRight: 4,
          overflowY: 'auto',
          marginRight: 'auto',
        }}>
        {slides.map((Component, i) => (
          <Link
            key={i}
            to={'/' + i}
            style={{
              display: 'block',
              color: 'inherit',
              textDecoration: 'none',
              padding: 0,
              marginTop: 4,
              marginBottom: 4,
              cursor: 'pointer',
              outline: i === index ? '4px solid #0cf' : null,
            }}>
            <Zoom zoom={1 / 6}>
              <Slide register={noop}>
                <Component />
              </Slide>
            </Zoom>
          </Link>
        ))}
      </div>
      <div
        style={{
          width: 200 / 3 + '%',
          margin: 'auto',
        }}>
        <Zoom zoom={2 / 3}>{props.children}</Zoom>
      </div>
    </div>
  )
}

const Root = props => <>{props.children}</>

const themed = (...tags) => props =>
  tags.map(tag => props.theme[tag] && { ['& ' + tag]: props.theme[tag] })

const RootStyles = styled.div(
  props => ({
    fontFamily: props.theme.font,
    color: props.theme.colors.text,
    backgroundColor: props.theme.colors.background,
  }),
  props => props.theme.css,
  themed(
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'ul',
    'ol',
    'li',
    'p',
    'blockquote',
    'img',
    'table'
  )
)

const GoogleFonts = withTheme(
  props =>
    !!props.theme.googleFont && (
      <link href={props.theme.googleFont} rel="stylesheet" />
    )
)

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
    const { slides, mode } = this.state
    const index = this.getIndex()
    const meta = this.getMeta(index)
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

    let Wrapper = Root
    switch (mode) {
      case PRESENTER:
        Wrapper = Presenter
        break
      case OVERVIEW:
        Wrapper = Overview
        break
    }

    return (
      <HeadProvider tags={headTags}>
        <ThemeProvider theme={theme}>
          <MDXProvider components={mdxComponents}>
            <Provider {...this.state} index={index}>
              <Wrapper {...this.state} index={index}>
                <Swipeable
                  onSwipedRight={this.previous}
                  onSwipedLeft={this.next}>
                  <RootStyles>
                    <GoogleFonts />
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
                  </RootStyles>
                </Swipeable>
              </Wrapper>
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
  theme: defaultTheme,
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
    width: props.width,
    height: props.height,
    backgroundImage: `url(${props.src})`,
  })
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

export const Steps = withContext(
  class extends React.Component {
    constructor(props) {
      super(props)
      const { register, index } = props.context
      const { length } = props
      register(index, { steps: length })
    }
    render() {
      const { context, render } = this.props
      const { step } = context
      return render({ step })
    }
  }
)

export const Appear = props => {
  const arr = React.Children.toArray(props.children)
  return (
    <Steps
      length={arr.length}
      render={({ step }) => {
        const children = arr.map((child, i) =>
          i < step
            ? child
            : React.cloneElement(child, {
                style: {
                  ...child.props.style,
                  visibility: 'hidden',
                },
              })
        )
        return <>{children}</>
      }}
    />
  )
}
