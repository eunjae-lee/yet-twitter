import {storage as _storage} from 'webextension-polyfill'

export const KEY_OPTIONS = 'yet-twitter-options'

export const DEFAULT_OPTIONS = {
  // Tweet
  hideRepliesFromMutedAccounts: true,
  hideRepliesFromBlockedAccounts: true,

  // Timeline
  hideBlueMarks: false,

  // Common
  revertTwitterLogo: true,
  allowedUsernames: {} as Record<string, boolean>,
}

export type ExtOptions = typeof DEFAULT_OPTIONS

export const readOptionAsync = async () => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  try {
    return (await storage.getItem(KEY_OPTIONS)) as ExtOptions
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

export const KEY_STATS_FOR_TWEETS = 'yet-twitter-stats-for-tweets'
export type TweetRemovedStat = {
  screenName: string
  count: number
  lastTimestamp: string
}
export const logTweetRemoved = async (
  names: Array<{userName: string; screenName: string}>,
) => {
  let stats = await storage.getItem(KEY_STATS_FOR_TWEETS)
  if (!stats) {
    await storage.setItem(KEY_STATS_FOR_TWEETS, JSON.stringify({}))
    stats = {}
  }
  for (const name of names) {
    if (typeof stats[name.userName] !== 'object') {
      stats[name.userName] = {
        count: 0,
      }
    }
    stats[name.userName].screenName = name.screenName
    stats[name.userName].count += 1
    stats[name.userName].lastTimestamp = new Date().toISOString()
  }
  await storage.setItem(KEY_STATS_FOR_TWEETS, stats)
}
