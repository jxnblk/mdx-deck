/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'

export const Horizontal = ({ ...props }) => {
  const children = React.Children.toArray(props.children)

  return (
    <div
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      }}>
      {children.map((child, i) => (
        <div key={child.key} sx={{ width: 100 / children.length + '%' }}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default Horizontal
