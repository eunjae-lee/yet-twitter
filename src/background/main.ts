// Only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // Load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // @ts-ignore
  if (!__DEV__) {
    browser.runtime.openOptionsPage()
  }
})
