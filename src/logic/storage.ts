import { storage } from 'webextension-polyfill'
import { useStorageLocal } from '~/composables/useStorageLocal'

const KEY = 'yet-twitter-options'

export const extOptions = useStorageLocal(KEY, {
  // tweet
  hideRepliesFromMutedAccounts: true,
  hideRepliesFromBlockedAccounts: true,

  // timeline
  hideBlueMarks: false,

  // common
  revertTwitterLogo: true,
  allowedUsernames: [] as string[],
})

export type ExtOptions = (typeof extOptions)['value']

export const readOptionAsync = async () => {
  return JSON.parse((await storage.local.get(KEY))[KEY]) as ExtOptions
}
