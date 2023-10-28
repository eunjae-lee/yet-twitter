import {ExtOptions, logTweetRemoved} from '~/logic'

export const hideBlueMarks = async (selector: string, options: ExtOptions) => {
  const container = document.querySelector(selector)?.querySelector('div > div')
  if (!container) {
    return
  }

  const tweets: HTMLElement[] = Array.from(
    container.querySelectorAll(
      "div[data-testid='cellInnerDiv']:has(article[data-testid='tweet'] a[role='link'] > div > div > span > svg[aria-label='Verified account'])",
    ),
  )
  const removedNames: Array<{userName: string; screenName: string}> = []
  for (const tweet of tweets) {
    const links = tweet.querySelectorAll(
      "article[data-testid='tweet'] a[role='link']",
    )
    const screenName = (links[1].textContent || '').trim()
    const userName = (links[2].textContent || '').trim()
    if (!options.allowedUsernames[userName]) {
      tweet.style.display = 'none'
      removedNames.push({
        userName,
        screenName,
      })
    }
  }
  await logTweetRemoved(removedNames)
}
