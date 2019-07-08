import { useEffect } from 'react'
import { navigate } from '@reach/router'
import useDeck from './use-deck'

const keys = {
  slide: 'mdx-deck-slide',
  step: 'mdx-deck-step',
}

export const useStorage = () => {
  const context = useDeck()

  // listen for storage changes
  useEffect(() => {
    const handleStorageChange = e => {
      const n = parseInt(e.newValue, 10)
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
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // store changes
  useEffect(() => {
    localStorage.setItem(keys.slide, context.index)
    localStorage.setItem(keys.step, context.step)
  }, [context.index, context.step])
}

export default useStorage
