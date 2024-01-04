import {MutedAccountsStorage} from '~/logic'
import {getNames, hideTweet, queryTweets} from './utils'

export const hideMutedAccounts = (
  selector: string,
  mutes: MutedAccountsStorage,
) => {
  const tweets = queryTweets(selector)

  for (const tweet of tweets) {
    const {screenName} = getNames(tweet)
    if (
      screenName &&
      mutes[screenName] &&
      new Date() < new Date(mutes[screenName].muteUntil)
    ) {
      hideTweet(tweet)
    }
  }
}
