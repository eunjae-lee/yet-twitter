import {logTweetRemoved} from '~/logic'
import {watchMutation} from './utils'

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
