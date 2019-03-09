import styled from '@emotion/styled'
import { color } from 'styled-system'

const Invert = styled.div(
  {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& a': {
      color: 'inherit',
    },
  },
  color
)

Invert.defaultProps = {
  color: 'background',
  bg: 'text',
}

export default Invert
