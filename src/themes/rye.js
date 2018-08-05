import base from './base'

const white = '#ffeec1'

export default {
  ...base,
  font: '"Rye", serif',
  monospace: '"Roboto Mono", monospace',
  colors: {
    text: white,
    background: 'black',
    link: white,
  },
  h1: {
    textTransform: 'uppercase',
  }
}
