import {getText, isKorean} from '~/i18n'
import {
  findParentElement,
  wait,
  waitForElementToExist,
  watchSelectorResize,
} from '../timeline/utils'

const KEY_CHAIN_BLOCK_V2 = 'yet-twitter-chain-block-v2'
const KEY_CHAIN_MUTE_V2 = 'yet-twitter-chain-mute-v2'

const DEFAULT_DELAY = 15 // seconds

const setItem = (key: string, value: any) => {
  window.sessionStorage.setItem(key, value)
}

const getParsedItem = (key: string) => {
  try {
    return JSON.parse(window.sessionStorage.getItem(key) || '')
  } catch (err) {
    return undefined
  }
}

const removeItem = (key: string) => {
  window.sessionStorage.removeItem(key)
}

export const chainBlock = async () => {
  attachChainBlockButton()
  await processUserIfNeeded('block')
  await processUserIfNeeded('mute')
}

const attachChainBlockButton = () => {
  const attach = (element: Element | null, scrollContainer?: Element) => {
    if (!element || !element.parentElement) {
      return
    }
    const parent = element.parentElement
    let blockButtonWrapper = parent.querySelector(
      '.yet-twitter-chain-block-btn-wrapper',
    )
    if (blockButtonWrapper) {
      blockButtonWrapper.remove()
    }
    blockButtonWrapper = document.createElement('div')
    blockButtonWrapper.className = 'yet-twitter-chain-block-btn-wrapper'
    blockButtonWrapper.innerHTML = `
    <select class="yet-twitter-chain-select">
      <option disabled selected value="">${getText('block_mute')}</option>
      <option value="block_all_users">${getText('block_all_users')}</option>
      <option value="block_all_blue_users">${getText(
        'block_all_blue_users',
      )}</option>
      <option value="block_custom_list">${getText('block_custom_list')}</option>
      <option value="mute_all_users">${getText('mute_all_users')}</option>
      <option value="mute_all_blue_users">${getText(
        'mute_all_blue_users',
      )}</option>
      <option value="mute_custom_list">${getText('mute_custom_list')}</option>
    </select>

    <div class="block_custom_list_wrapper" style="display: none">
      <p>${getText('block_custom_list_desc')}</p>
      <textarea rows="10" placeholder="username1\nusername2"></textarea>
      <div style="margin-top: 0.25rem">
        <button type="button" class="yet-twitter-block-custom-list-btn">${getText(
          'block_all_users',
        )}</button>
      </div>
    </div>
      
    <div class="mute_custom_list_wrapper" style="display: none">
      <p>${getText('mute_custom_list_desc')}</p>
      <textarea rows="10" placeholder="username1\nusername2"></textarea>
      <div style="margin-top: 0.25rem">
        <button type="button" class="yet-twitter-mute-custom-list-btn">${getText(
          'mute_all_users',
        )}</button>
      </div>
    </div>
    `
    parent.insertBefore(blockButtonWrapper, element)

    blockButtonWrapper
      .querySelector('select')
      ?.addEventListener('change', async (event) => {
        const action = (event.target as HTMLSelectElement)?.value
        if (action === 'block_all_users') {
          await requestToCollectUsers({
            element,
            type: 'block',
            blueOnly: false,
            scrollContainer,
          })
        } else if (action === 'block_all_blue_users') {
          await requestToCollectUsers({
            element,
            type: 'block',
            blueOnly: true,
            scrollContainer,
          })
        } else if (action === 'mute_all_users') {
          await requestToCollectUsers({
            element,
            type: 'mute',
            blueOnly: false,
            scrollContainer,
          })
        } else if (action === 'mute_all_blue_users') {
          await requestToCollectUsers({
            element,
            type: 'mute',
            blueOnly: true,
            scrollContainer,
          })
        } else if (action === 'block_custom_list') {
          ;(
            blockButtonWrapper!.querySelector(
              '.block_custom_list_wrapper',
            ) as HTMLDivElement
          ).style.display = 'block'
          ;(
            blockButtonWrapper!.querySelector(
              '.mute_custom_list_wrapper',
            ) as HTMLDivElement
          ).style.display = 'none'
        } else if (action === 'mute_custom_list') {
          ;(
            blockButtonWrapper!.querySelector(
              '.block_custom_list_wrapper',
            ) as HTMLDivElement
          ).style.display = 'none'
          ;(
            blockButtonWrapper!.querySelector(
              '.mute_custom_list_wrapper',
            ) as HTMLDivElement
          ).style.display = 'block'
        }
      })

    const processCustomList = async (type: 'block' | 'mute') => {
      const users = (
        blockButtonWrapper?.querySelector(
          `.${type}_custom_list_wrapper textarea`,
        ) as HTMLTextAreaElement
      ).value
        .trim()
        .split('\n')
        .map((line) => {
          const trimmed = line.trim()
          return trimmed.startsWith('@') ? trimmed.slice(1) : trimmed
        })

      if (!confirm(getText('rate_limit_warning'))) {
        return
      }

      await processCollectedUsers({users, type})
    }

    blockButtonWrapper
      .querySelector('.yet-twitter-block-custom-list-btn')
      ?.addEventListener('click', async () => {
        await processCustomList('block')
      })

    blockButtonWrapper
      .querySelector('.yet-twitter-mute-custom-list-btn')
      ?.addEventListener('click', async () => {
        await processCustomList('mute')
      })
  }

  watchSelectorResize(
    `div[aria-label="${getText('aria_label_list_members')}"]`,
    attach,
  )
  watchSelectorResize(
    `div[aria-label="${getText('aria_label_following')}"]`,
    attach,
  )
  watchSelectorResize(
    `div[aria-label="${getText('aria_label_followers')}"]`,
    attach,
  )
  watchSelectorResize(
    `div[aria-label="${getText('aria_label_followers_you_know')}"]`,
    attach,
  )
  watchSelectorResize(
    `div[aria-label="${getText('aria_label_verified_followers')}"]`,
    attach,
  )
  watchSelectorResize(
    `div[aria-label="${getText('aria_label_subscriptions')}"]`,
    attach,
  )

  watchSelectorResize(
    `div[aria-label="${getText(
      'aria_label_community_member_timeline',
    )}"] nav[aria-label="${getText('aria_label_community_members')}"]`,
    (elem) => attach(elem, document.body.parentElement!),
  )
}

