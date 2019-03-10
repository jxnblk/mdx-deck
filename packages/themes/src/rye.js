import base from './base'

const white = '#ffeec1'

export default {
  ...base,
  font: '"Rye", serif',
  monospace: '"Roboto Mono", monospace',
  googleFont: 'https://fonts.googleapis.com/css?family=Rye|Roboto+Mono',
  colors: {
    text: white,
    background: 'black',
    link: white,
  },
  h1: {
    textTransform: 'uppercase',
  },
}
