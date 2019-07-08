/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Zoom = ({
  ratio, // = 16/9,
  zoom = 1,
  ...props
}) => (
  <div
    {...props}
    sx={{
      outline: '1px solid tomato',
      width: '100%',
      position: 'relative',
      height: ratio ? 0 : '100%',
      pb: ratio ? `${(1 / ratio) * 100}%` : 0,
    }}>
    <div
      {...props}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        bg: 'cyan',
        width: `${(1 / zoom) * 100}%`,
        height: `${(1 / zoom) * 100}%`,
        transformOrigin: '0 0',
        transform: `scale(${zoom})`,
      }}
    />
  </div>
)

export default Zoom
