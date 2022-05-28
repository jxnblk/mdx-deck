import React from 'react'
import { useDeck } from './context'

export const useMouse = () => {
  const context = useDeck()

  React.useEffect(() => {
    const onClick = e => {
      e.preventDefault()
      context.next()
    }
    const onRightClick = e => {
      e.preventDefault()
      if (e.altKey) {
        return
      }
      context.previous()
    }

    document.addEventListener('click', onClick)
    document.addEventListener('contextmenu', onRightClick)

    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('contextmenu', onRightClick)
    }
  }, [context])
}

export default () => {
  useMouse()
  return false
}
