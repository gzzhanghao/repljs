import EventEmitter from 'events'
import { window, document } from 'global'

export default class Evaluator extends EventEmitter {

  static IDPrefix = 'EVALUATOR'

  constructor() {
    super()

    this.id = `${Evaluator.IDPrefix}-${Math.random()}-${Date.now()}`

    this.iframe = document.createElement('iframe')

    this.iframe.sandbox = 'allow-forms allow-pointer-lock allow-popups allow-scripts'
    this.iframe.style.display = 'none'

    this.onMessage = this.onMessage.bind(this)

    this.envScript = `(() => {
      'use strict'

      const origin = window.console

      const postLog = (method, args) => {
        window.top.postMessage({
          method,
          target: ${JSON.stringify(this.id)},
          args: args.map(arg => {
            if (arg instanceof Error) return arg.stack
            return arg
          })
        }, '*')
      }

      const proxy = method => ({
        writable: true,
        configurable: true,
        value(...args) {
          origin[method](...args)
          postLog(method, args)
        }
      })

      window.console = Object.create(origin, {
        log: proxy('log'),
        warn: proxy('warn'),
        error: proxy('error'),
        clear: proxy('clear')
      })

      window.addEventListener('error', event => {
        postLog('error', ['Uncaught', event.error])
      })
    })()`

    document.body.appendChild(this.iframe)
    window.addEventListener('message', this.onMessage)
  }

  evaluate(script) {
    this.iframe.srcdoc = `
      <script>${this.envScript}</script>
      <script>${script}</script>
    `
  }

  unmount() {
    document.body.removeChild(this.iframe)
    window.removeEventListener('message', this.onMessage)
  }

  onMessage(msg) {
    if (msg.data && msg.data.target === this.id) {
      this.emit('message', msg.data)
    }
  }
}
