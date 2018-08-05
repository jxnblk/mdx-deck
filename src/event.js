import React from 'react'

export const Context = React.createContext(null)
export const { Provider, Consumer } = Context

export const withEvent = Component => props =>
  <Consumer>
    {event => (
      <Component
        {...props}
        event={event}
      />
    )}
  </Consumer>

export default Context
