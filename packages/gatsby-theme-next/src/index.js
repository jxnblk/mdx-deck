import React from 'react'
import App from './components/app'

export { Steps } from './components/steps'

export const wrapPageElement = ({ element }) => <App>{element}</App>
