import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXDeck, splitSlides } from '@mdx-deck/components'
import Root from './root'

const wrapper = page => props => (
  <MDXDeck
    {...splitSlides({ ...props })}
    basepath={page.pageContext.basepath}
  />
)

export default props => {
  const components = {
    wrapper: wrapper(props),
  }
  return (
    <Root>
      <MDXProvider components={components}>{props.children}</MDXProvider>
    </Root>
  )
}
