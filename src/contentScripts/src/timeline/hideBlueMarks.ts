export const hideBlueMarks = (selector: string) => {
  const tweetsContainer = document
    .querySelector(selector)
    ?.querySelector('div > div')
  if (!tweetsContainer)
    return

  const tweets = tweetsContainer.querySelectorAll(
    'div[data-testid=\'cellInnerDiv\']:has(article[data-testid=\'tweet\'] a[role=\'link\'] > div > div > span > svg[aria-label=\'Verified account\'])',
  )
  tweets.forEach((tweet) => {
    tweet.style.display = 'none'
    const links = tweet.querySelectorAll(
      'article[data-testid=\'tweet\'] a[role=\'link\']',
    )
    const screenName = links[1].innerText
    const userName = links[2].innerText
  })
}
