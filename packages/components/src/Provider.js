import React from 'react'
import { HeadProvider } from './Head'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'
import mdxComponents from './mdx-components'

const DefaultProvider = props => <>{props.children}</>

export const Provider = props => {
  const { headTags, theme, components } = props
  const {
    Provider: UserProvider = DefaultProvider,
    components: themeComponents = {},
  } = theme

  const allComponents = {
    ...mdxComponents,
    ...themeComponents,
  }

  return (
    <HeadProvider tags={headTags}>
      <ThemeProvider theme={theme}>
        <MDXProvider components={allComponents}>
          <UserProvider {...props} />
        </MDXProvider>
      </ThemeProvider>
    </HeadProvider>
  )
}

export default Provider
