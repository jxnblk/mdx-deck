import React from 'react'
import { useDeck } from './context'
import modes from './modes'

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

export const useKeyboard = () => {
  const context = useDeck()

  React.useEffect(() => {
    const handleKeyDown = e => {
      if (e.metaKey) return
      if (e.ctrlKey) return

      console.log(e)

      if (e.altKey) {
        switch (e.code) {
          case keys.p:
            if (e.shiftKey) {
              context.toggleMode(modes.print)
            } else {
              context.toggleMode(modes.presenter)
            }
            break
          case keys.o:
            context.toggleMode(modes.overview)
            break
          case keys.g:
            context.toggleMode(modes.grid)
            break
          default:
            break
        }
      } else if (e.shiftKey) {
        switch (e.code) {
          case keys.space:
            e.preventDefault()
            context.previous()
            break
          default:
            break
        }
      } else {
        switch (e.code) {
          case keys.right:
          case keys.down:
          case keys.pageDown:
          case keys.space:
            e.preventDefault()
            context.next()
            break
          case keys.left:
          case keys.up:
          case keys.pageUp:
            e.preventDefault()
            context.previous()
            break
          case keys.esc:
            context.setMode(modes.default)
            break
          default:
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [context])
}

export default () => {
  useKeyboard()
  return false
}
