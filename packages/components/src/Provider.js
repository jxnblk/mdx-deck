import React from 'react'
import { globalHistory } from '@reach/router'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import merge from 'lodash.merge'
import { HeadProvider } from './Head'
import { MDXProvider } from '@mdx-js/tag'
import defaultTheme from '@mdx-deck/themes'
import mdxComponents from './mdx-components'

const DefaultProvider = props => <>{props.children}</>

const mergeThemes = themes =>
  themes.reduce(
    (acc, theme) =>
      typeof theme === 'function' ? theme(acc) : merge(acc, theme),
    {}
  )

export const Provider = props => {
  const { headTags, theme: baseTheme, themes = [] } = props
  const theme = mergeThemes([defaultTheme, baseTheme, ...themes])
  const {
    Provider: UserProvider = DefaultProvider,
    components: themeComponents = {},
  } = theme

  const allComponents = {
    ...mdxComponents,
    ...themeComponents,
  }
  const style =
    props.mode !== 'print' ? (
      <Global
        styles={{
          body: {
            overflow: 'hidden',
          },
        }}
      />
    ) : null

  return (
    <HeadProvider tags={headTags}>
      {style}
      <ThemeProvider theme={theme}>
        <MDXProvider components={allComponents}>
          <UserProvider {...props} />
        </MDXProvider>
      </ThemeProvider>
    </HeadProvider>
  )
}

export default Provider
