import React from 'react'
import styled from 'styled-components'
import { modes } from './constants'
import Progress from './progress'
import Controls from './Controls'

const Bottom = styled.div([], {
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
})

export default class Provider extends React.Component {
  render() {
    const { children, mode, index, length, update } = this.props

    if (mode !== modes.normal) {
      return <React.Fragment>{children}</React.Fragment>
    }

    return (
      <React.Fragment>
        {children}
        <Bottom>
          <Progress {...this.props} />
        </Bottom>
        <Controls update={update} />
      </React.Fragment>
    )
  }
}
