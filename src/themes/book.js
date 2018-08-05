import base from './base'

const white = '#fffceb'
const black = '#11111f'
const blue = '#2d5dd7'

export default {
  ...base,
  font: '"Crimson Text", serif',
  colors: {
    text: black,
    background: white,
    link: blue
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
