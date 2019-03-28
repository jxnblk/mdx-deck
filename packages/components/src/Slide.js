import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Root from './Root'
import { Context } from './context'
import modes from './modes'

const SlideRoot = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  props => props.theme.Slide
)

export const Slide = ({ children, ...props }) => (
  <Context.Provider value={props}>
    <Root>
      <SlideRoot>{children}</SlideRoot>
    </Root>
  </Context.Provider>
)

Slide.propTypes = {
  path: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  mode: PropTypes.oneOf(Object.values(modes)).isRequired,
}

export default Slide
