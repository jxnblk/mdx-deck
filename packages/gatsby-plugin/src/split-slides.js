import React from 'react'

export default props => {
  const arr = React.Children.toArray(props.children)
  const splits = []
  const slides = []
  slides.head = {
    props: {},
    children: [],
  }
  const notes = {}

  arr.forEach((child, i) => {
    const {
      originalType,
      mdxType,
      parentName,
      children,
      ...childProps
    } = child.props

    // todo: figure out nested decks
    // if (originalType.isMDXComponent) {}

    // get notes
    if (originalType.__mdxDeck_notes || mdxType === 'Notes') {
      notes[splits.length] = children
    } else if (originalType.__mdxDeck_header || mdxType === 'Header') {
      slides.header = children
    } else if (originalType.__mdxDeck_footer || mdxType === 'Footer') {
      slides.footer = children
    // get head content
    } else if (originalType.__mdxDeck_head || mdxType === 'Head') {
      slides.head.children.push(children)
      Object.assign(slides.head.props, childProps)
    }
    if (mdxType === 'hr') {
      splits.push(i)
    }
  })

  let previousSplit = 0
  splits.forEach((split, i) => {
    const children = [...arr.slice(previousSplit, split)]
    if (notes[i]) children.notes = notes[i]
    slides.push(children)
    previousSplit = split + 1
  })
  const last = [...arr.slice(previousSplit)]
  if (notes[slides.length]) last.notes = notes[slides.length]
  slides.push(last)

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
