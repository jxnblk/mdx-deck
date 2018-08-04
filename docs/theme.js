import { future as theme } from '../dist/themes'
import prismStyle from 'react-syntax-highlighter/styles/prism/okaidia'
import ruby from 'react-syntax-highlighter/languages/prism/ruby'

export default {
  ...theme,
  prism: {
    style: prismStyle,
    languages: {
      ruby: ruby
    }
  }
}
