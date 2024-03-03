import {revertTwitterLogo} from './revertTwitterLogo'
import {readOptionAsync} from '~/logic'
import {watchTimeline} from './timeline'
import {injectCSS, injectDefaultCSS} from './injectCSS'
import {
  CHAIN_BLOCK_STOP_URL,
  processUsersToBlock,
  showChainBlockButton,
  stopChainBlock,
} from './user/chainBlock'

// works for
// - timeline: /home
// - tweet: /username/status/xxx
// - profile: /username
export async function onLoad() {
  if (!['twitter.com', 'x.com'].includes(window.location.host)) {
    return
  }

  // chain block - begin
  if (location.href === CHAIN_BLOCK_STOP_URL) {
    await stopChainBlock()
  }
  if (location.href.includes('/i/lists/')) {
    showChainBlockButton()
  }
  ;(window as any).navigation.addEventListener('navigate', (event: any) => {
    if (event.destination.url.includes('/i/lists/')) {
      setTimeout(() => {
        showChainBlockButton()
      }, 200)
    }
  })
  processUsersToBlock()
  // chain block - end

  injectDefaultCSS()

  const extOptions = await readOptionAsync()
  if (extOptions.revertTwitterLogo) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    revertTwitterLogo()
  }
  if (extOptions.hideRightSidebar) {
    injectCSS(`div[data-testid="sidebarColumn"] { display: none };`)
  }

  // Console.info('[vitesse-webext] Hello world from content script')
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  watchTimeline('div[aria-label="Timeline: Your Home Timeline"]')
  // Array.from(document.querySelectorAll('a[href="/home"][role="tab"]')).forEach(
  //   (tab) => {
  //     tab.addEventListener('click', watch)
  //   }
  // )
}
