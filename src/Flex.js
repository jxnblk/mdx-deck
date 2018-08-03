import styled from 'styled-components'
import { space, width, color } from 'styled-system'

const Flex = styled.div([], {
  display: 'flex',
  justifyContent: 'center',
  '@media print': {
    display: 'none'
  }
}, props => props.css,
  space,
  width,
  color
)

export default Flex
