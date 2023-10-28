import {getText} from '~/i18n'
import {muteAccount} from '~/logic'

const MARKER_CLASS = 'yet-twitter-mute-btn-added'

export const addMuteButton = (selector: string) => {
  const container = document.querySelector(selector)
  if (!container) {
    return
  }
  const tweets = Array.from(
    container.querySelectorAll(
      `div[data-testid="cellInnerDiv"]:not(.${MARKER_CLASS})`,
    ),
  )
  tweets.forEach((tweet) => {
    tweet.classList.add(MARKER_CLASS)
    const bookmarkButton: HTMLElement | null = tweet.querySelector(
      'div:has(> div[aria-label="Bookmark"][role="button"])',
    )
    if (!bookmarkButton) {
      return
    }
    const muteButton = document.createElement('button')
    muteButton.classList.add('yet-twitter-mute-btn')
    muteButton.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-volume-x"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="22" x2="16" y1="9" y2="15" />
        <line x1="16" x2="22" y1="9" y2="15" />
      </svg>
    `
    bookmarkButton.parentElement?.insertBefore(muteButton, bookmarkButton)
    muteButton.addEventListener('click', async () => {
      const days: string = prompt(getText('how_long_to_mute')) ?? ''
      if (days === '') {
        return
      }
      const daysNum = parseInt(days, 10)
      if (Number.isInteger(daysNum) && daysNum > 0) {
        const links = tweet.querySelectorAll(
          "article[data-testid='tweet'] a[role='link']",
        )
        const screenName = (links[1].textContent || '').trim()
        const userName = (links[2].textContent || '').trim()
        await muteAccount({
          userName,
          screenName,
          days: daysNum,
        })
      } else {
        alert(getText('mute_error_msg'))
      }
    })
  })
}
