/** @jsx jsx */
import { jsx } from 'theme-ui'
import splitSlides from '../split-slides'
import Slide from './slide'
import Zoom from './zoom'

const wrapper = ({ slide: i, ratio, zoom, ...props }) => {
  const slides = splitSlides(props)
  const slide = slides[i - 1]

  if (!slide) {
    return <pre>No slide found (slide {i})</pre>
  }

  return (
    <Zoom zoom={zoom} ratio={ratio}>
      <Slide slide={slide} preview />
    </Zoom>
  )
}

const components = {
  wrapper,
}

export const Embed = ({
  src: Deck,
  slide = 1,
  ratio = 16 / 9,
  zoom = 1,
  ...props
}) => (
  <Deck
    {...props}
    components={components}
    slide={slide}
    ratio={ratio}
    zoom={zoom}
  />
)

export default Embed
