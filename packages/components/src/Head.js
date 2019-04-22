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

// get head for all slides
export const UserHead = ({ mdx }) =>
  !!mdx &&
  React.createElement(mdx, {
    components: {
      wrapper: props => {
        if (!didMount) return false
        const heads = React.Children.toArray(props.children).filter(
          child => child.props.originalType === Head
        )
        const head = React.Children.toArray(
          heads.reduce(
            (acc, head) => [
              ...acc,
              ...React.Children.toArray(head.props.children),
            ],
            []
          )
        )
        return createPortal(head, document.head)
      },
    },
  })

export const Head = props => {
  const { push } = useContext(HeadContext)
  const children = React.Children.toArray(props.children)

  useEffect(() => {
    didMount = true
  }, [])
  if (!didMount) {
    push(children)
    return false
  }
  if (!props.portal) return false
  return createPortal(children, document.head)
}

export default Head
