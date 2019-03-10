import React from 'react'
import Steps from './Steps'
import useSteps from './useSteps'

export const _Appear = props => {
  const arr = React.Children.toArray(props.children)
  return (
    <Steps
      length={arr.length}
      render={({ step }) => {
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
      }}
    />
  )
}

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
