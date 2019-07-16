/** @jsx jsx */
import { jsx } from 'theme-ui'

export const FullScreenCode = ({ ...props }) => (
  <div
    {...props}
    sx={{
      width: '100%',
      height: '100%',
      pre: {
        margin: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
      },
    }}
  />
)

export default FullScreenCode
