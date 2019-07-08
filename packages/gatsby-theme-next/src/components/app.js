import React, { useReducer } from 'react'
import merge from 'lodash.merge'
import useDeck from '../hooks/use-deck'
import Context from '../context'

const reducer = (state, next) => merge({}, state, next)

export default props => {
  const [state, setState] = useReducer(reducer, {
    mode: 'normal',
    step: 0,
    metadata: {},
  })

  const register = (index, data) => {
    setState({
      metadata: {
        [index]: data,
      },
    })
  }

  const context = {
    ...state,
    setState,
    register,
  }

  return <Context.Provider value={context}>{props.children}</Context.Provider>
}
