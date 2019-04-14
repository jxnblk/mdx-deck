import theme from './base'

const yellow = '#fd0'

export default {
  ...theme,
  font: '"Roboto Condensed", system-ui, sans-serif',
  weights: [400, 700],
  monospace: '"Roboto Mono", monospace',
  googleFont:
    'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto+Mono',
  colors: {
    text: '#000',
    background: yellow,
    link: '#333',
    pre: yellow,
    preBackground: '#000',
    code: yellow,
    codeBackground: '#000',
  },
  heading: {
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  blockquote: {
    fontWeight: 700,
  },
  pre: {
    textAlign: 'left',
  },
}
