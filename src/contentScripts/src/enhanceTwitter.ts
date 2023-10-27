// Import {
//   hideRepliesFromBlockedAccounts,
//   hideRepliesFromMutedAccounts,
// } from './tweet'
import {hideBlueMarks} from './timeline'
import type {ExtOptions} from '~/logic'

export const enhanceTwitter = async (
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
