/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({
  zoom,
  width = '100%',
  height = '100%',
  children,
  ...props
}) =>
  <div
    {...props}
    sx={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      color: 'text',
      bg: 'background',
      variant: 'styles.Slide',
      width,
      height,
      zoom,
    }}>
    {children}
  </div>
