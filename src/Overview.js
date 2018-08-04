import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'
import Box from './Box'
import Slide from './Slide'
import Zoom from './Zoom'
import Root from './Root'

const Link = styled.a([], {
  display: 'block',
  color: 'inherit',
  textDecoration: 'none'
})

export default ({
  slides = [],
  update
}) => (
  <Flex
    bg='black'
    p={3}
    css={{
      justifyContent: 'flex-start',
      flexWrap: 'wrap'
    }}>
    {slides.map((Component, i) => (
      <Box key={i}
        m={2}
        css={{
          border: '1px solid rgba(128, 128, 128, 0.25)'
        }}>
        <Link href={'#' + i}
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
        </Link>
      </Box>
    ))}
  </Flex>
)
