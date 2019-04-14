import React, { useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'

let didMount = false

export const HeadContext = React.createContext({
  tags: [],
  push: () => {
    console.warn('Missing HeadProvider')
  },
})

export const HeadProvider = ({ tags = [], children }) => {
  const push = elements => {
    tags.push(...elements)
  }
  const context = { push }
  return <HeadContext.Provider value={context}>{children}</HeadContext.Provider>
}

export const Head = props => {
  const { push } = useContext(HeadContext)
  const children = React.Children.toArray(props.children)

  useEffect(() => {
    didMount = true
  }, [])
  if (!didMount) {
    push(children)
  }
  return createPortal(children, document.head)
}

export default Head
