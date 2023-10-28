import {storage} from 'webextension-polyfill'
import {useStorageLocal} from '~/composables/useStorageLocal'

const KEY = 'yet-twitter-options'

const DEFAULT_OPTIONS = {
  // Tweet
  hideRepliesFromMutedAccounts: true,
  hideRepliesFromBlockedAccounts: true,

  // Timeline
  hideBlueMarks: false,

  // Common
  revertTwitterLogo: true,
  allowedUsernames: [] as string[],
}

export const extOptions = useStorageLocal(KEY, DEFAULT_OPTIONS)

export type ExtOptions = (typeof extOptions)['value']

export const readOptionAsync = async () => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  try {
    return JSON.parse((await storage.local.get(KEY))[KEY]) as ExtOptions
  } catch (err) {
    return DEFAULT_OPTIONS
  }
}
