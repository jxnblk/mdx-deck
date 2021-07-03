import React from 'react'
import useSteps from '../hooks/use-steps'

export const Appear = props => {
  // Go down one level if there's only one child. This works well
  // with Markdown lists where the <ul> will be inside the <Appear>, eg:
  //
  // <Appear>
  //
  // - Note the blank line before
  // - And after
  //
  // </Appear>
  const immediateChildren = React.Children.toArray(props.children)
  const appearGrandchildren =
    immediateChildren.length === 1 && !props.singleChild
  const children = appearGrandchildren
    ? React.Children.toArray(immediateChildren[0].props.children)
    : immediateChildren
  const step = useSteps(children.length)
  const styled = children.map((child, i) =>
    React.cloneElement(child, {
      style: {
        visibility: i < step ? 'visible' : 'hidden',
      },
    })
  )

  if (appearGrandchildren) {
    return React.cloneElement(immediateChildren[0], {}, ...styled)
  } else {
    return <>{styled}</>
  }
}

export default Appear
