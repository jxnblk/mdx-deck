import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ZoomRoot = styled.div([], {
  backgroundColor: 'white',
},
  props => ({
    width: (100 * props.zoom) + 'vw',
    height: (100 * props.zoom) + 'vh',
  })
)

ZoomRoot.propTypes = {
  zoom: PropTypes.number.isRequired
}

const ZoomInner = styled.div([],
  props => ({
    transformOrigin: '0 0',
    transform: `scale(${props.zoom})`
  })
)

ZoomInner.propTypes = {
  zoom: PropTypes.number.isRequired
}

const Zoom = ({ zoom, ...props }) =>
  <ZoomRoot zoom={zoom}>
    <ZoomInner zoom={zoom} {...props} />
  </ZoomRoot>

Zoom.propTypes = {
  zoom: PropTypes.number
}

Zoom.defaultProps = {
  zoom: 1
}

export default Zoom
