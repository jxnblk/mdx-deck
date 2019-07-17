import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

export const getLanguage = className => {
  const match = /language-(\w*)/.exec(className || 'language-javascript')
  let lang = 'javascript'
  if (match && match.length > 1) {
    lang = match[1]
  }
  return lang
}

export const pre = props => props.children

export const code = props => {
  const language = getLanguage(props.className)
  return <SyntaxHighlighter language={language} {...props} />
}

export default {
  components: {
    pre,
    code,
  },
}
