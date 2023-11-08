<script setup lang="ts">
import {useMutedBioKeywords} from '~/composables/useStorageLocal'

const wordToMute = ref('')

const mutes = useMutedBioKeywords()

const mutedKeywords = computed(() => {
  return Object.keys(mutes.value)
})

const submit = () => {
  const days = 9999
  mutes.value[wordToMute.value] = {
    days,
    muteUntil: new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * days,
    ).toISOString(),
  }
  wordToMute.value = ''
}

const deleteKeyword = (keyword: string) => {
  delete mutes.value[keyword]
}
</script>

<template>
  <div class="mx-2">
    <p>{{ $t('mute_bio_keyword_desc') }}</p>
    <form class="flex gap-2 mt-4" @submit.prevent="submit">
      <input
        type="text"
        :placeholder="$t('mute_bio_keyword_placeholder')"
        class="w-full input input-sm input-bordered"
        v-model="wordToMute"
      />
      <button type="submit" class="btn btn-primary btn-sm">
        {{ $t('add') }}
      </button>
    </form>
    <ul class="mt-4">
      <li
        v-for="keyword in mutedKeywords"
        :key="keyword"
        class="flex items-center gap-1"
      >
        <button
          type="button"
          class="btn btn-sm btn-ghost"
          :title="$t('delete')"
          @click="deleteKeyword(keyword)"
        >
          <IconTrash />
          <span class="sr-only">{{ $t('delete') }}</span>
        </button>
        <p>{{ keyword }}</p>
      </li>
    </ul>
  </div>
</template>
