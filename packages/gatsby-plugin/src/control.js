/** @jsx jsx */
import { jsx, Button, IconButton, Flex, Box } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faPrint,
  faTh,
  faDesktop,
  faThList,
  faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons'
import { useDeck } from './context'
import modes from './modes'
import { useState } from 'react'

export default () => {
  const context = useDeck()
  const [showToolbar, setShowToolbar] = useState(false)
  return (
    <div
      sx={{
        position: 'absolute',
        zIndex: 10,
        left: 0,
        bottom: 0,
        right: 0,
        variant: 'styles.Footer',
        color: 'text',
        margin: 'auto',
        visibility: showToolbar ? 'visible' : 'hidden',
      }}>
      <Flex
        sx={{
          borderRadius: 25,
          backgroundColor: 'backdrop',
          padding: 20,
          opacity: '70%',
          borderColor: 'text',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}>
        <IconButton
          bg="transparent"
          color="text"
          onClick={() => context.toggleMode(modes.presenter)}>
          <FontAwesomeIcon icon={faFilePowerpoint} size="2x" />
        </IconButton>
        <IconButton
          bg="transparent"
          color="text"
          onClick={() => context.toggleMode(modes.print)}>
          <FontAwesomeIcon icon={faPrint} size="2x" />
        </IconButton>
        <IconButton
          bg="transparent"
          color="text"
          onClick={() =>
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.documentElement.requestFullscreen()
          }>
          <FontAwesomeIcon icon={faExpand} size="2x" />
        </IconButton>
        <IconButton bg="transparent" color="text" onClick={context.previous}>
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </IconButton>
        <Box sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
          {context.index + 1} / {context.length + 1}
        </Box>
        <IconButton bg="transparent" color="text" onClick={context.next}>
          <FontAwesomeIcon icon={faChevronRight} size="2x" />
        </IconButton>
        <IconButton
          bg="transparent"
          color="text"
          onClick={() => context.toggleMode(modes.grid)}>
          <FontAwesomeIcon icon={faTh} size="2x" />
        </IconButton>
        <IconButton
          bg="transparent"
          color="text"
          onClick={() => context.toggleMode(modes.overview)}>
          <FontAwesomeIcon icon={faThList} size="2x" />
        </IconButton>
        <IconButton
          bg="transparent"
          color="text"
          onClick={() => context.setMode(modes.default)}>
          <FontAwesomeIcon icon={faDesktop} size="2x" />
        </IconButton>
      </Flex>
    </div>
  )
}
