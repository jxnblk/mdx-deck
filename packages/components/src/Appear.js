import React from 'react'
import Steps from './Steps'

export const Appear = props => {
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

export default Appear
