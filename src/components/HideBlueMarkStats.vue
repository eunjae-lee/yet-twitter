<script setup lang="ts">
import {
  useExtensionOptions,
  useStatsForTweets,
} from '~/composables/useStorageLocal'

const opened = ref(false)
const stats = useStatsForTweets()
const extOptions = useExtensionOptions()

const totalHiddenTweets = computed(() => {
  return Object.values(stats.value).reduce<number>((count, stat) => {
    count += stat.count
    return count
  }, 0)
})
const sortedList = computed(() => {
  return Object.entries(stats.value)
    .sort(([_userName1, stat1], [_userName2, stat2]) =>
      stat1.lastTimestamp.localeCompare(stat2.lastTimestamp),
    )
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
  <div>
    <div class="flex justify-end">
      <button
        class="normal-case btn btn-xs btn-secondary"
        @click="opened = !opened"
      >
        {{ $t('view_stats') }}
      </button>
    </div>
    <div v-if="opened" class="mt-4 shadow-xl card w-96 bg-base-200">
      <div class="card-body">
        <p>
          <span class="font-bold">{{ $t('total_hidden_tweet') }}:</span>
          {{ new Intl.NumberFormat().format(totalHiddenTweets) }}
        </p>
        <p class="flex items-center gap-1">
          {{ $t('allow_blue_mark_desc') }}
        </p>
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
            >
              <IconCheck />
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
  </div>
</template>
