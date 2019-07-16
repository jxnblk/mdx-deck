const green = '#42ff71'

export default {
  googleFont: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono',
  fonts: {
    body: '"IBM Plex Mono", monospace',
    monospace: '"IBM Plex Mono", monospace',
  },
  colors: {
    text: green,
    background: '#000',
    primary: green,
  },
  styles: {
    root: {
      textAlign: 'left',
      fontSize: ['1.5em', null, '3em'],
    },
    Slide: {
      display: 'block',
      padding: '2em',
      textAlign: 'left',
    },
    pre: {
      color: 'background',
      bg: 'primary',
    },
    code: {
      color: 'background',
      bg: 'primary',
    },
  },
}