const requestToCollectUsers = async ({
  element,
  type,
  blueOnly,
  scrollContainer: _scrollContainer,
}: {
  element: Element
  type: 'block' | 'mute'
  blueOnly: boolean
  scrollContainer?: Element
}) => {
  if (!confirm(getText('rate_limit_warning'))) {
    return
  }

  if (!confirm(getText('chain_block_gather_desc'))) {
    return
  }

  const scrollContainer = _scrollContainer || findScrollContainer(element)
  if (!scrollContainer) {
    return
  }
  const users = await collectUsers(scrollContainer, blueOnly)
  await processCollectedUsers({users, type})
}

const processCollectedUsers = async ({
  users,
  type,
}: {
  users: string[]
  type: 'block' | 'mute'
}) => {
  const message = isKorean()
    ? `정말로 ${users.length}명을 ${
        type === 'block' ? '차단' : '뮤트'
      }하시겠습니까?`
    : `Are you sure you want to ${type === 'block' ? 'block' : 'mute'} ${
        users.length
      } users?`
  if (!confirm(message)) {
    return
  }

  const delayStr = prompt(
    getText(
      type === 'block'
        ? 'chain_block_rate_limit_desc_v2'
        : 'chain_mute_rate_limit_desc_v2',
    ),
    String(DEFAULT_DELAY),
  )
  const delay = parseFloat(delayStr || String(DEFAULT_DELAY))
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

  setItem(
    type === 'block' ? KEY_CHAIN_BLOCK_V2 : KEY_CHAIN_MUTE_V2,
    JSON.stringify({
      users,
      delay,
      nextIndex: 0,
      enabled: true,
    }),
  )

  await processUserIfNeeded(type)
}

