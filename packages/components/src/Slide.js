import React from 'react'
import styled from '@emotion/styled'
import { Context } from './context'
import FluidFontSize from './FluidFontSize'

const themed = (...tags) => props =>
  tags.map(tag => props.theme[tag] && { ['& ' + tag]: props.theme[tag] })

const themedHeadings = props => ({
  '& h1, & h2, & h3, & h4, & h5, & h6': props.theme.heading,
})

const themedLinks = props => ({
  '& a': {
    color: props.theme.colors.link,
  },
})

// backwards compatibility
const themedQuote = props => ({
  '& blockquote': props.theme.quote,
})

const themedCode = props => ({
  '& code, & pre': {
    fontFamily: props.theme.monospace,
    color: props.theme.colors.code,
    background: props.theme.colors.codeBackground,
  },
})

const getPadding = ratio =>
  ratio > 1 ? (1 - ratio) * 100 + '%' : ratio * 100 + '%'

const Root = styled.div({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const ratio = props =>
  props.theme.aspectRatio
    ? {
        width: '100%',
        height: 0,
        margin: 'auto',
        position: 'relative',
        outline: '2px solid red',
        backgroundColor: 'tomato',
        paddingBottom: getPadding(props.theme.aspectRatio),
      }
    : {
        width: '100vw',
        height: '100vw',
      }

const Outer = styled('div')(ratio)

const innerRatio = props =>
  props.theme.aspectRatio
    ? {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }
    : null

const Inner = styled(FluidFontSize)(
  props => ({
    fontFamily: props.theme.font,
    color: props.theme.colors.text,
    backgroundColor: props.theme.colors.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }),
  innerRatio,
  props => props.theme.css,
  props => props.theme.Slide,
  themedLinks,
  themedHeadings,
  themedCode,
  themedQuote,
  themed(
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'ul',
    'ol',
    'li',
    'p',
    'blockquote',
    'img',
    'table',
    'pre',
    'code'
  )
)

export const Slide = ({ index, context, ...props }) => (
  <Context.Provider
    value={{
      index,
      ...context,
    }}
  >
    <Root>
      <Outer {...props}>
        <Inner {...props} />
      </Outer>
    </Root>
  </Context.Provider>
)

Slide.defaultProps = {
  context: {
    step: Infinity,
  },
}

export default Slide
