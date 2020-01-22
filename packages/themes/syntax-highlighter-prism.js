import React from 'react'
import { Prism } from 'react-syntax-highlighter'

import { getLanguage } from './syntax-highlighter'

export const pre = props => props.children

export const code = props => {
  const language = getLanguage(props.className)
  return <Prism language={language} {...props} />
}

export default {
  components: {
    pre,
    code,
  },
}
