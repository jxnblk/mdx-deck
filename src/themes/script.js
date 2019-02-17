import theme from './base'

const cream = '#fe9'
const black = '#320'

export default {
  ...theme,
  font: '"Yellowtail", cursive',
  monospace: '"Roboto Mono", Menlo, monospace',
  googleFont: 'https://fonts.googleapis.com/css?family=Yellowtail|Roboto+Mono',
  colors: {
    text: black,
    background: cream,
    link: black,
  },
  css: {
    fontSize: '1.5em',
    textAlign: 'center',
    '@media screen and (min-width:64em)': {
      fontSize: '4em',
    },
  },
}
