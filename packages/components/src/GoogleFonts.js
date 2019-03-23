import React from 'react'
import { withTheme } from 'emotion-theming'
import { Head } from './Head'

const GoogleFonts = withTheme(({ theme }) => {
  if (!theme.googleFont) return false
  return (
    <Head>
      <link rel="stylesheet" href={theme.googleFont} />
    </Head>
  )
})

export default GoogleFonts
