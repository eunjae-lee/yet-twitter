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
    .sort(([_screenName1, stat1], [_screenName2, stat2]) => {
      if (sortBy.value === 'recent') {
        return stat1.lastTimestamp.localeCompare(stat2.lastTimestamp)
      } else if (sortBy.value === 'most') {
        return stat2.count - stat1.count
      } else {
        return 0
      }
    })
    .map(([screenName, stat]) => ({
      ...stat,
      screenName,
    }))
    .filter((item) => !extOptions.value.allowedUsernames[item.screenName])
})
const allowUser = (screenName: string) => {
  if (typeof extOptions.value.allowedUsernames !== 'object') {
    extOptions.value.allowedUsernames = {}
  }
  extOptions.value.allowedUsernames[screenName] = true
  extOptions.value = extOptions.value
}
</script>

<template>
  <div class="mx-2">
    <div class="form-control">
      <label class="space-x-2 cursor-pointer label">
        <span class="flex items-center gap-1 label-text">
          <span>{{ $t('hide_tweets_with_blue_mark') }}</span>
          <span class="verified">
            <IconVerified />
          </span>
        </span>
        <input
          v-model="extOptions.hideBlueMarks"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>

    <div class="ml-2 form-control">
      <label class="space-x-2 cursor-pointer label">
        <span class="flex items-center gap-1 label-text">
          <IconCornerDownRight />
          <span>{{ $t('hide_tweets_with_blue_mark_except_follower') }}</span>
        </span>
        <input
          v-model="extOptions.hideBlueMarksExceptFollower"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>

    <div class="ml-2 form-control">
      <label class="space-x-2 cursor-pointer label">
        <span class="flex items-center gap-1 label-text">
          <IconCornerDownRight />
          <span>{{ $t('hide_tweets_with_blue_mark_except_following') }}</span>
        </span>
        <input
          v-model="extOptions.hideBlueMarksExceptFollowing"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>
  </div>

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
          :key="item.screenName"
          class="flex items-center gap-1 shrink-0"
        >
          <button
            type="button"
            class="btn btn-xs"
            @click="allowUser(item.screenName)"
            :title="$t('allow')"
          >
            <IconThumbsUp />
            <span class="sr-only">{{ $t('allow_this_account') }}</span>
          </button>
          <span class="opacity-50">{{ item.count }}</span> -
          <span class="font-bold">{{ item.userName }}</span>
          (<a
            class="opacity-75 link"
            :href="`https://twitter.com/${item.screenName}`"
            target="_blank"
            rel="noreferrer"
            >{{ item.screenName }}</a
          >)
        </li>
      </ul>
    </div>
  </div>
</template>
