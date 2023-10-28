import debounce from 'just-debounce-it'
import {readMutedAccounts, readOptionAsync} from '~/logic'
import {waitForElementToExist} from '../wait'
import {editTimeline} from './editTimeline'

export async function watchTimeline(selector: string) {
  const extOptions = await readOptionAsync()
  const mutedAccountsStorage = await readMutedAccounts()
  await waitForElementToExist(selector)

  const resizeObserver = new ResizeObserver(
    debounce(async (entries: Parameters<ResizeObserverCallback>[0]) => {
      if (
        entries[0].borderBoxSize[0].blockSize === 0 &&
        entries[0].borderBoxSize[0].inlineSize === 0 &&
        !document.querySelector(selector)
      ) {
        // this section has been detached.
        // let's wait for it to appear again
        resizeObserver.disconnect()
        watchTimeline(selector)
        return
      }

      if (window.location.pathname === '/home') {
        await editTimeline({selector, extOptions, mutedAccountsStorage})
      }
    }, 100),
  )

  // Start observing a DOM node
  resizeObserver.observe(document.querySelector(selector)!)
}
