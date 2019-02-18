import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import Box from './Box'
import Flex from './Flex'
import Zoom from './Zoom'
import Slide from './Slide'
import Root from './Root'
import Timer from './Timer'
import Mono from './Mono'
import Button from './Button'

const Anchor = Button.withComponent('a')

export const Presenter = ({
  index,
  length,
  slides = [],
  mode,
  metadata = {},
  update,
  step,
  ...props
}) => {
  const Next = slides[index + 1]
  const notes = get(metadata, index + '.notes')

  return (
    <Flex
      color="white"
      bg="black"
      css={{
        flexDirection: 'column',
        height: '100vh'
      }}>
      <Flex my="auto">
        <Box
          mx="auto"
          width={5 / 8}
          css={{
            border: '1px solid rgba(128, 128, 128, 0.25)'
          }}>
          <Zoom zoom={5 / 8}>
            <Root {...props}>{props.children}</Root>
          </Zoom>
        </Box>
        <Flex
          width={1 / 4}
          mx="auto"
          css={{
            flex: 'none',
            flexDirection: 'column'
          }}>
          <Box
            mx="auto"
            css={{
              border: '1px solid rgba(128, 128, 128, 0.25)'
            }}>
            <Zoom zoom={1 / 4}>
              <Root {...props}>
                {Next && (
                  <Slide>
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
            {notes}
          </Box>
        </Flex>
      </Flex>
      <Flex mt="auto" px={3} py={3}>
        <Mono>
          Slide {index + 1} of {length}
        </Mono>
        <Box mx="auto" />
        <Anchor
          target="_blank"
          rel="noopener noreferrer"
          href={`${window.location.origin}/${window.location.hash}`}>
          Open in Normal mode
        </Anchor>
        <Box mx="auto" />
        <Timer />
      </Flex>
    </Flex>
  )
}

Presenter.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  slides: PropTypes.array,
  mode: PropTypes.string,
  metadata: PropTypes.object
}

export default Presenter
