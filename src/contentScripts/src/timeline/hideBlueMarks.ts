import {ExtOptions, logTweetRemoved} from '~/logic'
import {getNames, hideTweet, queryTweets} from './utils'
import {dumpAccountInfo, getAccountInfo} from './timelineData'

export const hideBlueMarks = async (selector: string, options: ExtOptions) => {
  dumpAccountInfo()
  const tweets = queryTweets(selector)
  const removedNames: Array<{userName: string; screenName: string}> = []
  for (const tweet of tweets) {
    // userName: Eunjae lee
    // screenName: @eunjae-lee
    const {screenName, userName} = getNames(tweet)
    const accountInfo = getAccountInfo(screenName)
    if (!screenName || !userName || !accountInfo) {
      continue
    }
    if (!accountInfo.blueVerified) {
      continue
    }
    if (options.allowedUsernames[screenName]) {
      continue
    }
    if (options.hideBlueMarksExceptFollower && accountInfo.followedBy) {
      continue
    }
    if (options.hideBlueMarksExceptFollowing && accountInfo.following) {
      continue
    }

    hideTweet(tweet)
    removedNames.push({
      userName,
      screenName,
    })
  }
  await logTweetRemoved(removedNames)
}
