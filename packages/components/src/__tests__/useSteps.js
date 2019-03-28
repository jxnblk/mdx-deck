import React, { createContext } from 'react'
import sinon from 'sinon'
import { renderHook, cleanup } from 'react-hooks-testing-library'
import { useStepsFactory } from '../useSteps'

describe('useSteps tests', () => {
  afterEach(cleanup)

  test('should get the default step value from the context', () => {
    const TextContext = createContext({
      step: 0,
      index: 0,
      register: () => {},
    })

    const useSteps = useStepsFactory(TextContext)

    const { result } = renderHook(() => useSteps(2))

    expect(result.current).toBe(0)
  })

  test('should update value in context', () => {
    const data = {
      step: 0,
      index: 0,
      register: () => {},
    }
    const TextContext = createContext(data)

    const wrapper = ({ children }) => (
      <TestContext.Provider value={data}>{children}</TestContext.Provider>
    )

    const useSteps = useStepsFactory(TextContext)

    const { result, rerender } = renderHook(() => useSteps(2))

    expect(result.current).toBe(0)

    data.step = 1

    rerender()

    expect(result.current).toBe(1)
  })

  test('should register itself', () => {
    const data = {
      step: 0,
      index: 0,
      register: sinon.spy(),
    }
    const TextContext = createContext(data)

    const useSteps = useStepsFactory(TextContext)

    const { result, rerender } = renderHook(() => useSteps(2))

    rerender()

    expect(data.register.callCount).toBe(1)
  })
})
