import React from 'react'
import styled from 'styled-components'

const ZoomRoot = styled.div([], {
  backgroundColor: 'white',
},
  props => ({
    width: (100 * props.zoom) + 'vw',
    height: (100 * props.zoom) + 'vh',
  })
)

const ZoomInner = styled.div([],
  props => ({
    transformOrigin: '0 0',
    transform: `scale(${props.zoom})`
  })
)

const Zoom = ({ zoom, ...props }) =>
  <ZoomRoot zoom={zoom}>
    <ZoomInner zoom={zoom} {...props} />
  </ZoomRoot>

Zoom.defaultProps = {
  zoom: 1
}

export default Zoom
