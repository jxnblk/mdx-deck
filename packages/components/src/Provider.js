import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { HeadProvider, UserHead } from './Head'
import { MDXProvider } from '@mdx-js/react'
import mdxComponents from './mdx-components'

const DefaultProvider = props => <>{props.children}</>

export const Provider = props => {
  const { headTags, theme, mdx } = props
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
      <UserHead mdx={mdx} />
      <ThemeProvider theme={theme}>
        <MDXProvider components={allComponents}>
          <UserProvider {...props} />
        </MDXProvider>
      </ThemeProvider>
    </HeadProvider>
  )
}

export default Provider
