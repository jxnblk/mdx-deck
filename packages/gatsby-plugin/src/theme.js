// base theme
export default {
  colors: {
    text: '#fff',
    background: '#000',
    backdrop: '#111',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  },
  styles: {
    root: {
      fontFamily: 'system-ui, sans-serif',
    },
    img: {
      width: '100vw',
      maxWidth: '100%',
      height: '100vh',
      objectFit: 'contain',
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
    code: {
      fontFamily: 'monospace',
    },
    pre: {
      fontFamily: 'monospace',
    },
    Slide: {
      fontFamily: 'body',
      fontSize: '2em',
    },
    Header: {
      px: 3,
    },
    Footer: {
      px: 3,
    },
  }
}
