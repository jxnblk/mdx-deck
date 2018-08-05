import React from 'react'
import PropTypes from 'prop-types'
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
  notes = {},
  update,
  step,
  ...props
}) => {

  return (
    <Flex
      color='white'
      bg='black'
      css={{
        height: '100vh'
      }}
    >
      <Flex
        width={1/4}
        mr='auto'
        css={{
          flex: 'none',
          flexDirection: 'column',
          height: '100vh',
          overflowY: 'auto'
        }}>
        {slides.map((Component, i) => (
          <Box
            key={i}
            role='link'
            p={2}
            onClick={e => {
              update({ index: i })
            }}>
            <Zoom zoom={1/4}>
              <Root {...props}>
                <Slide index={index + 1}>
                  <Component />
                </Slide>
              </Root>
            </Zoom>
          </Box>
        ))}
      </Flex>
      <Box
        m='auto'
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
