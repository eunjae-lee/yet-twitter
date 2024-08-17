import {readOptionAsync} from '~/logic'
import {
  findParentElement,
  removeElementAndNextSiblings,
  watchSelectorResize,
} from './utils'
import {getText} from '~/i18n'

export const hideDiscoverMore = async () => {
  const extOptions = await readOptionAsync()
  if (!extOptions.hideDiscoverMore) {
    return
  }

  const selector =
    "main[role='main'] div[data-testid='primaryColumn'] section[aria-labelledby^='accessible-list-'][role='region'] h2[aria-level='2'][role='heading']"

  watchSelectorResize(selector, (elem) => {
    if (!elem) {
      return
    }
    const pieces = location.pathname.split('/')
    if (pieces.length !== 4 || pieces[2] !== 'status') {
      return
    }

    const discoverMoreElem = findParentElement(
      elem,
      'div[data-testid="cellInnerDiv"]',
    )
    if (!discoverMoreElem) {
      return
    }
    if (
      discoverMoreElem.textContent !==
      getText('discover_more') + getText('sourced_from')
    ) {
      return
    }

    discoverMoreElem.classList.add('hide-discover-more')
  })
}
