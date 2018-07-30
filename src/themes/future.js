import theme from './base'

const blue = '#0af'

export default {
  ...theme,
  font: '"Avenir Next", system-ui, sans-serif',
  colors: {
    text: '#fff',
    background: '#111',
    blue,
    link: blue,
    pre: blue,
    preBackground: '#000',
    code: blue,
  },
  css: {
    fontSize: '16px',
    '@media screen and (min-width:64em)': {
      fontSize: '32px',
    },
    textAlign: 'center'
  },
  heading: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600
  },
  quote: {
    fontWeight: 600
  }
}
