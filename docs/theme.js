import { future } from '../dist/themes'
import okaidia from 'react-syntax-highlighter/styles/prism/okaidia'

export default {
  ...future,
  prism: {
    style: okaidia,
  }
}
