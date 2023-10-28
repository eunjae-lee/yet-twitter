import {logTweetRemoved} from '~/logic'

export const hideBlueMarks = async (selector: string) => {
  const tweetsContainer = document
    .querySelector(selector)
    ?.querySelector('div > div')
  if (!tweetsContainer) {
    return
  }

  const tweets: HTMLElement[] = Array.from(
    tweetsContainer.querySelectorAll(
      "div[data-testid='cellInnerDiv']:has(article[data-testid='tweet'] a[role='link'] > div > div > span > svg[aria-label='Verified account'])",
    ),
  )
  const removedUserNames: string[] = []
  for (const tweet of tweets) {
    tweet.style.display = 'none'
    const links = tweet.querySelectorAll(
      "article[data-testid='tweet'] a[role='link']",
    )
    // const screenName = links[1].textContent
    const userName = links[2].textContent
    if (userName) {
      removedUserNames.push(userName)
    }
  }
  await logTweetRemoved(removedUserNames)
}
