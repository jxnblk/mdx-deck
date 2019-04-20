import { useEffect, useState } from 'react'

const STORAGE_INDEX = 'mdx-slide'
const STORAGE_STEP = 'mdx-step'

export const useLocalStorage = (handler, args = []) => {
  const [focused, setFocused] = useState(false)
  const handleFocus = () => {
    setFocused(true)
  }
  const handleBlur = () => {
    setFocused(false)
  }
  useEffect(() => {
    setFocused(document.hasFocus())
    if (!focused) window.addEventListener('storage', handler)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    return () => {
      if (!focused) window.removeEventListener('storage', handler)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [focused, ...args])
}

export const useSetStorage = (key, value) => {
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])
}

const handleStorageChange = ({ goto, update }) => e => {
  const { key } = e
  switch (key) {
    case STORAGE_INDEX:
      const index = parseInt(e.newValue, 10)
      goto(index)
      break
    case STORAGE_STEP:
      const step = parseInt(e.newValue, 10)
      update({ step })
      break
    default:
      break
  }
}

export default ({ goto, update, index, step }) => {
  const handler = handleStorageChange({ goto, update })
  useLocalStorage(handler)
  useSetStorage(STORAGE_INDEX, index)
  useSetStorage(STORAGE_STEP, step)

  return false
}
