import React from 'react'

export const Context = React.createContext({})

export const useDeck = () => React.useContext(Context)
