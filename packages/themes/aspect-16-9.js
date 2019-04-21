import React from 'react'
import { FluidFontSize } from '@mdx-deck/components'
import merge from 'lodash.merge'

const getRatio = n => (n > 1 ? 1 / n : n)
const paddingBottom = theme => ({
  paddingBottom: getRatio(theme.aspectRatio) * 100 + '%',
})

const DefaultOuter = props => <>{props.children}</>

const Provider = ({ Outer, ...props }) => (
  <div
    css={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <FluidFontSize
      {...props}
      base={10}
      css={theme => ({
        width: '100%',
        height: 0,
        margin: 'auto',
        position: 'relative',
        ...paddingBottom(theme),
      })}
    />
  </div>
)

Provider.defaultProps = {
  Outer: DefaultOuter,
}

export default theme => {
  // compose outer Provider component
  Provider.defaultProps.Outer = theme.Provider || DefaultOuter

  if (theme && theme.css) {
    // remove responsive styles
    delete theme.css['@media screen and (min-width:56em)']
    delete theme.css['@media screen and (min-width:64em)']
    delete theme.css['@media print']
  }

  return merge(theme, {
    aspectRatio: 16 / 9,
    Provider,
    css: {
      fontSize: '1em',
    },
    Slide: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
  })
}
