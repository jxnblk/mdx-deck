import styled from '@emotion/styled'

export const Image = styled.div(
  {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  props => ({
    backgroundSize: props.size,
    width: props.width,
    height: props.height,
    backgroundImage: `url(${props.src})`,
  })
)

Image.defaultProps = {
  size: 'cover',
  width: '100vw',
  height: '100vh',
}

export default Image
