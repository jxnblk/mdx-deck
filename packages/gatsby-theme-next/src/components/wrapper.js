/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props => (
  <div
    {...props}
    sx={{
      width: '100vw',
      height: '100vh',
      variant: 'styles.root',
      '*': {
        boxSizing: 'border-box',
      },
    }}
  />
)
