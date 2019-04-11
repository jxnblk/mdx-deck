import React from 'react'
import { Global } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { MDXDeck } from '@mdx-deck/components'

const wrapper = page => props => {
  const { theme, themes } = props
  const arr = React.Children.toArray(props.children)
  const splits = []
  const slides = []

  arr.forEach((child, i) => {
    if (child.props.mdxType === 'hr') splits.push(i)
  })

  let previousSplit = 0
  splits.forEach(i => {
    const children = [...arr.slice(previousSplit, i)]
    slides.push(() => children)
    previousSplit = i + 1
  })
  slides.push(() => [...arr.slice(previousSplit)])

  return (
    <MDXDeck
      basepath="/decks/hello"
      slides={slides}
      theme={theme}
      themes={themes}
    />
  )
}

export default props => {
  const components = {
    wrapper: wrapper(props),
  }
  return (
    <MDXProvider components={components}>
      <Global
        styles={{
          '*': { boxSizing: 'border-box' },
          body: {
            margin: 0,
            fontFamily: 'system-ui, sans-serif',
          },
        }}
      />
      {props.children}
    </MDXProvider>
  )
}
