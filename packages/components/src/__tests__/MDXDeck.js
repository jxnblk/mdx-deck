import React, { useContext } from 'react'
import { render, cleanup } from 'react-testing-library'
import renderer from 'react-test-renderer'
import { MDXDeckState, MDXDeckContext, MDXDeck } from '../MDXDeck'

afterEach(cleanup)

const slides = [() => <pre>one</pre>, () => <pre>two</pre>]

describe('MDXDeckState', () => {
  test('provides state', () => {
    let context
    const Consumer = props => {
      context = useContext(MDXDeckContext)
      return false
    }
    const deck = renderer.create(
      <MDXDeckState>
        <Consumer />
      </MDXDeckState>
    )
    expect(typeof context.state).toBe('object')
    expect(typeof context.state.metadata).toBe('object')
    expect(context.state.step).toBe(0)
    expect(context.state.mode).toBe('normal')
    expect(typeof context.setState).toBe('function')
  })

  test.todo('setState updates state')
})

test('renders', () => {
  const json = renderer.create(<MDXDeck slides={slides} />).toJSON()
  expect(json).toMatchSnapshot()
})
