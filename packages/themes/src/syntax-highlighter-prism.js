import React from 'react'
import { Prism } from 'react-syntax-highlighter'
import merge from 'lodash.merge'

export const pre = props => props.children

export const createCode = (opts = {}) => props => {
  return <Prism {...opts} language="javascript" {...props} />
}

export default theme =>
  merge(theme, {
    components: {
      pre,
      code: createCode(theme.prism),
    },
  })
