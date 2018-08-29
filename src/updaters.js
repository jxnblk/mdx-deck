import get from 'lodash.get'
import { modes } from './constants'

export const previous = state => {
  const steps = get(state, `metadata[${state.index}].steps`, 0)
  if (steps && state.step > 0) {
    return decrementStep(state)
  }
  return decrementIndex(state)
}

export const next = state => {
  const steps = get(state, `metadata[${state.index}].steps`, 0)
  if (steps && state.step < steps) {
    return incrementStep(state)
  }
  return incrementIndex(state)
}

export const decrementIndex = state => state.index > 0
  ? ({
    index: (state.index - 1) % state.length,
    step: get(state, `metadata[${state.index - 1}].steps`, 0)
  })
  : null

export const incrementIndex = state => state.index < state.length - 1
  ? ({
    index: (state.index + 1) % state.length,
    step: 0
  })
  : null

export const decrementStep = state => state.step > 0 ? ({
  step: state.step - 1
}) : null

export const incrementStep = state => state.step < get(state, `metadata[${state.index}].steps`)
  ? ({ step: state.step + 1 })
  : null

export const toggleMode = key => state => ({
  mode: state.mode === modes[key] ? modes.normal : modes[key]
})

export const setMetadata = (i, metadata) => state => ({
  metadata: {
    ...state.metadata,
    [i]: {
      ...(state.metadata[i] || {}),
      ...metadata
    }
  }
})

export const setNotes = (i, notes) => setMetadata(i, { notes })
export const setSteps = (i, steps) => setMetadata(i, { steps })

// shims
export const inc = incrementIndex
export const dec = decrementIndex
