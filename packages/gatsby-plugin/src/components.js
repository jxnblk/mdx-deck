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

export const Image = props =>
  // TODO
  <div {...props} />

export const Appear = props => {
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