const processUserIfNeeded = async (type: 'block' | 'mute') => {
  const data = getParsedItem(
    type === 'block' ? KEY_CHAIN_BLOCK_V2 : KEY_CHAIN_MUTE_V2,
  )
  if (!data) {
    return
  }
  const {users, delay, nextIndex, enabled} = data
  if (!enabled || !users[nextIndex]) {
    return
  }

  showBanner(type, nextIndex, users.length)

  const promise =
    type === 'block'
      ? blockUser({user: users[nextIndex], delay: parseFloat(delay)})
      : muteUser({user: users[nextIndex], delay: parseFloat(delay)})

  const buffer = 3
  const result = await waitForPromiseOrTimeout(promise, (delay + buffer) * 1000)
  if (result.status !== 'resolved') {
    await increaseNextIndex(type)
    window.location.href = 'https://x.com/'
  }
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
    await wait(10000)
    await increaseNextIndex('block')
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
  await increaseNextIndex('block')
  window.location.href = 'https://x.com/'
}

const muteUser = async ({user, delay}: {user: string; delay: number}) => {
  if (window.location.href !== `https://x.com/${user}`) {
    window.location.href = `https://x.com/${user}`
    return
  }
  const menuButton = (await waitForElementToExist(
    'button[data-testid=userActions]',
  )) as HTMLElement

  if (isMuted() || isBlocked()) {
    await wait(10000)
    await increaseNextIndex('mute')
    window.location.href = 'https://x.com/'
    return
  }

  menuButton.click()

  const muteButton = (await waitForElementToExist(
    'div[role=menuitem][data-testid=mute]',
  )) as HTMLElement
  muteButton.click()
  await wait(delay * 1000)
  await increaseNextIndex('mute')
  window.location.href = 'https://x.com/'
}

function isBlocked() {
  return (
    document.querySelectorAll(
      'div[data-testid=placementTracking] button[data-testid$=-unblock]',
    ).length === 1
  )
}

function isMuted() {
  return (
    document.querySelectorAll('button[data-testid="unmuteLink"]').length === 1
  )
}

const increaseNextIndex = async (type: 'block' | 'mute') => {
  const {users, delay, nextIndex, enabled} = getParsedItem(
    type === 'block' ? KEY_CHAIN_BLOCK_V2 : KEY_CHAIN_MUTE_V2,
  )
  setItem(
    type === 'block' ? KEY_CHAIN_BLOCK_V2 : KEY_CHAIN_MUTE_V2,
    JSON.stringify({
      users,
      delay,
      nextIndex: nextIndex + 1,
      enabled,
    }),
  )
}

const showBanner = (
  type: 'block' | 'mute',
  nextIndex: number,
  totalCount: number,
) => {
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
      ${type === 'block' ? 'Blocking' : 'Muting'}... ${
        nextIndex + 1
      }/${totalCount}
    </button>
  `
  document.body.appendChild(banner)
  document
    .querySelector('.yet-twitter-chain-block-banner-btn')
    ?.addEventListener('click', async () => {
      if (
        confirm(
          getText(
            type === 'block'
              ? 'chain_block_stop_desc_v2'
              : 'chain_mute_stop_desc_v2',
          ),
        )
      ) {
        removeItem(type === 'block' ? KEY_CHAIN_BLOCK_V2 : KEY_CHAIN_MUTE_V2)
        banner?.remove()
      }
    })
}

const collectUsers = async (scrollContainer: Element, blueOnly: boolean) => {
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
      .filter((user) =>
        blueOnly
          ? user.querySelector('svg[data-testid="icon-verified"]')
          : true,
      )
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

function waitForPromiseOrTimeout(promise: Promise<any>, timeout: number) {
  // Create a promise that rejects after the specified timeout
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'))
    }, timeout)
  })

  // Race between the original promise and the timeout promise
  return Promise.race([promise, timeoutPromise])
    .then((result) => {
      // Handle the case where the original promise resolves
      return {status: 'resolved', value: result}
    })
    .catch((error) => {
      // Handle the case where the original promise rejects
      if (error.message === 'Timeout') {
        return {status: 'timeout'}
      } else {
        return {status: 'rejected', reason: error}
      }
    })
}
