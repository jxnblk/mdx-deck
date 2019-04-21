import merge from 'lodash.merge'

export default theme => {
  if (theme && theme.css) {
    // remove responsive styles from built-in themes
    delete theme.css['@media screen and (min-width:56em)']
    delete theme.css['@media screen and (min-width:64em)']
  }

  return merge(theme, {
    aspectRatio: 16 / 9,
    css: {
      fontSize: '1em',
    },
  })
}
