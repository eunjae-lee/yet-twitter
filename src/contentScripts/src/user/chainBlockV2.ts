// TODO: follower & following...

import {getText, isKorean} from '~/i18n'
import {findParentElement, wait, watchSelector} from '../timeline/utils'
import {storageLocal} from '~/composables/useStorageLocal'
import {waitForElementToExist} from '../wait'

const KEY_CHAIN_BLOCK_V2 = 'yet-twitter-chain-block-v2'

export const chainBlock = async () => {
  attachChainBlockButton()
  await blockUserIfNeeded()
}

const attachChainBlockButton = () => {
  const attach = (elem: Element | null, scrollContainer?: Element) => {
    if (!elem || !elem.parentElement) {
      return
    }
    const parent = elem.parentElement
    let blockButtonWrapper = parent.querySelector(
      '.yet-twitter-block-btn-wrapper',
    )
    if (blockButtonWrapper) {
      blockButtonWrapper.remove()
    }
    blockButtonWrapper = document.createElement('div')
    blockButtonWrapper.className = 'yet-twitter-block-btn-wrapper'
    blockButtonWrapper.innerHTML = `
    <button type="button" class="yet-twitter-block-btn">${getText(
      'block_all_users',
    )}</button>
  `
    parent.insertBefore(blockButtonWrapper, elem)

    blockButtonWrapper
      .querySelector('button')
      ?.addEventListener('click', () => {
        requestToCollectUsers(elem, scrollContainer)
      })
  }

  watchSelector(
    `div[aria-label="${getText('aria_label_list_members')}"]`,
    attach,
  )
  watchSelector(`div[aria-label="${getText('aria_label_following')}"]`, attach)
  watchSelector(`div[aria-label="${getText('aria_label_followers')}"]`, attach)
  watchSelector(
    `div[aria-label="${getText('aria_label_followers_you_know')}"]`,
    attach,
  )
  watchSelector(
    `div[aria-label="${getText('aria_label_verified_followers')}"]`,
    attach,
  )
  watchSelector(
    `div[aria-label="${getText('aria_label_subscriptions')}"]`,
    attach,
  )

  if (
    location.href.startsWith('https://x.com/i/communities/') &&
    location.href.endsWith('/members')
  ) {
    watchSelector(
      `div[aria-label="${getText(
        'aria_label_community_member_timeline',
      )}"] nav[aria-label="${getText('aria_label_community_members')}"]`,
      (elem) => attach(elem, document.body.parentElement!),
    )
  }
}

const requestToCollectUsers = async (
  element: Element,
  _scrollContainer?: Element,
) => {
  if (!confirm(getText('chain_block_gather_desc'))) {
    return
  }

  const scrollContainer = _scrollContainer || findScrollContainer(element)
  if (!scrollContainer) {
    return
  }
  const users = await collectUsersToBlock(scrollContainer)
  const message = isKorean()
    ? `정말로 ${users.length}명을 차단하시겠습니까?`
    : `Are you sure you want to block ${users.length} users?`
  if (!confirm(message)) {
    return
  }

  const delayStr = prompt(getText('chain_block_rate_limit_desc_v2'), '10')
  const delay = parseFloat(delayStr || '10')
  if (isNaN(delay)) {
    alert(getText('invalid_number'))
    return
  }

  const minutes = Math.ceil((users.length * delay) / 60)
  const message2 = isKorean()
    ? `${minutes}분이 소요됩니다. 마칠 때까지 브라우저를 유지해야 합니다. 계속하시겠습니까?`
    : `It will take ${minutes} minutes. You have to keep the browser until finished. Are you sure?`
  if (!confirm(message2)) {
    return
  }

  await storageLocal.setItem(
    KEY_CHAIN_BLOCK_V2,
    JSON.stringify({
      users,
      delay,
      nextIndex: 0,
      enabled: true,
    }),
  )

  await blockUserIfNeeded()
}

