import React from 'react'
import Box from 'superbox'

export default ({ children }) =>
  <Box
    p={4}
    bg='magenta'
    css={{
      width: '100vw'
    }}>
    {children}
  </Box>
