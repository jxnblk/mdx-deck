import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import defaultTheme from 'react-syntax-highlighter/styles/prism/atom-dark'
import javascript from 'react-syntax-highlighter/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'

export default withTheme(class Code extends React.Component {
  static propTypes = {
    children: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.object
  }

  constructor(props) {
    super(props)
    registerLanguage('javascript', javascript)
    registerLanguage('jsx', jsx)
    if (props.theme && props.theme.prism && props.theme.prism.languages) {
      const languages = props.theme.prism.languages
      Object.keys(languages).forEach(key => {
        registerLanguage(key, languages[key])
      })
    }
  }

  getLangauge = (lang) => {
    return lang ? lang.replace('language-', '') : 'javascripts'
  }

  render() {
    const { className, children, theme } = this.props
    const language = this.getLangauge(className)
    const style = (theme.prism && theme.prism.style)
      ? theme.prism.style
      : defaultTheme
    return (
      <SyntaxHighlighter language={language} style={style}>
        {children}
      </SyntaxHighlighter>
    )
  }
})
