import debounce from 'just-debounce-it'

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

export const watchSelectorResize = async (
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
        watchSelectorResize(selector, callback, debounceMs)
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

export function watchMutation(
  selector: string,
  callbackFn: (element: Element) => void,
): MutationObserver {
  // Select the target node
  const targetNode = document.body

  // Options for the observer (which mutations to observe)
  const config: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
  }

  // Callback function to execute when mutations are observed
  const callback = function (
    mutationsList: MutationRecord[],
    observer: MutationObserver,
  ) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === 1 &&
            node instanceof Element &&
            node.matches(selector)
          ) {
            // Perform actions when the desired element appears
            callbackFn(node as Element)
          }
        })
      }
    }
  }

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback)

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config)

  // Return the observer so it can be disconnected later if needed
  return observer
}

// https://bobbyhadz.com/blog/javascript-wait-for-element-to-exist
export async function waitForElementToExist(
  selector: string,
): Promise<Element | null> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      resolve(document.querySelector(selector))
      return
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    })
  })
}
