import React from 'react'
import { useDeck } from './context'
import modes from './modes'

export const useKeyboard = () => {
  const context = useDeck()

  React.useEffect(() => {
    const handleKeyDown = e => {
      if (e.metaKey) return
      if (e.ctrlKey) return

      if (e.altKey) {
        switch (e.key) {
          case 'P':
          case 'p':
            if (e.shiftKey) {
              context.toggleMode(modes.print)
            } else {
              context.toggleMode(modes.presenter)
            }
            break
          case 'O':
          case 'o':
            context.toggleMode(modes.overview)
            break
          case 'G':
          case 'g':
            context.toggleMode(modes.grid)
            break
          default:
            break
        }
      } else if (e.shiftKey) {
        switch (e.key) {
          case ' ':
            e.preventDefault()
            context.previous()
            break
          default:
            break
        }
      } else {
        switch (e.key) {
          case 'ArrowRight':
          case ' ':
            e.preventDefault()
            context.next()
            break
          case 'ArrowLeft':
            e.preventDefault()
            context.previous()
            break
          case 'Escape':
            context.setMode(modes.default)
            break
          default:
            console.log(e.key)
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
