import React from 'react'
import styled from '@emotion/styled'
import Root from './Root'
import { Context } from './context'

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

export default Slide
