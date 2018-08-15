const ansiHTML = require('ansi-html')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

const colors = {
  reset: ['transparent', 'transparent'],
  black: '000000',
  red: 'FF0000',
  green: '00FF00',
  yellow: 'FFFF00',
  blue: '0000FF',
  magenta: 'FF00FF',
  cyan: '00FFFF',
  lightgrey: 'EEEEEE',
  darkgrey: '666666'
};
ansiHTML.setColors(colors)

let overlay

const style = (el, styles) => {
  for (const key in styles) {
    el.style[key] = styles[key]
  }
  return el
}

const show = ({
  title = '',
  text = ''
}) => {
  overlay = document.body.appendChild(
    document.createElement('pre')
  )
  style(overlay, {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxSizing: 'border-box',
    fontFamily: 'Menlo, monospace',
    fontSize: '12px',
    overflow: 'auto',
    lineHeight: 1.5,
    padding: '8px',
    margin: 0,
    color: 'magenta',
    backgroundColor: 'black'
  })
  const code = ansiHTML(entities.encode(text))
  overlay.innerHTML = `<span>${title}</span>
  <br />
  <br />${code}
  `
}

const destroy = () => {
  if (!overlay) return
  document.body.removeChild(overlay)
}

const ws = new WebSocket('ws://localhost:' + HOT_PORT)

ws.addEventListener('message', msg => {
  const data = JSON.parse(msg.data)
  switch (data.type) {
    case 'errors':
      const [ text ] = data.data.errors
      console.error(data.data.errors)
      show({ title: 'failed to compile', text })
      break
    case 'ok':
      destroy()
      break
  }
})

ws.addEventListener('close', () => {
  show({ title: 'disconnected' })
})
