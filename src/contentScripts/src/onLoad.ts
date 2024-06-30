import {revertTwitterLogo} from './revertTwitterLogo'
import {readOptionAsync} from '~/logic'
import {watchTimeline} from './timeline'
import {injectCSS, injectDefaultCSS} from './injectCSS'
import {chainBlock} from './user/chainBlockV2'
import {getText} from '~/i18n'
import {storeBlueRemovalStats} from './timeline/blueRemoval'

// works for
// - timeline: /home
// - tweet: /username/status/xxx
// - profile: /username
export async function onLoad() {
  if (!['twitter.com', 'x.com'].includes(window.location.host)) {
    return
  }

  chainBlock()

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
  watchTimeline(`div[aria-label="${getText('aria_label_your_home_timeline')}"]`)
  // Array.from(document.querySelectorAll('a[href="/home"][role="tab"]')).forEach(
  //   (tab) => {
  //     tab.addEventListener('click', watch)
  //   }
  // )

  storeBlueRemovalStats()
}
