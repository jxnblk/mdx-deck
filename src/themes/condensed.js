import theme from './base'

const blue = '#0af'

export default {
  ...theme,
  font: '"Roboto Condensed", system-ui, sans-serif',
  monospace: '"Roboto Mono", monospace',
  colors: {
    text: '#fff',
    background: '#000',
    link: blue,
    pre: blue,
    preBackground: '#111',
    code: blue,
  },
  heading: {
    textTransform: 'uppercase',
    fontWeight: 600
  },
  quote: {
    fontWeight: 600
  }
}
