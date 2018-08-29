import {
  toggleMode,
  inc,
  dec,
  previous,
  next,
  incrementIndex,
  decrementIndex,
  incrementStep,
  decrementStep
} from '../src/updaters'

describe('updaters', () => {
  test.skip('toggleMode', () => {})
  test('next', () => {
    const state = next({ index: 0, length: 8 })
    expect(state.index).toBe(1)
  })

  test('next at last slide', () => {
    const state = next({ index: 7, length: 8 })
    expect(state).toBe(null)
  })

  test('previous', () => {
    const state = previous({ index: 2, length: 8 })
    expect(state.index).toBe(1)
  })

  test('previous at first slide', () => {
    const state = previous({ index: 0, length: 8 })
    expect(state).toBe(null)
  })

  describe('with steps', () => {
    test('next at first step', () => {
      const state = next({
        index: 2,
        step: 0,
        length: 8,
        metadata: {
          2: {
            steps: 4
          }
        }
      })
      expect(state.step).toBe(1)
    })

    test('next at last step', () => {
      const state = next({
        index: 2,
        step: 4,
        length: 8,
        metadata: {
          2: {
            steps: 4
          }
        }
      })
      expect(state.index).toBe(3)
      expect(state.step).toBe(0)
    })

    test('previous at first step', () => {
      const state = previous({
        index: 2,
        step: 0,
        length: 8,
        metadata: {
          2: {
            steps: 4
          }
        }
      })
      expect(state.index).toBe(1)
      expect(state.step).toBe(0)
    })

    test('previous at last step', () => {
      const state = previous({
        index: 2,
        step: 3,
        length: 8,
        metadata: {
          2: {
            steps: 4
          }
        }
      })
      expect(state.step).toBe(2)
    })

    test('previous at first step with steps in previous slide', () => {
      const state = previous({
        index: 2,
        step: 0,
        length: 8,
        metadata: {
          1: {
            steps: 3
          },
          2: {
            steps: 4
          }
        }
      })
      expect(state.index).toBe(1)
      expect(state.step).toBe(3)
    })
  })

  describe('shims', () => {
    test('inc', () => {
      const state = inc({ index: 0, length: 8 })
      expect(state.index).toBe(1)
    })

    test('dec', () => {
      const state = dec({ index: 1, length: 8 })
      expect(state.index).toBe(0)
    })

    test('dec 0', () => {
      const state = dec({ index: 0, length: 8 })
      expect(state).toBe(null)
    })
  })
})
