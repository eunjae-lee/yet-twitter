import {ExtOptions, logTweetRemoved} from '~/logic'
import {getNames, hideTweet, queryTweets} from './utils'

export const hideBlueMarks = async (selector: string, options: ExtOptions) => {
  const tweets = queryTweets(
    selector,
    `:has(article[data-testid='tweet'] a[role='link'] > div > div > span > svg[aria-label='Verified account'])`,
  )
  const removedNames: Array<{userName: string; screenName: string}> = []
  for (const tweet of tweets) {
    const {screenName, userName} = getNames(tweet)
    if (screenName && userName && !options.allowedUsernames[userName]) {
      hideTweet(tweet)
      removedNames.push({
        userName,
        screenName,
      })
    }
  }
  await logTweetRemoved(removedNames)
}
