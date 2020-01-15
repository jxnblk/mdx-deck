/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props =>
  <div
    sx={{
      boxSizing: 'border-box',
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      variant: 'styles.Slide',
    }}>
    <div>
      {props.children}
    </div>
  </div>
