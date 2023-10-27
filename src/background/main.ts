import {onMessage, sendMessage} from 'webext-bridge/background'
import type {Tabs} from 'webextension-polyfill'

// Only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('../../../../../../@vite/client')
  // Load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // Console.log('Extension installed')
})

let previousTabId = 0

// Communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({tabId}) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(previousTabId)
    previousTabId = tabId
  } catch {
    return
  }

  console.log('previous tab', tab)
  await sendMessage(
    'tab-prev',
    {title: tab.title},
    {context: 'content-script', tabId},
  )
})

onMessage('get-current-tab', async () => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.title,
    }
  } catch {
    return {
      title: undefined,
    }
  }
})
