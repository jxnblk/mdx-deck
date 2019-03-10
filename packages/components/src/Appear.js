import React from 'react'
import useSteps from './useSteps'

export const Appear = props => {
  const arr = React.Children.toArray(props.children)
  const step = useSteps(arr.length)
  const children = arr.map((child, i) =>
    i < step
      ? child
      : React.cloneElement(child, {
          style: {
            ...child.props.style,
            visibility: 'hidden',
          },
        })
  )

  return <>{children}</>
}

export default Appear
