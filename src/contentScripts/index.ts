/* eslint-disable unicorn/prefer-top-level-await */
import {readOptionAsync} from '~/logic'
import {onLoad} from './src/onLoad'

readOptionAsync().then((options) => {
  const script = document.createElement('script')
  script.setAttribute('type', 'application/json')
  script.setAttribute('charset', 'utf-8')
  script.className = 'yet-twitter-options'
  script.innerHTML = JSON.stringify(options)
  document.body.appendChild(script)
})

// inject injected.js to catch network requests
var s = document.createElement('script')
s.src = browser.runtime.getURL('dist/contentScripts/injected.js')
s.onload = function () {
  // @ts-ignore
  this.remove()
}
;(document.head || document.documentElement).appendChild(s)

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
;(async () => {
  onLoad()
})()
