import React from 'react'
import styled from 'styled-components'
import Flex from '../Flex'
import Box from '../Box'

const Root = styled.div([], {
  width: '100vw',
  height: '100vh'
})

const Horizontal = ({ children }) => {
  const kids = React.Children.toArray(children.props.children)
  const numberOfChildren = kids.length

  return (
    <Root>
      <Flex
        css={{
          alignItems: 'center',
          height: '100%'
        }}>
        {kids.map(k => (
          <Box key={k.key} width={1 / numberOfChildren}>
            {k}
          </Box>
        ))}
      </Flex>
    </Root>
  )
}

export default Horizontal
