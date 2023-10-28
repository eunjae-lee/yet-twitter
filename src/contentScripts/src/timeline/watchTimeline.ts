import {readMutedAccounts, readOptionAsync} from '~/logic'
import {editTimeline} from './editTimeline'
import {watchSelector} from './utils'

export async function watchTimeline(selector: string) {
  const extOptions = await readOptionAsync()
  const mutedAccountsStorage = await readMutedAccounts()

  watchSelector(selector, async () => {
    if (window.location.pathname === '/home') {
      await editTimeline({selector, extOptions, mutedAccountsStorage})
    }
  })
}
