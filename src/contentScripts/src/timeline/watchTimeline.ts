import {readMutedAccounts, readOptionAsync} from '~/logic'
import {editTimeline} from './editTimeline'
import {watchSelectorResize} from './utils'
import {loadTimelineData} from './timelineData'

export async function watchTimeline(selector: string) {
  const extOptions = await readOptionAsync()
  const mutedAccountsStorage = await readMutedAccounts()

  watchSelectorResize(selector, async () => {
    if (window.location.pathname === '/home') {
      loadTimelineData()
      setTimeout(() => {
        editTimeline({selector, extOptions, mutedAccountsStorage})
      }, 100)
    }
  })
}
