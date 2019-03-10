import styled from '@emotion/styled'
import {
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
} from 'styled-system'
import Box from './Box'

export const Flex = styled(Box)(
  {
    display: 'flex',
  },
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection
)

Flex.defaultProps = {
  justifyContent: 'center',
  flexDirection: 'row',
}

export default Flex
