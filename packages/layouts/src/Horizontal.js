import React from 'react'
import Flex from './Flex'
import Box from './Box'

const Horizontal = ({ children }) => {
  const kids = React.Children.toArray(children)

  return (
    <Flex
      css={{
        alignItems: 'center',
        height: '100%',
      }}
    >
      {kids.map(child => (
        <Box key={child.key} width={1 / kids.length}>
          {child}
        </Box>
      ))}
    </Flex>
  )
}

export default Horizontal
