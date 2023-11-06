import {ExtOptions, logTweetRemoved} from '~/logic'
import {getNames, hideTweet, queryTweets} from './utils'
import {getAccountInfo} from './timelineData'

export const hideBlueMarks = async (selector: string, options: ExtOptions) => {
  const tweets = queryTweets(
    selector,
    `:has(article[data-testid='tweet'] a[role='link'] > div > div > span > svg[aria-label='Verified account'])`,
  )
  const removedNames: Array<{userName: string; screenName: string}> = []
  for (const tweet of tweets) {
    // userName: Eunjae lee
    // screenName: @eunjae-lee
    const {screenName, userName} = getNames(tweet)
    const accountInfo = getAccountInfo(screenName)
    if (screenName && userName && !options.allowedUsernames[screenName]) {
      if (options.hideBlueMarksExceptFollower && accountInfo?.followedBy) {
        // this account is allowed
      } else if (
        options.hideBlueMarksExceptFollowing &&
        accountInfo?.following
      ) {
        // this account is allowed
      } else {
        hideTweet(tweet)
        removedNames.push({
          userName,
          screenName,
        })
      }
    }
  }
  await logTweetRemoved(removedNames)
}
