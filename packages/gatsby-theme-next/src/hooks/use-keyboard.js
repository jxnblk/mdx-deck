/* eslint-disable */
import { useEffect } from 'react'
import { navigate } from '@reach/router'
import useDeck from './use-deck'
import { modes } from '../constants'

const keys = {
  right: 39,
  left: 37,
  space: 32,
  p: 80,
  o: 79,
  g: 71,
  esc: 27,
  pageUp: 33,
  pageDown: 34,
}

const nextSlide = ({ slug, length, index, setState }) => {
  const n = index + 1
  if (n >= length) return
  navigate([slug, n].join('/'))
  setState({ step: 0 })
}

const next = context => {
  const { steps, step, setState } = context
  if (!steps || step >= steps) return nextSlide(context)
  setState({ step: step + 1 })
}

const previousSlide = ({ slug, index, metadata, setState }) => {
  const n = index - 1
  if (n < 0) return
  navigate([slug, n].join('/'))
  const { steps = 0 } = metadata[n] || {}
  setState({ step: steps })
}

const previous = context => {
  const { steps, step, setState } = context
  if (steps && step > 0) {
    return setState({ step: step - 1 })
  }
  previousSlide(context)
}

const toggleMode = next => state =>
  state.mode === next
    ? {
        mode: modes.normal,
      }
    : {
        mode: next,
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
          case keys.p:
            context.setState(toggleMode(modes.print))
            break
        }
      } else if (altKey) {
        switch (e.keyCode) {
          case keys.p:
            context.setState(toggleMode(modes.presenter))
            break
          case keys.o:
            context.setState(toggleMode(modes.overview))
            break
          case keys.g:
            context.setState(toggleMode(modes.grid))
            break
        }
      } else {
        switch (e.keyCode) {
          case keys.right:
          case keys.pageDown:
          case keys.space:
            next(context)
            break
          case keys.left:
          case keys.pageUp:
            previous(context)
            break
          case keys.esc:
            context.setState({ mode: modes.normal })
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
