import React from 'react'
import Flex from './Flex'
import Box from './Box'

const Split = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children)
  return (
    <Flex
      css={{
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box width={1 / 2}>{a}</Box>
      <Box width={1 / 2}>{rest}</Box>
    </Flex>
  )
}

export default Split
