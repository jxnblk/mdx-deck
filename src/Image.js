import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { width, height } from 'styled-system'

const Image = styled.div([], {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
},
  props => ({
    backgroundSize: props.size || 'cover',
    backgroundImage: `url(${props.src})`
  }),
  width,
  height,
  props => props.css
)

Image.propTypes = {
  ...width.propTypes,
  ...height.propTypes
}

Image.defaultProps = {
  width: '100vw',
  height: '100vh',
}

export default Image
