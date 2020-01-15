import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'theme-ui'
import wrapper from './deck'
import * as mdxComponents from './components'
import theme from './theme'

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

export {
  Notes,
  Head,
  Header,
  Footer,
  Image,
  Appear,
} from './components'
export { useDeck } from './context'
export { useSteps } from './hooks'
