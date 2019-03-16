import React from 'react'
import styled from '@emotion/styled'

const ZoomRoot = styled.div(props => ({
  backgroundColor: props.theme.colors.background,
  width: `calc(${100 * props.zoom}vw)`,
  height: `calc(${100 * props.zoom}vh)`,
}))

const ZoomInner = styled.div([], props => ({
  transformOrigin: '0 0',
  transform: `scale(${props.zoom})`,
}))

export const Zoom = ({ zoom, ...props }) => (
  <ZoomRoot zoom={zoom}>
    <ZoomInner zoom={zoom} {...props} />
  </ZoomRoot>
)

Zoom.defaultProps = {
  zoom: 1,
}

export default Zoom
