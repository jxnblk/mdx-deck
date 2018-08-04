import React from 'react'
import PropTypes from 'prop-types'
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
  notes = {},
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
      <Flex my='auto'>
        <Box
          mx='auto'
          width={5/8}
          css={{
            border: '1px solid rgba(128, 128, 128, 0.25)'
          }}>
          <Zoom zoom={5/8}>
            <Root {...props}>
              {props.children}
            </Root>
          </Zoom>
        </Box>
        <Flex
          width={1/4}
          mx='auto'
          css={{
            flex: 'none',
            flexDirection: 'column'
          }}>
          <Box
            mx='auto'
            css={{
              border: '1px solid rgba(128, 128, 128, 0.25)'
            }}>
            <Zoom zoom={1/4}>
              <Root {...props}>
                {Next && (
                  <Slide index={index + 1} active={true}>
                    <Next />
                  </Slide>
                )}
              </Root>
            </Zoom>
          </Box>
          <Box
            py={3}
            css={{
              flex: 'auto'
            }}>
            {notes[index]}
          </Box>
        </Flex>
      </Flex>
      <Flex mt='auto' px={3} py={3}>
        <Mono>Slide {index} of {length}</Mono>
        <Box mx='auto' />
        <Timer />
      </Flex>
    </Flex>
  )
}

Presenter.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  slides: PropTypes.array,
  mode: PropTypes.string,
  notes: PropTypes.object
}

export default Presenter
