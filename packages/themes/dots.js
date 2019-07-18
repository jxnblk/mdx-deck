/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDeck } from 'gatsby-theme-mdx-deck'
import { Link } from 'gatsby'

const Provider = props => {
  const { index, length, slug } = useDeck()
  const dots = Array.from({ length }).map((n, i) => i)
  return (
    <div
      sx={{
        position: 'relative',
      }}>
      {props.children}
      <div
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        {dots.map(i => (
          <Link
            key={i}
            to={slug + '/' + i}
            title={`Go to slide ${i}`}
            sx={{
              px: 1,
              py: 2,
            }}>
            <div
              sx={{
                fontSize: '0px',
                width: 6,
                height: 6,
                borderRadius: 9999,
                bg: 'text',
              }}
              style={{
                opacity: i <= index ? 0.75 : 0.25,
              }}>
              {i}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default {
  Provider,
}
