import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, color } from 'styled-system'

const Context = React.createContext(null)

export const withSlide = Component => props =>
  <Context.Consumer>
    {slide => (
      <Component
        {...props}
        slide={slide}
      />
    )}
  </Context.Consumer>

const Root = styled.div([], {
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

class Slide extends React.Component {
  render () {
    const {
      index,
      active,
      update,
      step,
      ...props
    } = this.props
    return (
      <Context.Provider value={{ index, active, update, step }}>
        <Root {...props} />
      </Context.Provider>
    )
  }
}

Slide.propTypes = {
  index: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  ...space.propTypes,
  ...color.propTypes
}

Slide.defaultProps = {
  px: [ 4, 5, 6 ]
}

export default Slide
