import React from 'react'
import styled from '@emotion/styled'
import Root from './Root'
import { Context } from './context'

const SlideRoot = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  props => props.theme.Slide
)

export const Slide = ({ children, style, ...props }) => (
  <Context.Provider value={props}>
    <Root style={style}>
      <SlideRoot>{children}</SlideRoot>
    </Root>
  </Context.Provider>
)

export default Slide
