import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { space, width, height, color } from 'styled-system'
import debounce from 'lodash.debounce'
import webfont from '@compositor/webfont'

import defaultTheme from './themes'
import defaultComponents from './components'

export { default as Image } from './Image'
export { default as components } from './components'

// themes
export { default as theme } from './themes'
export * as themes from './themes'

export const inc = state => ({ index: (state.index + 1) % state.length })
export const dec = state => state.index > 0
  ? ({ index: (state.index - 1) % state.length })
  : null

const CarouselRoot = styled.div([], {
  overflowX: 'hidden',
  width: '100%',
  height: '100%',
  '@media print': {
    height: 'auto',
    overflowX: 'visible'
  }
})

const CarouselInner = styled.div([], {
  display: 'flex',
  width: '100%',
  height: '100%',
  transitionProperty: 'transform',
  transitionTimingFunction: 'ease-out',
  transitionDuration: '.3s',
  '@media print': {
    height: 'auto',
    display: 'block'
  }
}, props => ({
  transform: `translateX(${-100 * props.index}%)`
}))

export const Carousel = props =>
  <CarouselRoot>
    <CarouselInner {...props} />
  </CarouselRoot>

export const Slide = styled.div([], {
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  '@media print': {
    width: '100vw',
    height: '100vh',
    pageBreakAfter: 'always',
    pageBreakInside: 'avoid',
    WebkitPrintColorAdjust: 'exact'
  }
}, space, color)

Slide.defaultProps = {
  px: [ 4, 5, 6 ]
}

const Dot = styled.button([], {
  appearance: 'none',
  border: '4px solid transparent',
  backgroundClip: 'padding-box',
  borderRadius: '9999px',
  width: '8px',
  height: '8px',
  color: 'inherit',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 1px'
  }
},
  props => ({
    opacity: props.active ? 0.5 : 0.125
  }),
  space,
  color
)
Dot.defaultProps = {
  m: 0,
  p: 1,
  bg: 'currentcolor',
}

const Box = styled.div([], {
  flex: 'none'
},
  props => props.css,
  space,
  color
)

const Flex = styled.div([], {
  display: 'flex',
  justifyContent: 'center',
  '@media print': {
    display: 'none'
  }
}, props => props.css, space, color)

export const Dots = ({
  index,
  length,
  onClick,
  ...props
}) =>
  <Flex {...props}>
    {Array.from({ length }).map((n, i) => (
      <Dot
        key={i}
        active={i <= index}
        title={'go to: ' + i}
        onClick={e => {
          onClick(i)
        }}
      />
    ))}
  </Flex>

export const Root = styled.div([], {
  '@media print': {
    fontSize: '24px',
    height: 'auto'
  },
},
  props => props.theme.font ? ({
    fontFamily: props.theme.font
  }) : null,
  props => props.theme.css,
  width,
  height,
  color
)
Root.defaultProps = {
  color: 'text',
  bg: 'background'
}

const ZoomRoot = styled.div([], {
  backgroundColor: 'white',
},
  props => ({
    width: (100 * props.zoom) + 'vw',
    height: (100 * props.zoom) + 'vh',
  })
)
const ZoomInner = styled.div([],
  props => ({
    transformOrigin: '0 0',
    transform: `scale(${props.zoom})`
  })
)
const Zoom = ({ zoom, ...props }) =>
  <ZoomRoot zoom={zoom}>
    <ZoomInner zoom={zoom} {...props} />
  </ZoomRoot>
Zoom.defaultProps = {
  zoom: 1
}

export const Presenter = ({
  index,
  length,
  slides = [],
  ...props
}) => {
  const Next = slides[index + 1]

  return (
    <Box
      color='white' bg='black'
      css={{ height: '100vh' }}
    >
      <Flex>
        <pre>Slide {index} of {length}</pre>
        <Box mx='auto' />
      </Flex>
      <Flex>
        <Box
          mx='auto'
          css={{
            border: '1px solid rgba(128, 128, 128, 0.25)'
          }}>
          <Zoom zoom={5/8}>
            <Root {...props}>
              {props.children}
            </Root>
          </Zoom>
        </Box>
        <Box
          mx='auto'
          css={{
            border: '1px solid rgba(128, 128, 128, 0.25)'
          }}>
          <Zoom zoom={1/4}>
            <Root {...props}>
              {Next && (
                <Slide>
                  <Next />
                </Slide>
              )}
            </Root>
          </Zoom>
        </Box>
      </Flex>
    </Box>
  )
}

export const GoogleFonts = withTheme(({ theme }) => {
  const links = [
    webfont.getURL(theme.font || ''),
    webfont.getURL(theme.monospace || '')
  ].filter(Boolean)
  if (!links.length) return false
  return (
    <React.Fragment>
      {links.map((href, i) => (
        <link
          key={i}
          href={href}
          rel='stylesheet'
        />
      ))}
    </React.Fragment>
  )
})

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

    return (
      <ThemeProvider theme={theme}>
        <MDXProvider
          components={{
            ...defaultComponents,
            ...components
          }}>
          <Wrapper
            slides={slides}
            width={width}
            height={height}>
            <GoogleFonts />
            <Carousel index={index}>
              {slides.map((Component, i) => (
                <Slide key={i} id={'slide-' + i}>
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
    )
  }
}

export default SlideDeck
