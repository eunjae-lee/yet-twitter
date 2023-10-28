<script setup lang="ts">
import {
  useExtensionOptions,
  useStatsForTweets,
} from '~/composables/useStorageLocal'

const stats = useStatsForTweets()
const extOptions = useExtensionOptions()
const sortBy = ref<'recent' | 'most'>('recent')

const totalHiddenTweets = computed(() => {
  return Object.values(stats.value).reduce<number>((count, stat) => {
    count += stat.count
    return count
  }, 0)
})
const sortedList = computed(() => {
  return Object.entries(stats.value)
    .sort(([_userName1, stat1], [_userName2, stat2]) => {
      if (sortBy.value === 'recent') {
        return stat1.lastTimestamp.localeCompare(stat2.lastTimestamp)
      } else if (sortBy.value === 'most') {
        return stat2.count - stat1.count
      } else {
        return 0
      }
    })
    .map(([userName, stat]) => ({
      ...stat,
      userName,
    }))
    .filter((item) => !extOptions.value.allowedUsernames[item.userName])
})
const allowUser = (userName: string) => {
  if (typeof extOptions.value.allowedUsernames !== 'object') {
    extOptions.value.allowedUsernames = {}
  }
  extOptions.value.allowedUsernames[userName] = true
  extOptions.value = extOptions.value
}
</script>

<template>
  <div class="mt-4 shadow-xl card w-96 bg-base-200">
    <div class="card-body">
      <p>
        <span class="font-bold">{{ $t('total_hidden_tweet') }}:</span>
        {{ new Intl.NumberFormat().format(totalHiddenTweets) }}
      </p>
      <p class="flex items-center gap-1">
        {{ $t('allow_blue_mark_desc') }}
      </p>
      <div class="w-full tabs">
        <button
          class="tab tab-bordered"
          :class="{'tab-active': sortBy === 'recent'}"
          @click="sortBy = 'recent'"
        >
          Recently Hidden
        </button>
        <button
          class="tab tab-bordered"
          :class="{'tab-active': sortBy === 'most'}"
          @click="sortBy = 'most'"
        >
          The Most Hidden
        </button>
      </div>
      <ul>
        <li
          v-for="item in sortedList"
          :key="item.userName"
          class="flex items-center gap-1 shrink-0"
        >
          <button
            type="button"
            class="btn btn-xs"
            @click="allowUser(item.userName)"
            :title="$t('allow')"
          >
            <IconThumbsUp />
            <span class="sr-only">{{ $t('allow_this_account') }}</span>
          </button>
          <span class="opacity-50">{{ item.count }}</span> -
          <span class="font-bold">{{ item.screenName }}</span>
          (<a
            class="opacity-75 link"
            :href="`https://twitter.com/${item.userName}`"
            target="_blank"
            rel="noreferrer"
            >{{ item.userName }}</a
          >)
        </li>
      </ul>
    </div>
  </div>
</template>
