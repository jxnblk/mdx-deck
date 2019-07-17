/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Invert = ({ ...props }) => (
  <div
    {...props}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: 'background',
      bg: 'text',
      a: {
        color: 'inherit',
      },
    }}
  />
)

export default Invert
