import React from 'react'
import { createPortal } from 'react-dom'

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

export class Head extends React.Component {
  state = {
    didMount: false,
  }
  rehydrate = () => {
    const children = React.Children.toArray(this.props.children)
    const nodes = [...document.head.querySelectorAll('[data-head]')]
    nodes.forEach(node => {
      node.remove()
    })
    children.forEach(child => {
      if (child.type === 'title') {
        const title = document.head.querySelector('title')
        if (title) title.remove()
      }
      if (child.type === 'meta') {
        const { name } = child.props
        let meta
        if (name) meta = document.head.querySelector(`meta[name="${name}"]`)
        if (meta) meta.remove()
      }
    })
    this.setState({ didMount: true })
  }

  componentDidMount() {
    this.rehydrate()
  }

  render() {
    const children = React.Children.toArray(this.props.children).map(child =>
      React.cloneElement(child, {
        'data-head': true,
      })
    )
    if (!this.state.didMount) {
      return (
        <HeadContext.Consumer
          children={({ push }) => {
            push(children)
            return false
          }}
        />
      )
    }
    return createPortal(children, document.head)
  }
}

export default Head
