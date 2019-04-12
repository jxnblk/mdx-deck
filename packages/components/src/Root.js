import styled from '@emotion/styled'

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

export const Root = styled.div(
  props => ({
    fontFamily: props.theme.font,
    color: props.theme.colors.text,
    backgroundColor: props.theme.colors.background,
    // testing
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }),
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

export default Root
