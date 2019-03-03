import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import merge from 'lodash.merge'

export const pre = props => props.children

export const code = props => (
  <SyntaxHighlighter language="javascript" {...props} />
)

export default {
  components: {
    pre,
    code,
  },
}
