import { useEffect } from 'react'
import { globalHistory, navigate } from '@reach/router'
import querystring from 'querystring'

const getQuery = () => {
  const query = querystring.parse(
    globalHistory.location.search.replace(/^\?/, '')
  )
  return query
}

export default ({ mode, modes, update, index }) => {
  useEffect(() => {
    const state = getQuery()
    update(state)
  }, [])

  useEffect(() => {
    const { pathname, search } = globalHistory.location
    if (mode !== modes.NORMAL && mode !== modes.PRINT) {
      const query = '?' + querystring.stringify({ mode })
      if (query === search) return
      navigate(query)
    } else {
      if (!search) return
      navigate(pathname)
    }
  }, [mode])

  return false
}
