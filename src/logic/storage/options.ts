import {storageLocal} from '~/composables/useStorageLocal'

export const KEY_OPTIONS = 'yet-twitter-options'
export const DEFAULT_OPTIONS = {
  ver: 1,

  // Tweet
  hideRepliesFromMutedAccounts: true,
  hideRepliesFromBlockedAccounts: true,

  // Timeline
  hideBlueMarks: true,
  hideBlueMarksExceptFollower: true,
  hideBlueMarksExceptFollowing: true,

  hideRightSidebar: true,

  // Common
  revertTwitterLogo: true,
  allowedUsernames: {} as Record<string, boolean>,
}

export type ExtOptions = typeof DEFAULT_OPTIONS

type OptionsMigration = Record<
  number,
  (options: Partial<ExtOptions>) => ExtOptions
>

const optionsMigrations: OptionsMigration = {
  0: (options: any) => ({
    ...options,
    ver: 1,
    hideBlueMarksExceptFollower: true,
    hideBlueMarksExceptFollowing: true,
  }),
}

export const migrateOptions = (options: ExtOptions) => {
  let newOptions = options
  while (true) {
    const migration = optionsMigrations[newOptions.ver ?? 0]
    if (migration) {
      newOptions = migration(newOptions)
    } else {
      break
    }
  }
  return newOptions
}

export const readOptionAsync = async () => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  try {
    const options =
      ((await storageLocal.getParsedItem(KEY_OPTIONS)) as ExtOptions) ??
      DEFAULT_OPTIONS
    const migratedOptions = migrateOptions(options)
    if (options.ver !== migratedOptions.ver) {
      storageLocal.setItem(KEY_OPTIONS, JSON.stringify(migratedOptions))
      return migratedOptions
    }
    return options
  } catch (err) {
    return DEFAULT_OPTIONS
  }
}
