import {storageLocal} from '~/composables/useStorageLocal'

export const KEY_STATS_FOR_TWEETS = 'yet-twitter-stats-for-tweets'
export type TweetRemovedStat = {
  userName: string
  count: number
  lastTimestamp: string
}
export const logTweetRemoved = async (
  // userName: Eunjae lee
  // screenName: @eunjae-lee
  names: Array<{userName: string; screenName: string}>,
) => {
  let stats: Record<string, TweetRemovedStat> | undefined =
    await storageLocal.getParsedItem(KEY_STATS_FOR_TWEETS)
  if (!stats) {
    await storageLocal.setItem(KEY_STATS_FOR_TWEETS, JSON.stringify({}))
    stats = {}
  }
  for (const name of names) {
    if (typeof stats[name.screenName] !== 'object') {
      // @ts-ignore
      stats[name.screenName] = {
        count: 0,
      }
    }
    stats[name.screenName].userName = name.userName
    stats[name.screenName].count += 1
    stats[name.screenName].lastTimestamp = new Date().toISOString()
  }
  await storageLocal.setItem(KEY_STATS_FOR_TWEETS, JSON.stringify(stats))
}
