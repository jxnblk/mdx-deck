import React from 'react'
import { createPortal } from 'react-dom'

const noop = () => {
  console.warn('Missing HeadProvider')
}

export const Context = React.createContext({
  tags: [],
  push: noop
})

export class HeadProvider extends React.Component {
  static defaultProps = {
    tags: []
  }

  push = (elements) => {
    this.props.tags.push(...elements)
  }

  render () {
    const context = {
      ...this.props,
      push: this.push
    }

    return (
      <Context.Provider value={context}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export class Head extends React.Component {
  state = {
    didMount: false
  }

  rehydrate = () => {
    const children = React.Children.toArray(this.props.children)
    const nodes = [
      ...document.head.querySelectorAll('[data-head]')
    ]

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

    this.setState({
      didMount: true
    })
  }

  componentDidMount () {
    this.rehydrate()
  }

  render () {
    const children = React.Children.toArray(this.props.children)
      .map(child => React.cloneElement(child, {
        'data-head': true
      }))

    const { didMount } = this.state

    if (!didMount) {
      return (
        <Context.Consumer
          children={({ push }) => {
            push(children)
            return false
          }}
        />
      )
    }

    return createPortal(
      children,
      document.head
    )
  }
}
