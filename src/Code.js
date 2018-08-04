import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/prism-light"
import defaultTheme from 'react-syntax-highlighter/styles/prism/atom-dark'
import javascript from 'react-syntax-highlighter/languages/prism/javascript'
import php from 'react-syntax-highlighter/languages/prism/php'
import elixir from 'react-syntax-highlighter/languages/prism/elixir'

registerLanguage('javascript', javascript);
// registerLanguage('php', php);
registerLanguage('elixir', elixir);

export default withTheme(class Code extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  getLangauge = (lang) => {
    return lang ? lang.replace('language-', '') : 'javascript'
  }

  render() {
    const { className, children, theme } = this.props
    const language = this.getLangauge(className)
    const style = theme.highlight ? theme.highlight : defaultTheme

    return (
      <SyntaxHighlighter language={language} style={style}>
        {children}
      </SyntaxHighlighter>
    )
  }
})
