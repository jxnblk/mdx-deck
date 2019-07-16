import React from 'react'
import App from './components/app'

export const wrapPageElement = ({ element }) => <App>{element}</App>

export { Appear } from './components/appear'
export { Notes } from './components/notes'
export { Head } from './components/head'
export { Clock } from './components/clock'
export { Timer } from './components/timer'
export { Slide } from './components/slide'
export { Zoom } from './components/zoom'
export { Embed } from './components/embed'
export { Image } from './components/image'
export { FullScreenCode } from './components/full-screen-code'
export { Horizontal } from './components/horizontal'
export { Invert } from './components/invert'
export { Split } from './components/split'
export { SplitRight } from './components/split-right'

export { useDeck } from './hooks/use-deck'
export { useSteps } from './hooks/use-steps'

export { convertLegacyTheme } from './convert-legacy-theme'
