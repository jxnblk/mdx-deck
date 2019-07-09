export default {
  colors: {
    text: '#000',
    background: '#eee',
    primary: 'blue',
    secondary: 'rebeccapurple',
    muted: 'lightgray',
    highlight: 'hotpink',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: '"Roboto Mono", Menlo, monospace',
    ui: 'system-ui, sans-serif',
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontWeights: {
    body: 500,
    heading: 700,
    bold: 700,
  },
  // variants
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      my: 3,
    },
  },
  styles: {
    Slide: {
      fontFamily: 'body',
      fontSize: [4, 5, 6],
    },
    h1: {
      variant: 'text.heading',
    },
    h2: {
      variant: 'text.heading',
    },
    h3: {
      variant: 'text.heading',
    },
    h4: {
      variant: 'text.heading',
    },
    h5: {
      variant: 'text.heading',
    },
    h6: {
      variant: 'text.heading',
    },
    ul: {
      m: 0,
    },
    ol: {
      m: 0,
    },
    inlineCode: {
      fontFamily: 'monospace',
    },
    code: {
      fontFamily: 'monospace',
    },
    pre: {
      fontFamily: 'monospace',
    },
  },
}
