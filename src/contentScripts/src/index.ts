import debounce from 'just-debounce-it'
import {waitForElementToExist} from './wait'
import {enhanceTwitter} from './enhanceTwitter'
import {revertTwitterLogo} from './revertTwitterLogo'
import {readOptionAsync} from '~/logic'

export async function onLoad() {
  if (!['twitter.com', 'x.com'].includes(window.location.host)) {
    return
  }

  const extOptions = await readOptionAsync()
  if (extOptions.revertTwitterLogo) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    revertTwitterLogo()
  }

  // Console.info('[vitesse-webext] Hello world from content script')
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  startWatching('section[aria-labelledby="accessible-list-0"] > div')
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  startWatching('section[aria-labelledby="accessible-list-1"] > div')
  // Array.from(document.querySelectorAll('a[href="/home"][role="tab"]')).forEach(
  //   (tab) => {
  //     tab.addEventListener('click', watch)
  //   }
  // )
}

export async function startWatching(selector: string) {
  const extOptions = await readOptionAsync()
  await waitForElementToExist(selector)

  const resizeObserver = new ResizeObserver(
    debounce(async () => {
      await enhanceTwitter(selector, extOptions)
    }, 100),
  )

  // Start observing a DOM node
  resizeObserver.observe(document.querySelector(selector)!)
}
