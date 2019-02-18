import styled from 'styled-components'
import { width, height, color } from 'styled-system'

export const Root = styled.div(
  [],
  {
    '@media print': {
      fontSize: '24px',
      height: 'auto',
    },
  },
  props =>
    props.theme.font
      ? {
          fontFamily: props.theme.font,
        }
      : null,
  props => props.theme.css,
  width,
  height,
  color
)

Root.propTypes = {
  ...width.propTypes,
  ...height.propTypes,
  ...color.propTypes,
}

Root.defaultProps = {
  color: 'text',
  bg: 'background',
}

export default Root
