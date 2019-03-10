import React from 'react'
import { createPortal } from 'react-dom'
import { withTheme } from 'emotion-theming'

const GoogleFonts = withTheme(({ theme }) => {
  if (!theme.googleFont) return false
  return createPortal(
    <link rel="stylesheet" href={theme.googleFont} />,
    document.head
  )
})

export default GoogleFonts
