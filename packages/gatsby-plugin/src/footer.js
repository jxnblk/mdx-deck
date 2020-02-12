/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props =>
  <footer
    {...props}
    sx={{
      position: 'absolute',
      zIndex: 1,
      left: 0,
      bottom: 0,
      right: 0,
      pointerEvents: 'none',
      variant: 'styles.Footer',
    }}
  />
