import React from 'react'

export default props => {
  const arr = React.Children.toArray(props.children)
  const splits = []
  const slides = []
  slides.head = {
    children: [],
  }
  arr.forEach((child, i) => {
    if (child.props.originalType.mdxDeckHead) {
      slides.head.children.push(child.props.children)
      // todo: html props
      // slides.heads.push(child)
      arr.splice(i, 1)
    }
    if (child.props.mdxType === 'hr') splits.push(i)
  })
  let previousSplit = 0
  splits.forEach(i => {
    const children = [...arr.slice(previousSplit, i)]
    slides.push(children)
    previousSplit = i + 1
  })

  slides.push([...arr.slice(previousSplit)])

  slides.head.children = React.Children.toArray(slides.head.children).map(
    (child, i) => {
      const { originalType, mdxType, parentName, ...childProps } = child.props
      return React.createElement(originalType, {
        key: i,
        ...childProps,
      })
    }
  )

  return slides
}
