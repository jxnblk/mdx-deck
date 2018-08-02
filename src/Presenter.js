import React from 'react'
import Box from './Box'
import Flex from './Flex'
import Zoom from './Zoom'
import Slide from './Slide'
import Root from './Root'

export const Presenter = ({
  index,
  length,
  slides = [],
  mode,
  ...props
}) => {
  const Next = slides[index + 1]

  return (
    <Box
      color='white' bg='black'
      css={{ height: '100vh' }}
    >
      <Flex>
        <pre>Slide {index} of {length}</pre>
        <Box mx='auto' />
      </Flex>
      <Flex css={{ alignItems: 'center' }}>
        <Box
          mx='auto'
          css={{
            border: '1px solid rgba(128, 128, 128, 0.25)'
          }}>
          <Zoom zoom={5/8}>
            <Root {...props}>
              {props.children}
            </Root>
          </Zoom>
        </Box>
        <Box
          mx='auto'
          css={{
            border: '1px solid rgba(128, 128, 128, 0.25)'
          }}>
          <Zoom zoom={1/4}>
            <Root {...props}>
              {Next && (
                <Slide>
                  <Next />
                </Slide>
              )}
            </Root>
          </Zoom>
        </Box>
      </Flex>
    </Box>
  )
}

export default Presenter
