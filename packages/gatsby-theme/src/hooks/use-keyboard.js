/* eslint-disable */
import { useEffect } from 'react'
import { navigate } from '@reach/router'
import useDeck from './use-deck'
import { modes } from '../constants'
import { previous, next } from '../navigate'

const keys = {
  right: 'ArrowRight',
  left: 'ArrowLeft',
  up: 'ArrowUp',
  down: 'ArrowDown',
  space: 'Space',
  p: 'KeyP',
  o: 'KeyO',
  g: 'KeyG',
  esc: 'Escape',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
}

const toggleMode = next => state =>
  state.mode === next
    ? {
        mode: modes.normal,
      }
    : {
        mode: next,
      }

const inputElements = ['input', 'select', 'textarea', 'a', 'button']

export const useKeyboard = () => {
  const context = useDeck()

  useEffect(() => {
    const handleKeyDown = e => {
      const { metaKey, ctrlKey, shiftKey, altKey } = e
      if (metaKey || ctrlKey) return

      // ignore custom keyboard shortcuts when elements are focused
      const el = document.activeElement.tagName.toLowerCase()
      if (inputElements.includes(el)) return

      if (shiftKey) {
        switch (e.code) {
          case keys.space:
            previous(context)
            break
          case keys.p:
            context.setState(toggleMode(modes.print))
            navigate(`${context.slug}/print`)
            break
        }
      } else if (altKey) {
        switch (e.code) {
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
        switch (e.code) {
          case keys.right:
          case keys.down:
          case keys.pageDown:
          case keys.space:
            next(context)
            break
          case keys.left:
          case keys.up:
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
  }, [context])
}

export default useKeyboard
