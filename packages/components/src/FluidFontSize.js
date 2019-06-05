// prototype for fluid resizable font size
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const FluidFontSize = ({ base = 16, children, className }) => {
  const div = useRef(null)
  const [fontSize, setFontSize] = useState(base)
  const isMountedRed = useRef(false)
  useEffect(function() {
    isMountedRed.current = true
    return function() {
      isMountedRed.current = false
    }
  }, [])
  useLayoutEffect(() => {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.target !== div.current) return
        const { width } = entry.contentRect
        const ratio = width / 320
        const next = Math.floor(ratio * base)
        isMountedRed.current && setFontSize(next)
      })
    })
    observer.observe(div.current)

    return () => observer.unobserve(div.current)
  }, [base])

  return (
    <div ref={div} className={className} style={{ fontSize }}>
      {children}
    </div>
  )
}

export default FluidFontSize
