import base from './base'

const green = '#42ff71'

export default {
  ...base,
  font: '"IBM Plex Mono", monospace',
  monospace: '"IBM Plex Mono", monospace',
  colors: {
    text: green,
    background: '#000',
    link: green,
    pre: '#000',
    preBackground: green,
    code: '#000',
    codeBackground: green,
  },
  css: {
    textAlign: 'left',
    fontSize: '16px',
    '@media screen and (min-width:64em)': {
      fontSize: '32px',
    },
    '& .Slide > div': {
      minWidth: '80vw',
      minHeight: '60vh'
    }
  }
}
