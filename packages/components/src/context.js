// slide context
import React, { useContext } from 'react'

export const Context = React.createContext({})

export const useDeck = () => useContext(Context)

export const withContext = Component => props => {
  const context = useDeck()
  return <Component {...props} context={context} />
}
