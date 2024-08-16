/* eslint-disable unicorn/prefer-top-level-await */
import {onLoad} from './src/onLoad'

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
