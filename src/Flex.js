import styled from 'styled-components'
import { space, color } from 'styled-system'

const Flex = styled.div([], {
  display: 'flex',
  justifyContent: 'center',
  '@media print': {
    display: 'none'
  }
}, props => props.css, space, color)

export default Flex
