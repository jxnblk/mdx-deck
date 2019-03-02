import styled from 'styled-components'

const themed = (...tags) => props =>
  tags.map(tag => props.theme[tag] && { ['& ' + tag]: props.theme[tag] })

export const Root = styled.div(
  props => ({
    fontFamily: props.theme.font,
    color: props.theme.colors.text,
    backgroundColor: props.theme.colors.background,
  }),
  props => props.theme.css,
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
    'table'
  )
)

export default Root
