import React from 'react'
// import { graphql } from 'gatsby'

export default ({ pageContext, ...props }) => {
  const decks = pageContext.decks.map(d => d.node)

  return (
    <div>
      {decks.map(d => (
        <div key={d.id}>{d.slug}</div>
      ))}
    </div>
  )
}
