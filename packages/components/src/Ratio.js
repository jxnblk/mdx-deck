import React from 'react'

export const Ratio = ({ ratio, children }) => (
  <div
    css={{
      width: '100%',
      height: 0,
      paddingBottom: ratio * 100 + '%',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {children}
  </div>
)

export default Ratio
