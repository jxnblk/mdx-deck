/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

export default ({ decks }) => {
  return (
    <div
      sx={{
        fontFamily: 'ui',
        fontWeight: 'bold',
        px: 4,
        py: 3,
      }}>
      <h1>MDX Deck</h1>
      <ul
        sx={{
          p: 0,
        }}>
        {decks.map(d => (
          <li
            key={d.id}
            sx={{
              my: 2,
            }}>
            <Link
              to={d.slug}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'underline',
                },
              }}>
              {d.title || d.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
