/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Image = ({
  width = '100vw',
  height = '100vh',
  size = 'cover',
  src,
  css,
  ...props
}) => (
  <div
    {...props}
    sx={{
      width,
      height,
      backgroundImage: `url(${src})`,
      backgroundSize: size,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    css={css}
  />
)

export default Image
