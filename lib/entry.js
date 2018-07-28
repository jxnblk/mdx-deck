import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'
import styled from 'styled-components'
import Box from 'superbox'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'

// todo: dynamic import
import slides from '../docs/index.mdx'

const CarouselRoot = styled.div([], {
  display: 'flex',
  overflowX: 'auto',
  width: '100vw',
  scrollSnapType: 'mandatory',
})

class Carousel extends React.Component {
  root = React.createRef()
  isScroll = false

  handleScroll = debounce(e => {
    if (this.isScroll) {
      this.isScroll = false
      return
    }
    const { scrollLeft } = e.target
    const rect = e.target.getBoundingClientRect()
    const n = Math.round(scrollLeft / rect.width)
    this.props.onScroll(n)
  }, 200)

  scrollTo = (index) => {
    if (!this.root.current) return
    const el = this.root.current.querySelector('#slide-' + index)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidMount () {
    this.root.current.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    this.root.current.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate (prev) {
    if (prev.index === this.props.index) return
    this.isScroll = true
    this.scrollTo(this.props.index)
  }

  render () {
    const { onScroll, index, ...props } = this.props

    return (
      <CarouselRoot
        innerRef={this.root}
        {...props}
      />
    )
  }
}

const Slide = styled.div([], {
  outline: '2px solid tomato',
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100vw',
  height: '90vh'
})

const inc = state => ({ index: (state.index + 1) % state.length })
const dec = state => state.index > 0
  ? ({ index: (state.index - 1) % state.length })
  : null

class App extends React.Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
  }

  state = {
    length: this.props.slides.length,
    index: 0
  }

  update = fn => this.setState(fn)

  render () {
    const { slides } = this.props
    const { index } = this.state

    return (
      <div>
        <Carousel
          index={index}
          onScroll={index => {
            this.setState({ index })
          }}>
          {slides.map((Component, i) => (
            <Slide key={i} id={'slide-' + i}>
              <Component />
            </Slide>
          ))}
        </Carousel>
        <samp>{this.state.index + 1}/{this.state.length}</samp>
        <button onClick={e => this.update(dec)}>previous</button>
        <button onClick={e => this.update(inc)}>next</button>
      </div>
    )
  }
}

render(<App slides={slides} />, window.root)

if (module.hot) module.hot.accept()
