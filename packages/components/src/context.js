import React, { useContext } from 'react'

export const Context = React.createContext(null)

export const withContext = Component => props => (
  <Context.Consumer
    children={context => <Component {...props} context={context} />}
  />
)

export const useDeck = () => useContext(Context)
