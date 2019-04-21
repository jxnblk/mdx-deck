import merge from 'lodash.merge'
import aspect169 from './aspect-16-9'

export default theme => {
  const base = aspect169(theme)
  return merge(base, {
    aspectRatio: 4 / 3,
  })
}
