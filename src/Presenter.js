import React from 'react'
import Box from './Box'
import Flex from './Flex'
import Zoom from './Zoom'
import Slide from './Slide'
import Root from './Root'
import Timer from './Timer'
import Mono from './Mono'

export const Presenter = ({
  index,
  length,
  slides = [],
  mode,
  ...props
}) => {
  const Next = slides[index + 1]

  return (
    <Flex
      color='white' bg='black'
      css={{
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Flex
        my='auto'
        css={{ alignItems: 'flex-start' }}>
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
      <Flex mt='auto' px={3} py={3}>
        <Mono>Slide {index} of {length}</Mono>
        <Box mx='auto' />
        <Timer />
      </Flex>
    </Flex>
  )
}

export default Presenter
