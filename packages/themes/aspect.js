import merge from 'lodash.merge'

export default theme => {
  if (theme && theme.css) {
    // remove responsive styles from built-in themes
    delete theme.css['@media screen and (min-width:56em)']
    delete theme.css['@media screen and (min-width:64em)']
  }

  return merge(theme, {
    aspectRatio: 9 / 16,
    css: {
      fontSize: '1em',
      '@media screen and (min-width:56em)': {
        fontSize: 'inherit',
      },
      '@media screen and (min-width:64em)': {
        fontSize: 'inherit',
      },
      '@media print': {
        fontSize: 'inherit',
      },
    },
  })
}
