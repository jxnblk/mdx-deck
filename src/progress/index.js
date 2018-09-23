import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import Dots from './Dots'
import Bar from './Bar'

export default withTheme(({ index, length, update, theme }) => {
  switch (theme.progress) {
    case 'none':
      return null

    case 'bar':
      return (
        <Bar
          index={index}
          length={length}
          onClick={index => {
            update({ index })
          }}
        />
      )

    case 'dots':
    default:
      return (
        <Dots
          mx="auto"
          mb={2}
          index={index}
          length={length}
          onClick={index => {
            update({ index })
          }}
        />
      )
  }
})
