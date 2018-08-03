import styled from 'styled-components'
import { width, space, color } from 'styled-system'

const Box = styled.div([], {
  flex: 'none'
},
  props => props.css,
  width,
  space,
  color
)

export default Box
