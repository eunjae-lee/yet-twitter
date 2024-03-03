import {storageLocal} from '~/composables/useStorageLocal'
import {waitForElementToExist} from '../wait'

const KEY_USERS_TO_BLOCK = 'yet-twitter-users-to-block'
export const CHAIN_BLOCK_STOP_URL = 'https://twitter.com/?stopChainBlock=true'

const DRY_RUN = false

export async function stopChainBlock() {
  await storageLocal.removeItem(KEY_USERS_TO_BLOCK)
}

export async function showChainBlockButton() {
  if (document.querySelector('.yet-twitter-block-btn-wrapper')) {
    // return if already exists
    return
  }

  const infoButton = await waitForElementToExist(
    `a[href="${location.pathname + '/info'}"][role=link]`,
  )
  const container = infoButton!.parentElement
  const buttonWrapper = document.createElement('div')
  buttonWrapper.className = 'yet-twitter-block-btn-wrapper'
  buttonWrapper.innerHTML = `
    <button type="button" class="yet-twitter-block-btn">Block All Users</button>
  `
  container!.append(buttonWrapper)

  buttonWrapper.querySelector('button')?.addEventListener('click', () => {
    if (confirm("Once you click 'OK', it will block all users in this list.")) {
      if (
        confirm(
          'To avoid Twitter rate limit, it runs intentionally very slowly (5 seconds per user). Are you sure?',
        )
      ) {
        if (
          prompt(
            'Copy the following URL, and open it whenever you want to stop the process. After copying the URL, hit the OK button.',
            CHAIN_BLOCK_STOP_URL,
          )
        ) {
          // we copy it to the clipboard anyway
          // but let's make sure they read the text and understand the procedure
          navigator.clipboard.writeText(CHAIN_BLOCK_STOP_URL)

          collectUsersToBlock().then(() => {
            processUsersToBlock()
          })
        } else {
          alert('Cancelled.')
        }
      }
    }
  })
}

async function collectUsersToBlock() {
  const memberListButton = document.querySelector(
    `a[href="${location.pathname + '/members'}"]`,
  ) as HTMLElement
  memberListButton.click()
  await waitForElementToExist(
    "div[aria-label='Timeline: List members'] div[data-testid=cellInnerDiv]",
  )

  const set = new Set()
  const scrollContainer = document.querySelector(
    'div[data-viewportview=true]',
  ) as HTMLElement
  scrollContainer.scrollTo({top: 0})
  while (true) {
    let added = 0
    const users = Array.from(
      scrollContainer.querySelectorAll('div[data-testid=cellInnerDiv]'),
    )
      .map((user) => {
        return user.querySelector('a[role=link]')?.getAttribute('href')
      })
      .filter(Boolean)
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

  await storageLocal.setItem(
    KEY_USERS_TO_BLOCK,
    JSON.stringify(Array.from(set)),
  )
}

async function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export async function processUsersToBlock() {
  const usersToBlock = await storageLocal.getParsedItem(KEY_USERS_TO_BLOCK)
  console.log('💡 processUsersToBlock', usersToBlock?.length)
  if (!usersToBlock || usersToBlock.length === 0) {
    return
  }
  blockUser(usersToBlock[0])
}

async function removeUserFromQueue(user: string) {
  const usersToBlock = await storageLocal.getParsedItem(KEY_USERS_TO_BLOCK)
  await storageLocal.setItem(
    KEY_USERS_TO_BLOCK,
    JSON.stringify(usersToBlock.filter((u: string) => u !== user)),
  )
  await wait(5000)
  window.location.href = 'https://twitter.com/'
}

async function blockUser(user: string) {
  if (window.location.href !== `https://twitter.com${user}/`) {
    window.location.href = `https://twitter.com${user}/`
    return
  }
  const menuButton = (await waitForElementToExist(
    'div[data-testid=userActions]',
  )) as HTMLElement

  if (isBlocked()) {
    await removeUserFromQueue(user)
    return
  }

  menuButton.click()

  if (!DRY_RUN) {
    const blockButton = (await waitForElementToExist(
      'div[role=menuitem][data-testid=block]',
    )) as HTMLElement
    blockButton.click()
    const confirmButton = (await waitForElementToExist(
      'div[role=button][data-testid=confirmationSheetConfirm]',
    )) as HTMLElement
    confirmButton.click()
  }
  await wait(200)
  await removeUserFromQueue(user)
}

function isBlocked() {
  return (
    document.querySelectorAll(
      'div[data-testid=placementTracking] div[data-testid$=-unblock]',
    ).length === 1
  )
}
