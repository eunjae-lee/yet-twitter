import {storageLocal} from '~/composables/useStorageLocal'

export const KEY_MUTE_BIO = 'yet-twitter-mute-bio'

export type MutedBioStorage = {
  [keyword: string]: {
    days: number
    muteUntil: string
  }
}

export const muteBioKeyword = async ({
  keyword,
  days,
}: {
  keyword: string
  days: number
}) => {
  let mutes: MutedBioStorage | undefined =
    await storageLocal.getParsedItem(KEY_MUTE_BIO)

  if (!mutes) {
    await storageLocal.setItem(KEY_MUTE_BIO, JSON.stringify({}))
    mutes = {}
  }
  mutes[keyword] = {
    days,
    muteUntil: new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * days,
    ).toISOString(),
  }
  await storageLocal.setItem(KEY_MUTE_BIO, JSON.stringify(mutes))
}

export const readMutedBioKeywords = async () => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  try {
    return (
      ((await storageLocal.getParsedItem(KEY_MUTE_BIO)) as MutedBioStorage) ??
      {}
    )
  } catch (err) {
    return {}
  }
}
