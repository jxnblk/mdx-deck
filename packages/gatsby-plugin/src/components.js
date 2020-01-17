/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import useSteps from './use-steps'

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

export const Counter = ({ length = 4 }) => {
  const step = useSteps(length)

  return (
    <pre>
      {step} / {length}
    </pre>
  )
}

export const StepList = props => {
  const list = React.Children.toArray(props.children)
    .find(child => /^(ul|ol)$/.test(child.props.originalType))

  // if (!list) return <div>{props.children}</div>

  const items = React.Children.toArray(list && list.props.children)

  const step = useSteps(items.length)

  if (!list) return false

  const children = items.map((item, i) => React.cloneElement(item, {
    style: {
      visibility: i < step ? 'visible' : 'hidden'
    }
  }))

  return React.cloneElement(list, { children })
}

export const Appear = ({
  target,
  ...props
}) => {
  const children = React.Children.toArray(props.children)
  const step = useSteps(children.length)
  const styled = children.map((child, i) =>
    React.cloneElement(child, {
      style: {
        visibility: i < step ? 'visible' : 'hidden',
      }
    })
  )
  return <React.Fragment>{styled}</React.Fragment>
}
