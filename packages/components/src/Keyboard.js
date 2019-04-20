import { useEffect } from 'react'
import { globalHistory, navigate } from '@reach/router'

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

const inputElements = ['INPUT', 'TEXTAREA', 'A', 'BUTTON']

const toggleMode = key => state => ({
  mode: state.mode === key ? 'normal' : key,
})

const handleKeyDown = props => e => {
  const { basepath, update, modes } = props
  const { keyCode, metaKey, ctrlKey, altKey, shiftKey } = e
  const { activeElement } = document

  if (inputElements.includes(activeElement.tagName)) {
    return
  }
  if (metaKey || ctrlKey) return
  const alt = altKey && !shiftKey

  const { pathname } = globalHistory.location
  if (keyCode === keys.p && shiftKey && altKey) {
    navigate(basepath + '/print')
    update({ mode: modes.PRINT })
  }
  if (pathname === '/print') return

  if (alt) {
    switch (keyCode) {
      case keys.p:
        update(toggleMode(modes.PRESENTER))
        break
      case keys.o:
        update(toggleMode(modes.OVERVIEW))
        break
      case keys.g:
        update(toggleMode(modes.GRID))
        break
      default:
        break
    }
  } else {
    switch (keyCode) {
      case keys.pgUp:
      case keys.left:
        e.preventDefault()
        props.previous()
        break
      case keys.pgDown:
      case keys.right:
      case keys.space:
        e.preventDefault()
        props.next()
        break
      default:
        break
    }
  }
}

export default props => {
  useEffect(() => {
    const handler = handleKeyDown(props)
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [props.metadata])
  return false
}
