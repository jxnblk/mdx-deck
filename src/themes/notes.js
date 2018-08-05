import base from './base'

export default {
  ...base,
  font: '"Annie Use Your Telescope", cursive',
  css: {
    fontSize: '16px',
    textAlign: 'center',
    '@media screen and (min-width:64em)': {
      fontSize: '40px',
    }
  },
}
