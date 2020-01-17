/** @jsx jsx */
import { jsx } from 'theme-ui'

const createComponent = key => {
  const Component = () => false
  Component.__mdxDeck = true
  Component[`__mdxDeck_${key}`] = true
  return Component
}

export const Notes = createComponent('notes')
export const Head = createComponent('head')
export const Header = createComponent('header')
export const Footer = createComponent('footer')

export const Color = ({
  color,
  bg,
  ...props
}) =>
  <div
    {...props}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color,
      bg,
      a: {
        color: 'inherit',
      }
    }}
  />

export const Invert = props =>
  <Color
    {...props}
    color='background'
    bg='text'
  />
