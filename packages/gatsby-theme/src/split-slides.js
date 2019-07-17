import React from 'react'

export default props => {
  const arr = React.Children.toArray(props.children)
  const splits = []
  const slides = []
  slides.head = {
    props: {},
    children: [],
  }
  arr.forEach((child, i) => {
    const {
      originalType,
      mdxType,
      parentName,
      children,
      ...childProps
    } = child.props
    if (originalType.mdxDeckHead) {
      slides.head.children.push(children)
      Object.assign(slides.head.props, childProps)
      arr.splice(i, 1)
    }
    if (mdxType === 'hr') splits.push(i)
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
