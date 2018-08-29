import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, color } from 'styled-system'
import { Context, withDeck } from './context'

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
  static defaultProps = {
    addNotes: () => {},
    update: () => {},
  }
  render () {
    const {
      index,
      color,
      bg,
      ...props
    } = this.props
    return (
      <Context.Provider value={this.props}>
        <Root
          color={color}
          bg={bg}
          px={[ 4, 5, 6 ]}>
          {props.children}
        </Root>
      </Context.Provider>
    )
  }
}

Slide.propTypes = {
  index: PropTypes.number,
  ...space.propTypes,
  ...color.propTypes
}


export default Slide
