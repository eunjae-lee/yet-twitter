import {storage as _storage} from 'webextension-polyfill'

export const KEY_OPTIONS = 'yet-twitter-options'
const KEY_STATS_FOR_TWEETS = 'yet-twitter-stats-for-tweets'

export const DEFAULT_OPTIONS = {
  // Tweet
  hideRepliesFromMutedAccounts: true,
  hideRepliesFromBlockedAccounts: true,

  // Timeline
  hideBlueMarks: false,

  // Common
  revertTwitterLogo: true,
  allowedUsernames: [] as string[],
}

export type ExtOptions = typeof DEFAULT_OPTIONS

export const readOptionAsync = async () => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  try {
    return JSON.parse(
      (await storage.local.get(KEY_OPTIONS))[KEY_OPTIONS],
    ) as ExtOptions
  } catch (err) {
    return DEFAULT_OPTIONS
  }
}

const storage = {
  async removeItem(key: string) {
    return _storage.local.remove(key)
  },

  async setItem(key: string, value: unknown) {
    return _storage.local.set({[key]: JSON.stringify(value)})
  },

  async getItem(key: string) {
    try {
      // eslint-disable-next-line unicorn/no-await-expression-member
      return JSON.parse((await _storage.local.get(key))[key])
    } catch (err) {
      return undefined
    }
  },
}

export const logTweetRemoved = async (screenName: string) => {
  let stats = await storage.getItem(KEY_STATS_FOR_TWEETS)
  if (!stats) {
    await storage.setItem(KEY_STATS_FOR_TWEETS, JSON.stringify({}))
    stats = {}
  }
  stats[screenName] = stats[screenName] ? stats[screenName] + 1 : 1
  await storage.setItem(KEY_STATS_FOR_TWEETS, stats)
}
