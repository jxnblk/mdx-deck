/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Image = ({
  width = '100%',
  height = '100%',
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
