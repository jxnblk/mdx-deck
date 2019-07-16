// utilities for navigation
import { navigate } from '@reach/router'

const nextSlide = ({ slug, length, index, setState }) => {
  const n = index + 1
  if (n >= length) return
  navigate([slug, n].join('/'))
  setState({ step: 0 })
}

export const next = context => {
  const { steps, step, setState } = context
  if (!steps || step >= steps) return nextSlide(context)
  setState({ step: step + 1 })
}

const previousSlide = ({ slug, index, metadata, setState }) => {
  const n = index - 1
  if (n < 0) return
  navigate([slug, n].join('/'))
  const { steps = 0 } = metadata[n] || {}
  setState({ step: steps })
}

export const previous = context => {
  const { steps, step, setState } = context
  if (steps && step > 0) {
    return setState({ step: step - 1 })
  }
  previousSlide(context)
}
