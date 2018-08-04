import React from 'react'
import styled from 'styled-components'
import Flex from '../Flex'
import Box from '../Box'

const Root = styled.div([], {
  width: '100vw',
  height: '100vh',
})

const Split = ({ children }) => {
  const [ a, ...rest ] = React.Children.toArray(children.props.children)

  return (
    <Root>
      <Flex
        css={{
          alignItems: 'center',
          height: '100%'
        }}>
        <Box width={1/2}>
          {a}
        </Box>
        <Box width={1/2}>
          {rest}
        </Box>
      </Flex>
    </Root>
  )
}

export default Split
