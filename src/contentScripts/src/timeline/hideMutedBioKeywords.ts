import {ExtOptions, readMutedBioKeywords} from '~/logic'
import {getNames, hideTweet, queryTweets} from './utils'
import {getAccountInfo} from './timelineData'

export const hideMutedBioKeywords = async (
  selector: string,
  options: ExtOptions,
) => {
  const tweets = queryTweets(selector)
  const mutes = await readMutedBioKeywords()
  const mutedKeywords = Object.keys(mutes)
    .filter((keyword) => new Date() < new Date(mutes[keyword].muteUntil))
    .map((keyword) => keyword.toLowerCase())
  for (const tweet of tweets) {
    // userName: Eunjae lee
    // screenName: @eunjae-lee
    const {screenName, userName} = getNames(tweet)
    const accountInfo = getAccountInfo(screenName)
    if (!screenName || !userName || !accountInfo) {
      continue
    }
    if (options.allowedUsernames[screenName]) {
      continue
    }

    const desc = accountInfo.description.toLowerCase()
    if (mutedKeywords.some((keyword) => desc.includes(keyword))) {
      hideTweet(tweet)
    }
  }
}
