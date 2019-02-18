import React from 'react'
import styled from 'styled-components'
import { space, color } from 'styled-system'

const Button = styled.button(
  [],
  {
    appearance: 'none',
    fontFamily: 'inherit',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '4px',
    border: 'none'
  },
  space,
  color
)

Button.propTypes = {
  ...space.propTypes,
  ...color.propTypes
}

Button.defaultProps = {
  m: 0,
  px: 2,
  py: 1,
  color: 'white',
  bg: '#333'
}

export default Button
