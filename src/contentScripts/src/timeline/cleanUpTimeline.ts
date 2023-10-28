// Import {
//   hideRepliesFromBlockedAccounts,
//   hideRepliesFromMutedAccounts,
// } from './tweet'
import type {ExtOptions} from '~/logic'
import {hideBlueMarks} from './hideBlueMarks'

export const cleanUpTimeline = async (
  selector: string,
  extOptions: ExtOptions,
) => {
  if (window.location.href.includes('/status/')) {
    // If (extOptions.hideRepliesFromBlockedAccounts)
    //   await hideRepliesFromBlockedAccounts()
    // if (extOptions.hideRepliesFromMutedAccounts)
    //   await hideRepliesFromMutedAccounts()
  } else if (extOptions.hideBlueMarks) {
    await hideBlueMarks(selector)
  }
}
