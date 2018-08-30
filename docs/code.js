export const a = `import React from 'react'

const Foo = props =>
  <h1>Bar</h1>

export default Foo`

export const b = `import styled from 'styled-components'
import { space, color } from 'styled-system'

const Box = styled.div([], space, color)

export default Box`

export const surfer = `import { CodeSurfer } from 'mdx-deck-code-surfer'
import codeExample from './code-example'

<CodeSurfer
  title='Check out my code'
  code={codeExample}
  steps={[
    {
      lines: [ 4, 5 ],
      notes: 'This is lines 4 & 5 highlighted'
    },
  ]}
/>
`

export default { a, b, surfer }
