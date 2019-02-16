import React from 'react'
import { Prism } from 'react-syntax-highlighter/dist/cjs/prism'
import defaultTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'

export default class Code extends React.Component {
  constructor(props) {
    super(props)
    Prism.registerLanguage('javascript', javascript)
    Prism.registerLanguage('jsx', jsx)
    if (props.theme && props.theme.prism && props.theme.prism.languages) {
      const languages = props.theme.prism.languages
      Object.keys(languages).forEach(key => {
        Prism.registerLanguage(key, languages[key])
      })
    }
  }

  getLangauge = lang => {
    return lang ? lang.replace('language-', '') : 'javascripts'
  }

  render() {
    const { className, children, theme } = this.props
    const language = this.getLangauge(className)
    const style =
      theme.prism && theme.prism.style ? theme.prism.style : defaultTheme
    return (
      <Prism language={language} style={style}>
        {children}
      </Prism>
    )
  }
}
