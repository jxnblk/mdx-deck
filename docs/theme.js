import { future as theme } from '../dist/themes'
import prismStyle from 'react-syntax-highlighter/styles/prism/solarizedlight'
import prismJsx from 'react-syntax-highlighter/languages/prism/jsx'

export default {
  ...theme,
  prism: {
    style: prismStyle,
    languages: {
      jsx: prismJsx
    }
  }
}
