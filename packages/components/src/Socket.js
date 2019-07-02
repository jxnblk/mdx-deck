import { useEffect } from 'react'
import { STORAGE_INDEX, STORAGE_STEP } from './constants'

function createWS() {
  if (typeof window === 'object') {
    const url = window.location.origin
      .replace('https:', 'wss:')
      .replace('http:', 'ws:')
    const socket = new WebSocket(`${url}/__socket`)
    socket.addEventListener('open', function() {
      console.log('ws:connected !!')
    })
    socket.addEventListener('error', function(event) {
      console.log('ws:error !!', event)
    })
    return socket
  }
}

const socket = createWS()

function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message))
  } else {
    console.warn(`socket is not ready, status :${socket.readyState}`)
  }
}
function useSocketMessage({ goto, update, index, step }) {
  useEffect(
    function() {
      function handler(event) {
        const data = JSON.parse(event.data)
        console.log('Message from server ', data)
        if (data.type === 'broadcast') {
          const value = data.payload.value - 0
          if (data.payload.type === STORAGE_INDEX && value !== index) {
            //localStorage.setItem(STORAGE_INDEX, value)
            goto(value)
          } else if (data.payload.type === STORAGE_STEP && value !== step) {
            //localStorage.setItem(STORAGE_STEP, value)
            update({ step: value })
          }
        }
      }
      socket.addEventListener('message', handler)
      return function() {
        socket.removeEventListener('message', handler)
      }
    },
    [goto, update]
  )
}
const useSocket = (slide, step) => {
  useEffect(() => {
    try {
      if (document.hasFocus()) {
        const msg = {
          type: 'broadcast',
          payload: {
            type: STORAGE_INDEX,
            value: slide,
            [STORAGE_STEP]: step,
          },
        }
        sendMessage(msg)
      }
    } catch (err) {
      console.error('error while sending ws:message ', err)
    }
  }, [slide])
  useEffect(() => {
    try {
      if (document.hasFocus()) {
        const msg = {
          type: 'broadcast',
          payload: {
            type: STORAGE_STEP,
            value: step,
            [STORAGE_INDEX]: slide,
          },
        }
        sendMessage(msg)
      }
    } catch (err) {
      console.error('error while sending ws:message ', err)
    }
  }, [step])
}

export default ({ goto, update, index, step }) => {
  if (process.env.NODE_ENV === 'development') {
    useSocketMessage({ goto, update, index, step })
    useSocket(index, step)
  }
  return false
}
