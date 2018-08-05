import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, color } from 'styled-system'
import Flex from './Flex'

const Dot = styled.button([], {
  appearance: 'none',
  border: '4px solid transparent',
  backgroundClip: 'padding-box',
  borderRadius: '9999px',
  width: '8px',
  height: '8px',
  color: 'inherit',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 1px'
  }
},
  props => ({
    opacity: props.active ? 0.5 : 0.125
  }),
  space,
  color
)
Dot.propTypes = {
  ...space.propTypes,
  ...color.propTypes
}
Dot.defaultProps = {
  m: 0,
  p: 1,
  color: 'text',
  bg: 'text',
}

export const Dots = ({
  index,
  length,
  onClick,
  ...props
}) =>
  <Flex {...props}>
    {Array.from({ length }).map((n, i) => (
      <Dot
        key={i}
        active={i <= index}
        title={'go to: ' + i}
        onClick={e => {
          onClick(i)
        }}
      />
    ))}
  </Flex>

Dots.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

export default Dots
