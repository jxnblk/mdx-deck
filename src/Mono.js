import React from 'react'
import Box from './Box'

export default props =>
  <Box
    {...props}
    css={{
      fontFamily: 'Menlo, monospace',
      whiteSpace: 'pre-wrap'
    }}
  />
