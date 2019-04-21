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

const Scripts = ({ scripts }) => {
  useEffect(() => {
    const tags = scripts
      .map(script =>
        document.head.appendChild(document.createElement('script'))
      )
      .map((tag, i) => {
        tag.src = scripts[i]
        return tag
      })
    return () => {
      tags.forEach(tag => {
        document.head.removeChild(tag)
      })
    }
  }, [])

  return false
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
          heads.reduce((acc, head) => [...acc, ...head.props.children], [])
        )
        const scripts = head
          .filter(child => child.props.mdxType === 'script')
          .map(child => child.props.src)
        console.log('scripts', scripts)
        return createPortal(
          <>
            {head}
            <Scripts scripts={scripts} />
          </>,
          document.head
        )
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
