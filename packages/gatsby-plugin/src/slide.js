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
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      variant: 'styles.Slide',
      width,
      height,
      zoom,
    }}>
    <div>
      {children}
    </div>
  </div>
