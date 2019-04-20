import React from 'react'
import { globalHistory } from '@reach/router'
import { Global } from '@emotion/core'

const isPrintPath = () => {
  const { pathname } = globalHistory.location
  const parts = pathname.split('/')
  const path = parts[parts.length - 1]
  return path === 'print'
}

export default ({ mode, modes }) => {
  if (mode === modes.PRINT) return false
  if (isPrintPath()) return false
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
