import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash.get'

const themeable = key => props => ({
  [key]: get(props.theme, key, props[key])
})

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
  '@media print': {
    height: 'auto',
    display: 'block'
  },
  transitionProperty: 'transform',
},
  themeable('transitionTimingFunction'),
  themeable('transitionDuration'),
  props => ({
    transform: `translate3d(${-100 * props.index}%, 0, 0)`
  })
)

CarouselInner.propTypes = {
  index: PropTypes.number.isRequired
}

CarouselInner.defaultProps = {
  transitionTimingFunction: 'ease-out',
  transitionDuration: '.3s',
}

export const Carousel = props =>
  <CarouselRoot>
    <CarouselInner {...props} />
  </CarouselRoot>

export default Carousel
