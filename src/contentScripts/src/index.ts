import debounce from 'just-debounce-it'
import { waitForElementToExist } from './wait'
import { enhanceTwitter } from './enhanceTwitter'
import { readOptionAsync } from '~/logic'

export async function startWatching(selector: string) {
  const extOptions = await readOptionAsync()
  await waitForElementToExist(selector)

  const resizeObserver = new ResizeObserver(
    debounce(() => {
      enhanceTwitter(selector, extOptions)
    }, 100),
  )

  // start observing a DOM node
  resizeObserver.observe(document.querySelector(selector)!)
}
