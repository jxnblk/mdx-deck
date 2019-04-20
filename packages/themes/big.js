import theme from './base'

const blue = '#0af'

export default {
  ...theme,
  font: '"Bowlby One SC", sans-serif',
  googleFont: 'https://fonts.googleapis.com/css?family=Bowlby+One+SC',
  colors: {
    text: '#dff',
    background: '#011',
    blue,
    link: blue,
    pre: blue,
    preBackground: '#000',
    code: blue,
  },
  heading: {
    fontWeight: 600,
  },
  quote: {
    fontWeight: 600,
  },
}
