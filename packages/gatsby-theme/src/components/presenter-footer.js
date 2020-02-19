/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { globalHistory } from '@reach/router'
import useDeck from '../hooks/use-deck'
import Clock from './clock'
import Timer from './timer'
import { presenterModes } from '../constants'

const NormalIcon = () => (
  <svg
    data-testid="normalIcon"
    width="24"
    height="16"
    viewBox="0 0 24 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor">
      <rect
        x="1"
        y="1"
        width="9"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"></rect>
      <rect
        x="14"
        y="1"
        width="9"
        height="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"></rect>

      <rect x="13" y="10" width="11" height="2"></rect>
      <rect x="13" y="14" width="10" height="2"></rect>
    </g>
  </svg>
)

const TallIcon = () => (
  <svg
    data-testid="tallIcon"
    width="24"
    height="16"
    viewBox="0 0 24 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor">
      <rect
        x="1"
        y="1"
        width="9"
        height="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"></rect>
      <rect
        x="1"
        y="10"
        width="9"
        height="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"></rect>

      <rect x="13" y="0" width="11" height="2"></rect>
      <rect x="13" y="4" width="8" height="2"></rect>
      <rect x="13" y="8" width="10" height="2"></rect>
      <rect x="13" y="12" width="7" height="2"></rect>
    </g>
  </svg>
)

const NotesIcon = () => (
  <svg
    data-testid="notesIcon"
    width="24"
    height="16"
    viewBox="0 0 24 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor">
      <rect x="0" y="0" width="24" height="2"></rect>
      <rect x="0" y="4" width="22" height="2"></rect>
      <rect x="0" y="8" width="18" height="2"></rect>
      <rect x="0" y="12" width="19" height="2"></rect>
    </g>
  </svg>
)

const WideIcon = () => (
  <svg
    data-testid="wideIcon"
    width="24"
    height="16"
    viewBox="0 0 24 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor">
      <rect
        x="1"
        y="1"
        width="9"
        height="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"></rect>
      <rect
        x="14"
        y="1"
        width="9"
        height="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"></rect>

      <rect x="0" y="10" width="24" height="2"></rect>
      <rect x="0" y="14" width="20" height="2"></rect>
    </g>
  </svg>
)

const icons = {
  [presenterModes.normal]: NormalIcon,
  [presenterModes.tall]: TallIcon,
  [presenterModes.notes]: NotesIcon,
  [presenterModes.wide]: WideIcon,
}

const arrayPresenterModes = Object.values(presenterModes)
const lengthPresenterModes = arrayPresenterModes.length

export const getNextPresenterMode = presenterMode => {
  const index = arrayPresenterModes.findIndex(el => el === presenterMode)
  const nextIndex = (index + 1) % lengthPresenterModes
  return arrayPresenterModes[nextIndex]
}

export default props => {
  const context = useDeck()
  const { index, length, presenterMode, setState } = context

  const onSwitchPresenterMode = () =>
    setState({
      presenterMode: getNextPresenterMode(presenterMode),
    })

  const IconComponent = icons[presenterMode]

  return (
    <React.Fragment>
      <div>
        {index} / {length - 1}
      </div>
      <div
        sx={{
          mx: 4,
        }}>
        <a
          href={globalHistory.location.href}
          rel="noopener noreferrer"
          target="_blank"
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}>
          Open in New Window ↗︎
        </a>
      </div>
      <div sx={{ mx: 'auto' }} />
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'inherit',
        }}
        onClick={onSwitchPresenterMode}>
        <IconComponent />
      </div>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          mx: 4,
        }}>
        <Timer />
      </div>
      <div>
        <Clock />
      </div>
    </React.Fragment>
  )
}
