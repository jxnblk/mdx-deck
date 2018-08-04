import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Slide from './Slide'
import Zoom from './Zoom'
import Root from './Root'

export default ({
  slides = [],
  update
}) => (
  <Box bg='black' css={{ minHeight: '100vh' }}>
    <Flex
      css={{
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
      }}>
      {slides.map((Component, i) => (
        <Box key={i}>
          <div role='link'
            href={'#' + i}
            onClick={e => {
              update({
                index: i,
                mode: 'NORMAL'
              })
            }}>
            <Zoom zoom={1/4}>
              <Root width='100vw' height='100vh'>
                <Slide index={i}>
                  <Component />
                </Slide>
              </Root>
            </Zoom>
          </div>
        </Box>
      ))}
    </Flex>
  </Box>
)
