import React from 'react'
import styled from 'styled-components'
import {
  fontSize,
  space,
  color
} from 'styled-system'

const Heading = styled.h1([], {
  lineHeight: 1.25
},
  fontSize,
  space,
  color
)
Heading.defaultProps = {
  mt: 3,
  mb: 3,
}

const h1 = props =>
  <Heading
    {...props}
    fontSize={[ 4, 5, 6 ]}
  />

const H2 = Heading.withComponent('h2')
const h2 = props =>
  <H2
    {...props}
    fontSize={[ 4, 5, 6 ]}
  />

const a = styled.a([], {}, color)
a.defaultProps = {
  color: 'link'
}

export default {
  h1,
  h2,
  a
}
