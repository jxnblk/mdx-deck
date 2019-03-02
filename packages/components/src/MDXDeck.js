import React from 'react'
import PropTypes from 'prop-types'
import { Router, globalHistory, navigate, Link } from '@reach/router'
import { Swipeable } from 'react-swipeable'
import Provider from './Provider'
import Root from './Root'
import Slide from './Slide'
import { default as defaultTheme } from '@mdx-deck/themes'

const NORMAL = 'NORMAL'
const PRESENTER = 'PRESENTER'
const OVERVIEW = 'OVERVIEW'
const PRINT = 'PRINT'

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

const BaseWrapper = props => <>{props.children}</>

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
    const { slides, mode } = this.state
    const index = this.getIndex()
    const meta = this.getMeta(index)
    const context = {
      ...this.state,
      register: this.register,
    }

    const [FirstSlide] = slides

    let Wrapper = BaseWrapper
    switch (mode) {
      case PRESENTER:
        Wrapper = Presenter
        break
      case OVERVIEW:
        Wrapper = Overview
        break
    }

    return (
      <Provider {...this.props} {...this.state} index={index}>
        <Wrapper {...this.state} index={index}>
          <Swipeable onSwipedRight={this.previous} onSwipedLeft={this.next}>
            <Root>
              {/*<GoogleFonts />*/}
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
            </Root>
          </Swipeable>
        </Wrapper>
      </Provider>
    )
  }
}

MDXDeck.propTypes = {
  slides: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  headTags: PropTypes.array.isRequired,
}

MDXDeck.defaultProps = {
  slides: [],
  theme: defaultTheme,
  headTags: [],
}

export default MDXDeck
