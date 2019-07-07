import React from 'react'
import styled from '@emotion/styled'
import FluidFontSize from './FluidFontSize'
import useTheme from './useTheme'

const getPadding = ratio =>
  ratio > 1 ? (1 / ratio) * 100 + '%' : ratio * 100 + '%'

const paddingBottom = props => ({
  paddingBottom: getPadding(props.theme.aspectRatio),
})

const Outer = styled('div')(
  {
    width: '100%',
    height: 0,
    margin: 'auto',
    position: 'relative',
  },
  paddingBottom
)

const Inner = styled.div(
  {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  props => props.theme.Slide
)

export default props => {
  const theme = useTheme()
  if (!theme.aspectRatio) {
    return <>{props.children}</>
  }

  return (
    <Outer>
      <FluidFontSize base={10}>
        <Inner>{props.children}</Inner>
      </FluidFontSize>
    </Outer>
  )
}
