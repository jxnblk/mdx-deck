import React from 'react'
import { Global } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { MDXDeck } from '@mdx-deck/components'
import Root from './root'
import splitter from '../splitter'

const wrapper = page => props => (
  <MDXDeck {...splitter({ ...page, ...props })} />
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
