import { modes } from './constants'

export const inc = state => state.index < state.length - 1
  ? ({
    index: (state.index + 1) % state.length,
    step: -1
  })
  : null
export const dec = state => state.index > 0
  ? ({
    index: (state.index - 1) % state.length,
    step: -1
  })
  : null

export const incStep = steps => state => ({
  step: state.step < steps.length - 1 ? state.step + 1 : state.step
})

export const decStep = () => state => ({
  step: state.step >= 0 ? state.step - 1 : -1
})


export const toggleMode = key => state => ({
  mode: state.mode === modes[key] ? modes.normal : modes[key]
})

