import base from './base'

export default {
  ...base,
  font: '"Annie Use Your Telescope", cursive',
  googleFont:
    'https://fonts.googleapis.com/css?family=Annie+Use+Your+Telescope',
  css: {
    fontSize: '1.5em',
    textAlign: 'center',
    '@media screen and (min-width:64em)': {
      fontSize: '4em',
    },
  },
}
