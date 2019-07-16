import React from 'react'
import Decks from '../components/decks'

export default ({ pageContext, ...props }) => {
  const decks = pageContext.decks.map(d => d.node)

  return <Decks {...props} decks={decks} />
}
