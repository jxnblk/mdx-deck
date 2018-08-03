import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  width,
  height,
  color
} from 'styled-system'

export const Root = styled.div([], {
  '@media print': {
    fontSize: '24px',
    height: 'auto'
  },
},
  props => props.theme.font ? ({
    fontFamily: props.theme.font
  }) : null,
  props => props.theme.css,
  width,
  height,
  color
)

Root.propTypes = {
  color: PropTypes.string,
  bg: PropTypes.string
}

Root.defaultProps = {
  color: 'text',
  bg: 'background'
}

export default Root
