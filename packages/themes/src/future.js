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
  heading: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  quote: {
    fontWeight: 600,
  },
}
