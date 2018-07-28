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

const Carousel = styled.div([], {
  display: 'flex',
  overflowX: 'auto',
  width: '100vw',
})
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

  root = React.createRef()

  update = fn => this.setState(fn)

  handleScroll = debounce(e => {
    if (this.isProgrammaticScroll) return
    const { scrollLeft } = e.target
    const rect = e.target.getBoundingClientRect()
    const n = Math.round(scrollLeft / rect.width)
    console.log('scroll', e, n)
    this.setState({ index: n })
  }, 1000)

  componentDidMount () {
    this.root.current.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    this.root.current.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate () {
    if (!this.root.current) return
    const { index } = this.state
    const el = this.root.current.querySelector('#slide-' + index)
    if (!el) return
    this.isProgrammaticScroll = true
    el.scrollIntoView({
      behavior: 'smooth'
    })
    setTimeout(() => {
      console.log(this.isProgrammaticScroll)
      this.isProgrammaticScroll = false
    }, 1000)
  }

  render () {
    const { slides } = this.props
    return (
      <div>
        <Carousel innerRef={this.root}>
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
