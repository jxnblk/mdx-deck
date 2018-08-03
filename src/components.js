import React from 'react'
import styled from 'styled-components'
import {
  fontSize,
  space,
  color
} from 'styled-system'
import Notes from './Notes'
import Mono from './Mono'

const css = key => props => props.theme[key]

const Heading = styled.h1([], {
  lineHeight: 1.25
},
  fontSize,
  space,
  color,
  css('heading')
)
Heading.defaultProps = {
  color: 'heading',
  mt: 3,
  mb: 3,
}

const h1 = styled(Heading.withComponent('h1'))([], css('h1'))
h1.defaultProps = {
  fontSize: 4
}

const h2 = styled(Heading.withComponent('h2'))([], css('h2'))
h2.defaultProps = {
  fontSize: 3
}

const h3 = styled(Heading.withComponent('h3'))([], css('h3'))
h3.defaultProps = {
  fontSize: 2
}
const h4 = styled(h3.withComponent('h4'))([], css('h4'))
const h5 = styled(h3.withComponent('h5'))([], css('h5'))
const h6 = styled(h3.withComponent('h6'))([], css('h6'))

const a = styled.a([], color, css('link'), css('a'))
a.defaultProps = {
  color: 'link'
}

const p = styled.p([],
  fontSize,
  space,
  color,
  css('paragraph'),
  css('p'),
)
p.defaultProps = {
  fontSize: 2
}

const ul = styled.ul([], {
  textAlign: 'left'
}, fontSize, css('ul'))
ul.defaultProps = {
  fontSize: 2
}

const ol = styled.ol([], {
  textAlign: 'left'
}, fontSize, css('ol'))
ol.defaultProps = {
  fontSize: 2
}
const li = styled.li([], css('li'))

const blockquote = styled.blockquote([], {
  textAlign: 'left',
  fontWeight: 'bold',
},
  fontSize,
  space,
  color,
  css('blockquote'),
  css('quote')
)
blockquote.defaultProps = {
  fontSize: 2,
  px: 0,
  mx: 0,
  color: 'quote'
}

const Pre = styled.pre([], props => ({
  fontFamily: props.theme.monospace,
  whiteSpace: 'pre-wrap'
}),
  fontSize,
  space,
  color,
  css('pre')
)
Pre.defaultProps = {
  fontSize: 1,
  m: 0,
  p: 2,
  color: 'pre',
  bg: 'preBackground'
}

const code = props => {
  switch (props.className) {
    case 'language-notes':
      return (
        <Notes>
          <Mono {...props} color='white' />
        </Notes>
      )
    default:
      return <Pre {...props} />
  }
}

const inlineCode = styled.code([], props => ({
  fontFamily: props.theme.monospace
}), fontSize, space, color, css('code'))
inlineCode.defaultProps = {
  color: 'code',
  bg: 'codeBackground'
}

const img = styled.img([], {
  maxWidth: '100%',
  height: 'auto'
}, css('img'), css('image'))

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
  pre: props => props.children,
  code,
  inlineCode,
  img
}
