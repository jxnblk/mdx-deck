import React from 'react'
import PropTypes from 'prop-types'
import { Router, globalHistory, navigate } from '@reach/router'
import { Global } from '@emotion/core'
import { Swipeable } from 'react-swipeable'
import querystring from 'querystring'
import Provider from './Provider'
import Slide from './Slide'
import Presenter from './Presenter'
import Overview from './Overview'
import Grid from './Grid'
import Print from './Print'
import GoogleFonts from './GoogleFonts'
import Catch from './Catch'
import Keyboard from './Keyboard'

const NORMAL = 'normal'
const PRESENTER = 'presenter'
const OVERVIEW = 'overview'
const GRID = 'grid'
const PRINT = 'print'
const modes = {
  NORMAL,
  PRESENTER,
  OVERVIEW,
  GRID,
  PRINT,
}

const STORAGE_INDEX = 'mdx-slide'
const STORAGE_STEP = 'mdx-step'

const BaseWrapper = props => <>{props.children}</>

export class MDXDeck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slides: props.slides,
      step: 0,
      mode: NORMAL,
      update: fn => this.setState(fn),
    }
  }

  getIndex = () => {
    const { basepath } = this.props
    const { pathname } = globalHistory.location
    const pagepath = pathname.replace(basepath, '')
    const n = Number(pagepath.split('/')[1])
    const index = isNaN(n) ? 0 : n
    return index
  }

  getMeta = i => {
    const { slides } = this.state
    const { meta = {} } = slides[i] || {}
    return meta
  }

  goto = i => {
    const { basepath } = this.props
    const current = this.getIndex()
    const reverse = i < current
    navigate(basepath + '/' + i)
    const meta = this.getMeta(i)
    this.setState({
      step: reverse ? meta.steps || 0 : 0,
    })
  }

  previous = () => {
    const { step } = this.state
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

  handleStorageChange = e => {
    const { key } = e
    switch (key) {
      case STORAGE_INDEX:
        const index = parseInt(e.newValue, 10)
        this.goto(index)
        break
      case STORAGE_STEP:
        const step = parseInt(e.newValue, 10)
        this.setState({ step })
        break
      default:
        break
    }
  }

  getMode = () => {
    const query = querystring.parse(
      globalHistory.location.search.replace(/^\?/, '')
    )
    this.setState(query)
  }

  componentDidMount() {
    window.addEventListener('storage', this.handleStorageChange)
    this.getMode()
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  }

  componentDidUpdate() {
    const index = this.getIndex()
    const { step, mode } = this.state
    const { pathname, search } = globalHistory.location
    localStorage.setItem(STORAGE_INDEX, index)
    localStorage.setItem(STORAGE_STEP, step)

    if (mode !== NORMAL && mode !== PRINT) {
      const query = '?' + querystring.stringify({ mode })
      if (query === search) return
      navigate(query)
    } else {
      if (!search) return
      navigate(pathname)
    }
  }

  componentDidCatch(err) {
    console.error('componentDidCatch')
    console.error(err)
  }

  render() {
    const { basepath } = this.props
    const { pathname } = globalHistory.location
    const { slides } = this.state
    const pagepath = pathname.replace(basepath, '')
    const mode = pagepath === '/print' ? PRINT : this.state.mode
    const index = this.getIndex()
    const context = {
      ...this.state,
      register: this.register,
      modes,
      previous: this.previous,
      next: this.next,
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
      case GRID:
        Wrapper = Grid
        break
      default:
        break
    }

    const style =
      mode !== modes.PRINT ? (
        <Global
          styles={{
            body: {
              overflow: 'hidden',
            },
          }}
        />
      ) : null

    return (
      <Provider {...this.props} {...this.state} mode={mode} index={index}>
        {style}
        <Catch>
          <Keyboard {...this.props} {...context} />
          <GoogleFonts />
          <Wrapper {...this.props} {...this.state} modes={modes} index={index}>
            <Swipeable onSwipedRight={this.previous} onSwipedLeft={this.next}>
              <Router basepath={basepath}>
                <Slide path="/" index={0} context={context}>
                  <FirstSlide path="/" />
                </Slide>
                {slides.map((Component, i) => (
                  <Slide key={i} path={i + '/*'} index={i} {...context}>
                    <Component path={i + '/*'} />
                  </Slide>
                ))}
                <Print path="print" {...this.props} />
              </Router>
            </Swipeable>
          </Wrapper>
        </Catch>
      </Provider>
    )
  }
}

MDXDeck.propTypes = {
  slides: PropTypes.array.isRequired,
  headTags: PropTypes.array.isRequired,
}

MDXDeck.defaultProps = {
  basepath: '',
  slides: [],
  headTags: [],
}

export default MDXDeck
