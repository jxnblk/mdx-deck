import { useSwipeable } from 'react-swipeable'
import useDeck from './use-deck'
import { previous, next } from '../navigate'
import { modes } from '../constants'

const toggleMode = next => state =>
  state.mode === next ? { mode: modes.normal } : { mode: next }

export const useSwipe = () => {
  const context = useDeck()

  const onSwipedLeft = e => {
    next(context)
  }

  const onSwipedRight = e => {
    previous(context)
  }

  const onSwipedUp = e => {
    context.setState({ mode: modes.presenter })
  }

  const onSwipedDown = e => {
    context.setState({ mode: modes.normal })
  }

  const props = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    onSwipedUp,
    onSwipedDown,
  })

  return props
}

export default useSwipe
