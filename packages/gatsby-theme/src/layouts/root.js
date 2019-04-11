import React from 'react'
import { Global } from '@emotion/core'

export default props => (
  <>
    <Global
      styles={{
        '*': { boxSizing: 'border-box' },
        body: {
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
        },
      }}
    />
    {props.children}
  </>
)
