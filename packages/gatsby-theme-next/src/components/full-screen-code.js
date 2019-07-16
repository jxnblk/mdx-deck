/** @jsx jsx */
import { jsx } from 'theme-ui'

export const FullScreenCode = ({ ...props }) => (
  <div
    {...props}
    sx={{
      width: '100%',
      height: '100%',
      pre: {
        // hack for prism styles
        margin: '0 !important',
        width: '100%',
        height: '100%',
        overflow: 'auto',
      },
    }}
  />
)

export default FullScreenCode
