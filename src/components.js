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
  color: 'heading',
  mt: 3,
  mb: 3,
}

const H2 = Heading.withComponent('h2')
const H3 = Heading.withComponent('h3')
const H4 = Heading.withComponent('h4')
const H5 = Heading.withComponent('h5')
const H6 = Heading.withComponent('h6')

const h1 = props =>
  <Heading
    {...props}
    fontSize={[ 3, 4, 5 ]}
  />

const h2 = props =>
  <H2
    {...props}
    fontSize={[ 2, 3, 4 ]}
  />

const h3 = props =>
  <H3
    {...props}
    fontSize={[ 2, 3 ]}
  />

const h4 = props =>
  <H4
    {...props}
    fontSize={[ 2, 3 ]}
  />

const h5 = props =>
  <H5
    {...props}
    fontSize={[ 2, 3 ]}
  />

const h6 = props =>
  <H6
    {...props}
    fontSize={[ 2, 3 ]}
  />

const a = styled.a([], {}, color)
a.defaultProps = {
  target: '_blank',
  color: 'link'
}

const p = styled.p([], {}, fontSize, space, color)

const ul = styled.ul([], {
  textAlign: 'left'
}, fontSize)
ul.defaultProps = {
  fontSize: [ 2, 3 ]
}

const ol = styled.ol([], {
  textAlign: 'left'
}, fontSize)
ol.defaultProps = {
  fontSize: [ 2, 3 ]
}
const li = styled.li([])

const blockquote = styled.blockquote([], {
  textAlign: 'left',
  fontWeight: 'bold',
}, fontSize, space, color)
blockquote.defaultProps = {
  fontSize: [ 3, 4 ],
  px: 0,
  mx: 0,
  color: 'quote'
}

const pre = styled.pre([], props => ({
  fontFamily: props.theme.monospace
}), fontSize, space, color)
pre.defaultProps = {
  fontSize: 2,
  m: 0,
  p: 2,
  color: 'code',
  bg: 'codeBackground'
}

const code = styled.code([], props => ({
  fontFamily: props.theme.monospace
}), fontSize, space, color)
code.defaultProps = {
  color: 'code',
  bg: 'codeBackground'
}

const img = styled.img([], {
  maxWidth: '100%',
  height: 'auto'
})

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  blockquote,
  ul,
  ol,
  li,
  pre,
  code,
  img
}
