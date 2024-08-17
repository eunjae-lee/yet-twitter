import debounce from 'just-debounce-it'
import {waitForElementToExist} from './utils'
import {lastOpenedRetweetMenu} from './hookRetweetButton'

export const addQuoteTweetButton = () => {
  watchMenu((elem) => {
    if (elem.querySelector("a[href$='/quotes']")) {
      return
    }

    if (!lastOpenedRetweetMenu.tweetUrl) {
      return
    }

    const quoteButton = elem.querySelector("a[href='/compose/post']")
    if (!quoteButton) {
      return
    }

    const viewQuoteButton = quoteButton.cloneNode(true) as HTMLAnchorElement
    viewQuoteButton.setAttribute(
      'href',
      `${lastOpenedRetweetMenu.tweetUrl}/quotes`,
    )
    viewQuoteButton.setAttribute('target', '_blank')

    viewQuoteButton.children[0].innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-1q142lx"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
    `

    const textSpan = viewQuoteButton.children[1].querySelector('span')
    if (!textSpan) {
      return
    }
    textSpan.innerText = 'View Quotes'

    quoteButton.parentElement?.appendChild(viewQuoteButton)
  })
}

const watchMenu = async (callback: (elem: Element) => void) => {
  const layers = await waitForElementToExist('#layers')
  if (!layers) {
    return
  }

  const selector = 'div[role=menu]'

  const observer = new MutationObserver(
    debounce(() => {
      const menuElem = document.querySelector(selector)
      if (menuElem) {
        const retweetButton = menuElem.querySelector(
          'div[role=menuitem][data-testid="retweetConfirm"]',
        )
        if (retweetButton) {
          callback(menuElem)
        }
      }
    }, 100),
  )

  observer.observe(layers, {
    subtree: true,
    childList: true,
  })

  return () => {
    observer.disconnect()
  }
}
