import {ExtOptions} from '~/logic'
import {getNames, hideTweet, queryTweets} from './utils'
import {getAccountInfo} from './timelineData'

export const hideBlueTweets = async (
  selector: string,
  extOptions: ExtOptions,
) => {
  if (!extOptions.hideBlueMarks) {
    return
  }

  const tweets = queryTweets(selector)
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
    if (extOptions.hideBlueMarksExceptFollower && !accountInfo.followedBy) {
      console.log('💡 hiding', accountInfo)
      hideTweet(tweet)
    } else if (
      extOptions.hideBlueMarksExceptFollowing &&
      !accountInfo.following
    ) {
      console.log('💡 hiding', accountInfo)
      hideTweet(tweet)
    }
  }
}
