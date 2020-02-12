import React from 'react'
import { useDeck } from './context'

const keys = {
  slide: 'mdx-deck-slide',
  step: 'mdx-deck-step',
}

export const useStorage = () => {
  const context = useDeck()
  const [focused, setFocused] = React.useState(false)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  const handleStorageChange = e => {
    const n = parseInt(e.newValue, 10)
    if (isNaN(n)) return
    switch (e.key) {
      case keys.slide:
        context.setIndex(n)
        break
      case keys.step:
        context.setStep(n)
        break
    }
  }

  React.useEffect(() => {
    setFocused(document.hasFocus())
  }, [])

  React.useEffect(() => {
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
  React.useEffect(() => {
    if (!focused) return
    localStorage.setItem(keys.slide, context.index)
  }, [focused, context.index])
}

export default () => {
  useStorage()
  return false
}
