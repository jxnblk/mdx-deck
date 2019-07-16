import merge from 'lodash.merge'

export const convertLegacyTheme = (legacyTheme = {}) => {
  const {
    components,
    colors = {},
    font,
    monospace,
    // UI
    Provider,
    Presenter,
    googleFont,
    // styles
    css,
    heading,
    ...styles
  } = legacyTheme

  const theme = {
    googleFont,
    colors: {
      ...colors,
      primary: colors.link,
      muted: colors.codeBackground,
    },
    fonts: {
      body: font,
      heading: font,
      monospace,
    },
    text: {
      heading,
    },
    styles: merge(
      {
        root: css,
        h1: {
          variant: 'text.heading',
        },
        h2: {
          variant: 'text.heading',
        },
        h3: {
          variant: 'text.heading',
        },
        h4: {
          variant: 'text.heading',
        },
        h5: {
          variant: 'text.heading',
        },
        h6: {
          variant: 'text.heading',
        },
        code: {
          fontFamily: 'monospace',
          color: 'code',
          bg: 'codeBackground',
        },
        pre: {
          fontFamily: 'monospace',
          color: 'code',
          bg: 'codeBackground',
        },
      },
      styles
    ),
  }

  return {
    components,
    theme,
  }
}

export default convertLegacyTheme
