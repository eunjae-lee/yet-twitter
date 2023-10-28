import {MutedAccountsStorage} from '~/logic'

export const hideMutedAccounts = (
  selector: string,
  mutes: MutedAccountsStorage,
) => {
  const container = document.querySelector(selector)?.querySelector('div > div')
  if (!container) {
    return
  }

  const tweets: HTMLElement[] = Array.from(
    container.querySelectorAll("div[data-testid='cellInnerDiv']"),
  )
  for (const tweet of tweets) {
    const links = tweet.querySelectorAll(
      "article[data-testid='tweet'] a[role='link']",
    )
    if (!links || !links[2]) {
      continue
    }
    const userName = (links[2].textContent || '').trim()
    if (mutes[userName] && new Date() < new Date(mutes[userName].muteUntil)) {
      tweet.style.display = 'none'
    }
  }
}
