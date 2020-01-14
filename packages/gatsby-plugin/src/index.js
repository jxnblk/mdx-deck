import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import wrapper from './deck'

const components = {
  wrapper,
}

const Page = props =>
  <MDXProvider components={components}>
    {props.children}
  </MDXProvider>

export const wrapPageElement = ({ element, props }) =>
  <Page {...props}>
    {element}
  </Page>

export {
  Notes,
  Head,
  Header,
  Footer,
} from './components'
