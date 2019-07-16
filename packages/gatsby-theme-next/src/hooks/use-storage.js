import { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import useDeck from './use-deck'

const keys = {
  slide: 'mdx-deck-slide',
  step: 'mdx-deck-step',
}

export const useStorage = () => {
  const context = useDeck()
  const [focused, setFocused] = useState(false)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  const handleStorageChange = e => {
    const n = parseInt(e.newValue, 10)
    // if (focused) return
    if (isNaN(n)) return
    switch (e.key) {
      case keys.slide:
        navigate([context.slug, n].join('/'))
        break
      case keys.step:
        context.setState({ step: n })
        break
      default:
        break
    }
  }

  useEffect(() => {
    setFocused(document.hasFocus())
  }, [])

  useEffect(() => {
    if (!focused) window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    return () => {
      if (!focused) window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [focused])

  // store changes
  useEffect(() => {
    if (!focused) return
    localStorage.setItem(keys.slide, context.index)
    localStorage.setItem(keys.step, context.step)
  }, [focused, context.index, context.step])
}

export default useStorage
