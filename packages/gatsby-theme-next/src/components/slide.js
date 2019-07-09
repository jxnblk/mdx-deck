/** @jsx jsx */
import { jsx } from 'theme-ui'
import Context from '../context'
import useDeck from '../hooks/use-deck'
import useSwipe from '../hooks/use-swipe'

export const Slide = ({ slide, index, preview, ...props }) => {
  const outer = useDeck()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }

  return (
    <Context.Provider value={context}>
      <div
        {...(!preview ? swipeProps : {})}
        sx={{
          width: '100%',
          height: '100%',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text',
          bg: 'background',
          variant: 'styles.Slide',
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

export default Slide
