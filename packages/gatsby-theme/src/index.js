import React from 'react'
import { MDXDeckState } from '@mdx-deck/components'

export const wrapPageElement = ({ props, element }) => (
  <MDXDeckState key={props.pageContext.basepath}>{element}</MDXDeckState>
)
