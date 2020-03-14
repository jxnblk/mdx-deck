import React from 'react'

const getItems = children => {
  const items = []

  React.Children.toArray(children)
    .forEach((child, i) => {
      const {
        mdxType,
      } = child.props
      if (mdxType === 'ul') {
        items.push(
          ...getItems(child.props.children)
        )
      } else {
        items.push(child)
      }
    })

  return items
}

export default props => {
  const children = React.Children.toArray(props.children)
  const slides = []

  slides.head = {
    props: {},
    children: [],
  }

  children.forEach((child, i) => {
    const {
      originalType,
      mdxType,
      ...childProps
    } = child.props
    console.log({ mdxType, originalType })
    if (mdxType === 'ul') {
      const items = getItems(childProps.children)
      slides.push(...items)
      console.log({ items, slides })
    } else {
      console.log({ mdxType, childProps })
    }
  })

  return slides
}
