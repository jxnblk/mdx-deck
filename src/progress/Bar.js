import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, color } from 'styled-system'
import Flex from '../Flex'

const Segment = styled.button(
  [],
  {
    appearance: 'none',
    border: 0,
    height: '10px',
    color: 'inherit',
    '&:focus': {
      outline: 'none',
    },
  },
  props => ({
    opacity: props.active ? 1 : 0.125,
    width: props.length + '%',
  }),
  space,
  color
)
Segment.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
}
Segment.defaultProps = {
  m: 0,
  p: 1,
  color: 'text',
  bg: 'text',
}

export const Bar = ({ index, length, onClick, ...props }) => (
  <Flex {...props}>
    {Array.from({ length }).map((n, i) => (
      <Segment
        length={length}
        key={i}
        active={i <= index}
        title={'go to: ' + i}
        onClick={e => {
          onClick(i)
        }}
      />
    ))}
  </Flex>
)

Bar.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}

export default Bar
