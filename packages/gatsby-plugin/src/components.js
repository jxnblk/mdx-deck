/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { useSteps } from './hooks'

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

export const Appear = props => {
  console.log('Appear', props)
  const children = React.Children.toArray(props.children)
  const step = useSteps(children.length)
  const styled = children.map((child, i) =>
    React.cloneElement(child, {
      style: {
        visibility: i < step ? 'visible' : 'hidden',
      },
    })
  )

  return <>{styled}</>
}

export const Image = ({
  src,
  size = 'cover',
  width = '100%',
  height = '100%',
  ...props
}) =>
  <div
    {...props}
    sx={{
      display: 'flex',
      width,
      height,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${src})`,
      backgroundSize: size,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  />

export const Invert = props =>
  <div
    {...props}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: 'background',
      bg: 'text',
      a: {
        color: 'inherit',
      }
    }}
  />

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

export const Counter = ({ value = 4 }) => {
  console.log('Counter')
  const step = useSteps(value)
  return (
    <pre>
      {step} / {value}
    </pre>
  )
}
