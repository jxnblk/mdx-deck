import merge from 'lodash.merge'
import aspect from './aspect'

export default theme =>
  merge(theme, aspect(theme), {
    aspectRatio: 4 / 3,
  })
