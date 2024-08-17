import {queryTweets} from './utils'

export const lastOpenedRetweetMenu = {
  tweetUrl: '',
}

export const hookRetweetButton = (selector: string) => {
  const tweets = queryTweets(selector)
  for (const tweet of tweets) {
    const tweetUrl = tweet
      .querySelector('time')
      ?.parentElement?.getAttribute('href')
    if (!tweetUrl) {
      continue
    }
    const retweetButton = tweet.querySelector(
      "button[aria-haspopup='menu'][role='button'][data-testid='retweet']",
    )
    if (!retweetButton) {
      continue
    }

    retweetButton.addEventListener('click', () => {
      lastOpenedRetweetMenu.tweetUrl = tweetUrl
    })
  }
}
