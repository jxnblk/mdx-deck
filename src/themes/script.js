import theme from './base'

const cream = '#fe9'
const black = '#320'

export default {
  ...theme,
  font: '"Yellowtail", cursive',
  monospace: '"Roboto Mono", Menlo, monospace',
  colors: {
    text: black,
    background: cream,
    link: black,
  },
  css: {
    fontSize: '16px',
    textAlign: 'center',
    '@media screen and (min-width:64em)': {
      fontSize: '48px',
    }
  },
}
