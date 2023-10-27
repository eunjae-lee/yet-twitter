import {storage} from 'webextension-polyfill'
import {useStorageLocal} from '~/composables/useStorageLocal'

const KEY = 'yet-twitter-options'

export const extOptions = useStorageLocal(KEY, {
  // Tweet
  hideRepliesFromMutedAccounts: true,
  hideRepliesFromBlockedAccounts: true,

  // Timeline
  hideBlueMarks: false,

  // Common
  revertTwitterLogo: true,
  allowedUsernames: [] as string[],
})

export type ExtOptions = (typeof extOptions)['value']

export const readOptionAsync = async () =>
  // eslint-disable-next-line unicorn/no-await-expression-member
  JSON.parse((await storage.local.get(KEY))[KEY]) as ExtOptions
