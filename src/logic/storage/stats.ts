import {storageLocal} from '~/composables/useStorageLocal'

export const KEY_STATS_FOR_TWEETS = 'yet-twitter-stats-for-tweets'
export type TweetRemovedStat = {
  screenName: string
  count: number
  lastTimestamp: string
}
export const logTweetRemoved = async (
  names: Array<{userName: string; screenName: string}>,
) => {
  let stats: Record<string, TweetRemovedStat> | undefined =
    await storageLocal.getParsedItem(KEY_STATS_FOR_TWEETS)
  if (!stats) {
    await storageLocal.setItem(KEY_STATS_FOR_TWEETS, JSON.stringify({}))
    stats = {}
  }
  for (const name of names) {
    if (typeof stats[name.userName] !== 'object') {
      // @ts-ignore
      stats[name.userName] = {
        count: 0,
      }
    }
    stats[name.userName].screenName = name.screenName
    stats[name.userName].count += 1
    stats[name.userName].lastTimestamp = new Date().toISOString()
  }
  await storageLocal.setItem(KEY_STATS_FOR_TWEETS, JSON.stringify(stats))
}
