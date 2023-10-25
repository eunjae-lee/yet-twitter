import debounce from 'just-debounce-it'
import { waitForElementToExist } from './wait'

export async function startWatching(selector: string) {
  await waitForElementToExist(selector)

  const resizeObserver = new ResizeObserver(
    debounce(() => {
      // eslint-disable-next-line no-console
      console.log('changed!')
    }, 500),
  )

  // start observing a DOM node
  resizeObserver.observe(document.querySelector(selector)!)
}
