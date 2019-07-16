import merge from 'lodash.merge'

export default theme => {
  return merge(theme, {
    aspectRatio: 16 / 9,
    styles: {
      root: {
        fontSize: ['1em', '1em', '1em', '1em'],
      },
    },
  })
}
