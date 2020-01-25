import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import wrapper from './deck'
import * as mdxComponents from './components'

const components = {
  wrapper,
  ...mdxComponents,
}

const Page = props =>
  <MDXProvider components={components}>
    {props.children}
  </MDXProvider>

export const wrapPageElement = ({ element, props }) =>
  <Page {...props}>
    {element}
  </Page>

export { useDeck } from './context'
export { useSteps } from './use-steps'
export * from './components'
