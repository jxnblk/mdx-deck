import React from 'react'
import { AutoIncrement } from '@mdx-deck/components'
import merge from 'lodash.merge'

const DefaultProvider = props => <>{props.children}</>

const Provider = ({ Outer, delay, ...props }) => (
  <>
    <pre
      css={{
        position: 'fixed',
        top: 0,
        right: 0,
      }}
    >
      AutoIncrement
    </pre>
    <AutoIncrement delay={delay} />
    <Outer {...props} />
  </>
)

Provider.defaultProps = {
  delay: 3000,
  Outer: DefaultProvider,
}

export default theme => {
  if (theme.Provider) {
    Provider.defaultProps.Outer = theme.Provider
  }
  if (theme.autoIncrement) {
    Provider.defaultProps.delay = theme.autoIncrement
  }
  return merge(theme, {
    Provider,
  })
}
