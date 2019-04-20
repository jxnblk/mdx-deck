import React from 'react'
import { MDXDeck, splitSlides } from '@mdx-deck/components'
import Root from './root'

const wrapper = props => <MDXDeck {...splitSlides({ ...props })} />

const components = {
  wrapper,
}

export default ({ Component, ...props }) => {
  return (
    <Root>
      <Component {...props} components={components} />
    </Root>
  )
}
