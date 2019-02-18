export default {
  font: 'system-ui, sans-serif',
  monospace: 'Menlo, monospace',
  fontSizes: ['0.75em', '1em', '1.5em', '2em', '3em'],
  colors: {
    text: '#000',
    background: 'white',
    link: '#07c',
    pre: '#f0f',
    preBackground: '#333',
    code: '#f0f',
  },
  css: {
    fontSize: '1.5em',
    textAlign: 'center',
    '@media screen and (min-width:64em)': {
      fontSize: '3em',
    },
    'li > ul, li > ol': {
      fontSize: 'inherit',
    },
    'li > p': {
      fontSize: 'inherit',
      margin: 0,
    },
  },
  ol: {
    textAlign: 'left',
  },
  ul: {
    textAlign: 'left',
  },
}
