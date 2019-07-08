/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props => (
  <div
    {...props}
    sx={{
      width: '100vw',
      height: '100vh',
      '*': {
        boxSizing: 'border-box',
      },
    }}
  />
)
