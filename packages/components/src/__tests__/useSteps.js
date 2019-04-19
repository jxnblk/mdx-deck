import { createContext } from 'react'
import sinon from 'sinon'
import { renderHook, cleanup } from 'react-hooks-testing-library'
import { useStepsFactory } from '../useSteps'

describe('useSteps tests', () => {
  afterEach(cleanup)

  test('should get the default step value from the context', () => {
    const TestContext = createContext({
      step: 0,
      index: 0,
      register: () => {},
    })

    const useSteps = useStepsFactory(TestContext)

    const { result } = renderHook(() => useSteps(2))

    expect(result.current).toBe(0)
  })

  test('should update value in context', () => {
    const data = {
      step: 0,
      index: 0,
      register: () => {},
    }
    const TestContext = createContext(data)

    const useSteps = useStepsFactory(TestContext)

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
    const TestContext = createContext(data)

    const useSteps = useStepsFactory(TestContext)

    const { rerender } = renderHook(() => useSteps(2))

    rerender()

    expect(data.register.callCount).toBe(1)
  })
})
