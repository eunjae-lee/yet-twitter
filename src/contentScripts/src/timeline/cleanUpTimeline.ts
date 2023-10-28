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
  if (extOptions.hideBlueMarks) {
    await hideBlueMarks(selector)
  }
}
