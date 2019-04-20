import React from 'react'
import { Global } from '@emotion/core'

export default ({ mode, modes }) => {
  if (mode === modes.PRINT) return false
  return (
    <Global
      styles={{
        body: {
          overflow: 'hidden',
        },
      }}
    />
  )
}
