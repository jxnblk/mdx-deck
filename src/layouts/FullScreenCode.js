import React from 'react'
import styled from 'styled-components'

const FullCode = styled.div([], {
  width: '100vw',
  height: '100vh',
  textAlign: 'left',
  '& pre': {
    // needed to override inline styles from syntax highlighting
    margin: '0 !important',
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
  }
})

export default FullCode
