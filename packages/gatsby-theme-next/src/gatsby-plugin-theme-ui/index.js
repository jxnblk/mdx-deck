export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'blue',
    secondary: 'rebeccapurple',
    muted: 'lightgray',
    highlight: 'hotpink',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
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
    },
  },
  styles: {
    Slide: {
      fontFamily: 'body',
      color: 'text',
      bg: 'background',
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
  },
}
