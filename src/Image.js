import React from 'react'
import styled from 'styled-components'
import { width, height } from 'styled-system'

const Image = styled.div([], {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
},
  props => ({
    backgroundImage: `url(${props.src})`
  }),
  width,
  height,
  props => props.css
)

Image.defaultProps = {
  width: '100vw',
  height: '100vh',
}

export default Image
