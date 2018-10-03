import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space, width, color } from 'styled-system'

const Flex = styled.div([], {
  display: 'flex',
  justifyContent: 'center'
}, props => props.css,
  space,
  width,
  color
)

Flex.propTypes = {
  css: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  ...space.propTypes,
  ...width.propTypes,
  ...color.propTypes
}

export default Flex
