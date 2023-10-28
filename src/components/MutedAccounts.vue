<script setup lang="ts">
import {useMutedAccounts} from '~/composables/useStorageLocal'

const mutes = useMutedAccounts()
const list = computed(() => {
  return Object.entries(mutes.value)
    .sort(([_userName1, item1], [_userName2, item2]) => {
      return item2.muteUntil.localeCompare(item1.muteUntil)
    })
    .map(([userName, item]) => ({
      ...item,
      userName,
      active: new Date() < new Date(item.muteUntil),
    }))
})

const unmute = (userName: string) => {
  delete mutes.value[userName]
  mutes.value = mutes.value
}
</script>

<template>
  <div class="mt-4 shadow-xl card w-96 bg-base-200">
    <div class="card-body" v-if="list.length === 0">
      <p class="mt-4 text-center opacity-50">({{ $t('none') }})</p>
    </div>
    <div class="card-body" v-else>
      <p>{{ $t('click_to_unmute') }}</p>
      <ul class="mt-2 -ml-2 space-y-6">
        <li
          v-for="item in list"
          :key="item.userName"
          class="flex items-center gap-2"
        >
          <div>
            <button
              type="button"
              class="btn btn-xs"
              @click="unmute(item.userName)"
              :title="$t('unmute')"
            >
              <IconVolume />
              <span class="sr-only">{{ $t('unmute') }}</span>
            </button>
          </div>
          <div>
            <div class="flex gap-1">
              <span>{{ item.screenName }}</span>
              <a
                class="opacity-75 link"
                :href="`https://twitter.com/${item.userName}`"
                target="_blank"
                rel="noreferrer"
                >({{ item.userName }})</a
              >
            </div>
            <p class="space-x-2">
              <span>~ {{ new Date(item.muteUntil).toLocaleString() }}</span
              ><span class="text-xs opacity-75">({{ item.days }} days)</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
