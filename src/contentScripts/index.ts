/* eslint-disable unicorn/prefer-top-level-await */
import {onMessage} from 'webext-bridge/content-script'
import {onLoad} from './src/onLoad'
// Import { createApp } from 'vue'
// import App from './views/App.vue'
// import { setupApp } from '~/logic/commonSetup'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
;(async () => {
  onLoad()

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({data}) => {
    // Console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  // Mount component to context window
  // const container = document.createElement('div')
  // container.id = __NAME__
  // const root = document.createElement('div')
  // const styleEl = document.createElement('link')
  // const shadowDOM =
  //   container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  // styleEl.setAttribute('rel', 'stylesheet')
  // styleEl.setAttribute(
  //   'href',
  //   browser.runtime.getURL('dist/contentScripts/style.css')
  // )
  // shadowDOM.appendChild(styleEl)
  // shadowDOM.appendChild(root)
  // document.body.appendChild(container)
  // const app = createApp(App)
  // setupApp(app)
  // app.mount(root)
})()
