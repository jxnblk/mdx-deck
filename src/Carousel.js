import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

CarouselInner.propTypes = {
  index: PropTypes.number.isRequired
}

export const Carousel = props =>
  <CarouselRoot>
    <CarouselInner {...props} />
  </CarouselRoot>

export default Carousel
