import {MutedAccountsStorage} from '~/logic'
import {getNames, hideTweet, queryTweets} from './utils'

export const hideMutedAccounts = (
  selector: string,
  mutes: MutedAccountsStorage,
) => {
  const tweets = queryTweets(selector)

  for (const tweet of tweets) {
    const {userName} = getNames(tweet)
    if (mutes[userName] && new Date() < new Date(mutes[userName].muteUntil)) {
      hideTweet(tweet)
    }
  }
}
