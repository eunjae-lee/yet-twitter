// Import {
//   hideRepliesFromBlockedAccounts,
//   hideRepliesFromMutedAccounts,
// } from './tweet'
import type {ExtOptions, MutedAccountsStorage} from '~/logic'
import {addMuteButton} from './addMuteButton'
import {hideMutedAccounts} from './hideMutedAccounts'
import {hideMutedBioKeywords} from './hideMutedBioKeywords'

export const editTimeline = async ({
  selector,
  extOptions,
  mutedAccountsStorage,
}: {
  selector: string
  extOptions: ExtOptions
  mutedAccountsStorage: MutedAccountsStorage
}) => {
  await hideMutedBioKeywords(selector, extOptions)
  await addMuteButton(selector)
  await hideMutedAccounts(selector, mutedAccountsStorage)
}
