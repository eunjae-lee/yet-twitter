import {logTweetRemoved} from '~/logic'

export const storeBlueRemovalStats = () => {
  const selector = '.yet-twitter-timeline-blue-removal-stats'
  watchMutation(selector, () => {
    Array.from(document.querySelectorAll(selector)).forEach((elem) => {
      const json = JSON.parse(elem.innerHTML)
      elem.remove()
      logTweetRemoved(json)
    })
  })
}

function watchMutation(
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
