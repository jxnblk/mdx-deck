import styled from 'styled-components'
import { space, color } from 'styled-system'

const Box = styled.div([], {
  flex: 'none'
},
  props => props.css,
  space,
  color
)

export default Box
