/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { globalHistory } from '@reach/router'
import useDeck from '../hooks/use-deck'
import Clock from './clock'
import Timer from './timer'

export default props => {
  const context = useDeck()
  const { index, length } = context

  return (
    <React.Fragment>
      <div>
        {index} / {length - 1}
      </div>
      <div
        sx={{
          mx: 4,
        }}>
        <a
          href={globalHistory.location.href}
          rel="noopener noreferrer"
          target="_blank"
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}>
          Open in New Window ↗︎
        </a>
      </div>
      <div sx={{ mx: 'auto' }} />
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          mx: 4,
        }}>
        <Timer />
      </div>
      <div>
        <Clock />
      </div>
    </React.Fragment>
  )
}
