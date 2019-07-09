import React from 'react'
import useSteps from '../hooks/use-steps'

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

export default Appear
