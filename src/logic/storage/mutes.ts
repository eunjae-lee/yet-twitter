import {storageLocal} from '~/composables/useStorageLocal'

export const KEY_MUTE_ACCOUNTS = 'yet-twitter-mute-accounts'
export type MutedAccount = {
  screenName: string
  muteUntil: string
  days: number
}
export type MutedAccountsStorage = {
  [userName: string]: MutedAccount
}
export const muteAccount = async ({
  userName,
  screenName,
  days,
}: {
  userName: string
  screenName: string
  days: number
}) => {
  let mutes: Record<string, MutedAccount> | undefined =
    await storageLocal.getParsedItem(KEY_MUTE_ACCOUNTS)

  if (!mutes) {
    await storageLocal.setItem(KEY_MUTE_ACCOUNTS, JSON.stringify({}))
    mutes = {}
  }
  mutes[userName] = {
    screenName,
    days,
    muteUntil: new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * days,
    ).toISOString(),
  }
  await storageLocal.setItem(KEY_MUTE_ACCOUNTS, JSON.stringify(mutes))
}

export const readMutedAccounts = async () => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  try {
    return (
      ((await storageLocal.getParsedItem(
        KEY_MUTE_ACCOUNTS,
      )) as MutedAccountsStorage) ?? {}
    )
  } catch (err) {
    return {}
  }
}
