import debounce from 'just-debounce-it'
import {waitForElementToExist} from '../wait'

export const queryTweets = (
  containerSelector: string,
  modifier?: string,
): HTMLElement[] => {
  const container = document.querySelector(containerSelector)
  if (!container) {
    return []
  }
  return Array.from(
    container.querySelectorAll(
      `div[data-testid="cellInnerDiv"]${modifier ?? ''}`,
    ),
  )
}

export const getNames = (tweet: HTMLElement) => {
  const links = tweet.querySelectorAll(
    "article[data-testid='tweet'] a[role='link']",
  )
  if (links && links[1] && links[2]) {
    const screenName = (links[1].textContent || '').trim()
    const userName = (links[2].textContent || '').trim()
    return {
      screenName,
      userName,
    }
  } else {
    return {screenName: undefined, userName: undefined}
  }
}

export const hideTweet = (tweet: HTMLElement) => {
  tweet.classList.add('yet-twitter-hidden-tweet')
}

export const watchSelector = async (
  selector: string,
  callback: Function,
  debounceMs = 100,
) => {
  await waitForElementToExist(selector)

  const resizeObserver = new ResizeObserver(
    debounce(async (entries: Parameters<ResizeObserverCallback>[0]) => {
      if (
        entries[0].borderBoxSize[0].blockSize === 0 &&
        entries[0].borderBoxSize[0].inlineSize === 0 &&
        !document.querySelector(selector)
      ) {
        // this section has been detached.
        // let's wait for it to appear again
        resizeObserver.disconnect()
        watchSelector(selector, callback, debounceMs)
        return
      }

      callback()
    }, debounceMs),
  )

  resizeObserver.observe(document.querySelector(selector)!)
}
