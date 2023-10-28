// Import {
//   hideRepliesFromBlockedAccounts,
//   hideRepliesFromMutedAccounts,
// } from './tweet'
import type {ExtOptions, MutedAccountsStorage} from '~/logic'
import {hideBlueMarks} from './hideBlueMarks'
import {addMuteButton} from './addMuteButton'
import {hideMutedAccounts} from './hideMutedAccounts'

export const editTimeline = async ({
  selector,
  extOptions,
  mutedAccountsStorage,
}: {
  selector: string
  extOptions: ExtOptions
  mutedAccountsStorage: MutedAccountsStorage
}) => {
  if (extOptions.hideBlueMarks) {
    await hideBlueMarks(selector, extOptions)
  }
  await addMuteButton(selector)
  await hideMutedAccounts(selector, mutedAccountsStorage)
}
