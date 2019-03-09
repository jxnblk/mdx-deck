import React from 'react'

export default props => (
  <pre
    {...props}
    style={{
      fontFamily: 'Menlo, monospace',
      fontSize: 18,
      whiteSpace: 'pre-wrap',
      ...props.style,
    }}
  />
)
