import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import Box from './Box'
import Flex from './Flex'
import Zoom from './Zoom'
import Slide from './Slide'
import Root from './Root'
import Mono from './Mono'

export const Overview = ({
  index,
  length,
  slides = [],
  mode,
  metadata = {},
  update,
  step,
  ...props
}) => {
  const notes = get(metadata, index + '.notes')

  return (
    <Flex
      color='white'
      bg='black'
      css={{
        alignItems: 'flex-start',
        height: '100vh'
      }}>
      <Box
        mr='auto'
        px={2}
        py={3}
        css={{
          flex: 'none',
          height: '100vh',
          overflowY: 'auto'
        }}>
        {slides.map((Component, i) => (
          <Box
            key={i}
            role='link'
            p={1}
            style={{
              outline: i === index ? '1px solid #07c' : null
            }}
            css={{
              cursor: 'pointer'
            }}
            onClick={e => {
              update({ index: i })
            }}>
            <Zoom zoom={1/6}>
              <Root {...props}>
                <Slide>
                  <Component />
                </Slide>
              </Root>
            </Zoom>
          </Box>
        ))}
      </Box>
      <Box mx='auto' py={4} width={2/3}>
        <Zoom zoom={2/3}>
          <Root {...props}>
            {props.children}
          </Root>
        </Zoom>
        <Flex>
          <Box ml='auto' py={2}>
            {index + 1}/{length}
          </Box>
        </Flex>
        <Box mt={3}>
          {notes}
        </Box>
      </Box>
    </Flex>
  )
}

Overview.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  slides: PropTypes.array,
  mode: PropTypes.string,
  notes: PropTypes.object
}

export default Overview
