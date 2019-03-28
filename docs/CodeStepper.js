import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { css } from '@emotion/core'

import { useSteps } from '@mdx-deck/components'

const CodeStepper = ({ code, steps, title = '', language = '' }) => {
  const step = useSteps(steps.length - 1)
  const current = steps[step]

  return (
    <>
      <span
        css={css`
          font-size: 2rem;
          color: #bbbbbb;
        `}
      >
        {title}
      </span>
      <SyntaxHighlighter
        style={codeStyle}
        language={language}
        wrapLines
        lineProps={currentLine => ({
          style: {
            opacity: `${current.indexOf(currentLine) >= 0 ? 1 : 0.3}`,
          },
        })}
      >
        {code}
      </SyntaxHighlighter>
    </>
  )
}

export default CodeStepper
