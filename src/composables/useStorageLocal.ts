import {storage} from 'webextension-polyfill'
import type {
  MaybeRef,
  RemovableRef,
  StorageLikeAsync,
  UseStorageAsyncOptions,
} from '@vueuse/core'
import {useStorageAsync} from '@vueuse/core'
import {
  DEFAULT_OPTIONS,
  KEY_OPTIONS,
  KEY_STATS_FOR_TWEETS,
  TweetRemovedStat,
} from '~/logic'

const storageLocal: StorageLikeAsync = {
  async removeItem(key: string) {
    return storage.local.remove(key)
  },

  async setItem(key: string, value: string) {
    return storage.local.set({[key]: value})
  },

  async getItem(key: string) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    return (await storage.local.get(key))[key] as unknown
  },
}

const useStorageLocal = <T>(
  key: string,
  initialValue: MaybeRef<T>,
  options?: UseStorageAsyncOptions<T>,
): RemovableRef<T> => useStorageAsync(key, initialValue, storageLocal, options)

export const useStatsForTweets = () =>
  useStorageLocal<Record<string, TweetRemovedStat>>(KEY_STATS_FOR_TWEETS, {})

export const useExtensionOptions = () =>
  useStorageLocal(KEY_OPTIONS, DEFAULT_OPTIONS)
