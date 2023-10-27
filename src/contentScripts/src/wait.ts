// https://bobbyhadz.com/blog/javascript-wait-for-element-to-exist

export async function waitForElementToExist(selector: string) {
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
