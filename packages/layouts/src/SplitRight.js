import React from 'react'
import Flex from './Flex'
import Box from './Box'

const SplitRight = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children)

  return (
    <Flex
      css={{
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box width={1 / 2}>{rest}</Box>
      <Box width={1 / 2}>{a}</Box>
    </Flex>
  )
}

export default SplitRight