const blockUserIfNeeded = async () => {
  const data = await storageLocal.getParsedItem(KEY_CHAIN_BLOCK_V2)
  if (!data) {
    return
  }
  const {users, delay, nextIndex, enabled} = data
  if (!enabled || !users[nextIndex]) {
    return
  }

  showBanner(nextIndex, users.length)
  await blockUser({user: users[nextIndex], delay: parseFloat(delay)})
}

const blockUser = async ({user, delay}: {user: string; delay: number}) => {
  if (window.location.href !== `https://x.com/${user}`) {
    window.location.href = `https://x.com/${user}`
    return
  }
  const menuButton = (await waitForElementToExist(
    'button[data-testid=userActions]',
  )) as HTMLElement

  if (isBlocked()) {
    await increaseNextIndex()
    window.location.href = 'https://x.com/'
    return
  }

  menuButton.click()

  const blockButton = (await waitForElementToExist(
    'div[role=menuitem][data-testid=block]',
  )) as HTMLElement
  blockButton.click()
  const confirmButton = (await waitForElementToExist(
    'button[role=button][data-testid=confirmationSheetConfirm]',
  )) as HTMLElement
  confirmButton.click()
  await wait(delay * 1000)
  await increaseNextIndex()
  window.location.href = 'https://x.com/'
}

function isBlocked() {
  return (
    document.querySelectorAll(
      'div[data-testid=placementTracking] button[data-testid$=-unblock]',
    ).length === 1
  )
}

const increaseNextIndex = async () => {
  const {users, delay, nextIndex, enabled} =
    await storageLocal.getParsedItem(KEY_CHAIN_BLOCK_V2)
  await storageLocal.setItem(
    KEY_CHAIN_BLOCK_V2,
    JSON.stringify({
      users,
      delay,
      nextIndex: nextIndex + 1,
      enabled,
    }),
  )
}

const showBanner = (nextIndex: number, totalCount: number) => {
  let banner: HTMLDivElement | null = document.querySelector(
    '.yet-twitter-chain-block-banner',
  )
  if (banner) {
    banner.remove()
  }
  banner = document.createElement('div')
  banner.style.position = 'fixed'
  banner.style.left = '0'
  banner.style.top = '0'
  banner.style.zIndex = '9999'
  banner.className = 'yet-twitter-chain-block-banner'
  banner.innerHTML = `
    <button class="yet-twitter-chain-block-banner-btn">
      Blocking... ${nextIndex + 1}/${totalCount}
    </button>
  `
  document.body.appendChild(banner)
  document
    .querySelector('.yet-twitter-chain-block-banner-btn')
    ?.addEventListener('click', async () => {
      if (confirm(getText('chain_block_stop_desc_v2'))) {
        await storageLocal.removeItem(KEY_CHAIN_BLOCK_V2)
        banner?.remove()
      }
    })
}

const collectUsersToBlock = async (scrollContainer: Element) => {
  scrollContainer.scrollTo({top: 0})
  const set = new Set<string>()
  while (true) {
    let added = 0
    const users = Array.from(
      scrollContainer.querySelectorAll('div[data-testid=cellInnerDiv]'),
    )
      .filter(
        (user) => !user.querySelector("div[data-testid='userFollowIndicator']"),
      )
      .filter((user) => !user.querySelector('button[data-testid$=-unfollow]'))
      .map((user) => {
        return user
          .querySelector('a[role=link]')
          ?.getAttribute('href')
          ?.slice(1)
      })
      .filter(Boolean) as string[]
    users.forEach((user) => {
      if (!set.has(user)) {
        set.add(user)
        added++
      }
    })
    const reachedToBottom =
      Math.abs(
        scrollContainer.scrollHeight -
          (scrollContainer.scrollTop + scrollContainer.clientHeight),
      ) < 50
    if (added === 0 && reachedToBottom) {
      break
    }
    scrollContainer.scrollBy({
      top:
        scrollContainer.clientHeight -
        scrollContainer.children[0].clientHeight /* header height */,
    })
    await wait(1500)
  }
  return Array.from(set)
}

const findScrollContainer = (element: Element) => {
  return (
    findParentElement(element, 'div[data-viewportview="true"]') ||
    document.body.parentElement
  )
}
