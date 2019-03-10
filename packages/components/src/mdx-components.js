import React from 'react'
import styled from '@emotion/styled'

export const inlineCode = styled.code(
  props => ({
    fontFamily: props.theme.monospace,
  }),
  props => props.theme.code
)

export const code = styled.pre(
  props => ({
    fontFamily: props.theme.monospace,
    fontSize: '.75em',
  }),
  props => props.theme.pre
)

export const img = styled.img({
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'cover',
})

export const TableWrap = styled.div({
  overflowX: 'auto',
})
export const Table = styled.table({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  '& td, & th': {
    textAlign: 'left',
    paddingRight: '.5em',
    paddingTop: '.25em',
    paddingBottom: '.25em',
    borderBottom: '1px solid',
    verticalAlign: 'top',
  },
})

export const table = props => (
  <TableWrap>
    <Table {...props} />
  </TableWrap>
)

export const components = {
  pre: props => props.children,
  code,
  inlineCode,
  img,
  table,
}

export default components
