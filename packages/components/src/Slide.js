import React from 'react'
import styled from '@emotion/styled'
import { Context } from './context'

const SlideRoot = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  props => props.theme.Slide
)

export const Slide = ({ children, ...props }) => (
  <Context.Provider value={props}>
    <SlideRoot>{children}</SlideRoot>
  </Context.Provider>
)

export default Slide
