import React from 'react'
import styled from '@emotion/styled'

const FullCode = styled.div({
  textAlign: 'left',
  '& pre': {
    // needed to override inline styles from syntax highlighting
    margin: '0 !important',
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
  },
})

export default props => <FullCode {...props} />
