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
      `div[data-testid="cellInnerDiv"]:not(.yet-twitter-hidden-tweet)${
        modifier ?? ''
      }`,
    ),
  )
}

export const getNames = (tweet: HTMLElement) => {
  const links = tweet.querySelectorAll(
    "article[data-testid='tweet'] a[role='link']",
  )
  if (links && links[1] && links[2]) {
    const userName = (links[1].textContent || '').trim()
    const screenName = (links[2].textContent || '').trim()
    return {
      userName, // Eunjae Lee
      screenName, // @eunjae-lee
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
  callback: (element: Element | null) => void,
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

      callback(document.querySelector(selector))
    }, debounceMs),
  )

  resizeObserver.observe(document.querySelector(selector)!)
}

export function findParentElement(startingElement: Element, selector: string) {
  let currentElement: Element | null = startingElement
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement
    }
    currentElement = currentElement.parentElement
  }
  return null
}

export async function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}
