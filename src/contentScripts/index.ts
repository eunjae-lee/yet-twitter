import { onMessage } from 'webext-bridge/content-script'
// import { createApp } from 'vue'
// import App from './views/App.vue'
// import { setupApp } from '~/logic/common-setup'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value

import { startWatching } from './src'
import { revertTwitterLogo } from './src/revertTwitterLogo'
import { readOptionAsync } from '~/logic'
;(async () => {
  if (!['twitter.com', 'x.com'].includes(window.location.host))
    return

  readOptionAsync().then((extOptions) => {
    if (extOptions.revertTwitterLogo)
      revertTwitterLogo()
  })
  // console.info('[vitesse-webext] Hello world from content script')
  startWatching('section[aria-labelledby="accessible-list-0"] > div')
  startWatching('section[aria-labelledby="accessible-list-1"] > div')
  // Array.from(document.querySelectorAll('a[href="/home"][role="tab"]')).forEach(
  //   (tab) => {
  //     tab.addEventListener('click', watch)
  //   }
  // )

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    // console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  // mount component to context window
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
