import {storageLocal} from '~/composables/useStorageLocal'

export const KEY_MUTE_ACCOUNTS = 'yet-twitter-mute-accounts'
export type MutedAccount = {
  userName: string
  muteUntil: string
  days: number
}
export type MutedAccountsStorage = {
  [screenName: string]: MutedAccount
}
export const muteAccount = async ({
  userName, // Eunjae Lee
  screenName, // @eunjae-lee
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
  const muteUntil = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * days,
  ).toISOString()
  mutes[screenName] = {
    userName,
    days,
    muteUntil,
  }
  await storageLocal.setItem(KEY_MUTE_ACCOUNTS, JSON.stringify(mutes))
  alert(
    `This account will be muted until ${new Date(muteUntil).toLocaleString()}.`,
  )
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
