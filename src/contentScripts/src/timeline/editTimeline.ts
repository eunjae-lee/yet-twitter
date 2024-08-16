// Import {
//   hideRepliesFromBlockedAccounts,
//   hideRepliesFromMutedAccounts,
// } from './tweet'
import type {ExtOptions, MutedAccountsStorage} from '~/logic'
import {addMuteButton} from './addMuteButton'
import {hideMutedAccounts} from './hideMutedAccounts'
import {hideMutedBioKeywords} from './hideMutedBioKeywords'
import {hideBlueTweets} from './hideBlueTweets'

export const editTimeline = async ({
  selector,
  extOptions,
  mutedAccountsStorage,
}: {
  selector: string
  extOptions: ExtOptions
  mutedAccountsStorage: MutedAccountsStorage
}) => {
  return await Promise.allSettled([
    hideBlueTweets(selector, extOptions),
    hideMutedBioKeywords(selector, extOptions),
    addMuteButton(selector),
    hideMutedAccounts(selector, mutedAccountsStorage),
  ])
}
