import { useSwipeable } from 'react-swipeable'
import { useDeck } from './context'
import modes from './modes'

const toggleMode = next => state =>
  state.mode === next ? { mode: modes.normal } : { mode: next }

export const useSwipe = () => {
  const context = useDeck()

  const onSwipedLeft = e => {
    context.next()
  }

  const onSwipedRight = e => {
    context.previous()
  }

  const onSwipedUp = e => {
    context.setMode(modes.presenter)
  }

  const onSwipedDown = e => {
    context.setMode(modes.normal)
  }

  const props = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    onSwipedUp,
    onSwipedDown,
  })

  return props
}

export const useSwipeWithCustomContext = ({ context }) => {
  const onSwipedLeft = e => {
    context.next()
  }

  const onSwipedRight = e => {
    context.previous()
  }

  const props = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
  })

  return props
}

export default useSwipe
