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

export const StepList = props => {
  const list = React.Children.toArray(props.children)
    .find(child => /^(ul|ol)$/.test(child.props.originalType))

  // ensure this works
  const items = React.Children.toArray(list && list.props.children)

  const step = useSteps(items.length)

  const children = items.map((item, i) => React.cloneElement(item, {
    style: {
      visibility: i < step ? 'visible' : 'hidden'
    }
  }))

  return React.cloneElement(list, { children })
}

export const Appear = props => {
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

export const Steps = props => {
  const list = React.Children.toArray(props.children)
    .find(child => /^(ul|ol)$/.test(child.props.originalType))

  if (!list) return <Appear {...props} />
  return <StepList {...props} />
}

export const Image = ({
  src,
  width = '100%',
  height = '100%',
  size = 'cover',
  ...props
}) =>
  <div
    {...props}
    sx={{
      width,
      height,
      backgroundSize: size,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  />

export const Horizontal = ({
  ...props
}) => {
  const children = React.Children.toArray(props.children)
  return (
    <div
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      }}>
      {children.map((child, i) => (
        <div
          key={child.key}
          sx={{
            width: 100 / children.length + '%',
            img: {
              height: 'auto',
            }
          }}>
          {child}
        </div>
      ))}
    </div>
  )
}

const Half = props => <div {...props} sx={{
  width: '50%',
  img: {
    height: 'auto',
  }
}} />

export const Split = ({ reverse, ...props }) => {
  const [first, ...rest] = React.Children.toArray(props.children)
  const children = reverse
    ? [ <Half key='rest'>{rest}</Half>, <Half key='first'>{first}</Half> ]
    : [ <Half key='first'>{first}</Half>, <Half key='rest'>{rest}</Half> ]

  return (
    <div
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      }}>
      {children}
    </div>
  )
}

export const SplitRight = props =>
  <Split
    {...props}
    reverse={true}
  />

export const FullScreenCode = ({ ...props }) => (
  <div
    {...props}
    sx={{
      width: '100%',
      height: '100%',
      pre: {
        // hack for prism styles
        margin: '0 !important',
        width: '100%',
        height: '100%',
        overflow: 'auto',
      },
    }}
  />
)
