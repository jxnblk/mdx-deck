import React from 'react'
import webfont from '@compositor/webfont'
import { withTheme } from 'styled-components'

export const GoogleFonts = withTheme(({ theme }) => {
  const links = [
    webfont.getURL(theme.font || '', theme.weights),
    webfont.getURL(theme.monospace || '')
  ].filter(Boolean)
  if (!links.length) return false
  return (
    <React.Fragment>
      {links.map((href, i) => (
        <link
          key={i}
          href={href}
          rel='stylesheet'
        />
      ))}
    </React.Fragment>
  )
})

export default GoogleFonts
