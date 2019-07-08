import { useEffect } from 'react'
import { globalHistory, navigate } from '@reach/router'
import useDeck from './use-deck'

const keys = {
  right: 39,
  left: 37,
  space: 32,
  p: 80,
  o: 79,
  g: 71,
  pgUp: 33,
  pgDown: 34,
}

const nextSlide = ({ slug, length, index, setState }) => {
  const n = index + 1
  if (n >= length) return
  navigate([slug, n].join('/'))
}

const next = context => {
  const { steps, step, setState } = context
  if (!steps || step >= steps) return nextSlide(context)
  setState({ step: step + 1 })
}

const previousSlide = ({ slug, index, setState }) => {
  const n = index - 1
  if (n < 0) return
  navigate([slug, n].join('/'))
}

const previous = context => {
  const { steps, step, setState } = context
  if (steps && step > 0) {
    return setState({ step: step - 1 })
  }
  previousSlide(context)
}

export const useKeyboard = () => {
  const context = useDeck()

  useEffect(() => {
    const handleKeyDown = e => {
      const { metaKey, ctrlKey, shiftKey, altKey } = e
      if (metaKey || ctrlKey) return
      if (shiftKey) {
        switch (e.keyCode) {
          case keys.space:
            previous(context)
            break
        }
      } else {
        switch (e.keyCode) {
          case keys.right:
          case keys.space:
            next(context)
            break
          case keys.left:
            previous(context)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // }, [ context.slug, context.length, context.index, context.steps, context.step])
  }, [context])
}

export default useKeyboard
