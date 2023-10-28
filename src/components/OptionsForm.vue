<script setup lang="ts">
import {useStorageLocal} from '~/composables/useStorageLocal'
import {KEY_OPTIONS, DEFAULT_OPTIONS} from '~/logic/storage'
const optionsLoaded = ref(false)
const extOptions = useStorageLocal(KEY_OPTIONS, DEFAULT_OPTIONS)
watch(extOptions, () => (optionsLoaded.value = true))
</script>

<template>
  <div class="pt-8" v-if="optionsLoaded">
    <div class="form-control">
      <label class="space-x-2 cursor-pointer label">
        <span class="label-text">Revert Twitter Logo</span>
        <input
          v-model="extOptions.revertTwitterLogo"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>
    <div class="form-control">
      <label class="space-x-2 cursor-pointer label">
        <span class="label-text">Hide tweets with blue marks</span>
        <input
          v-model="extOptions.hideBlueMarks"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>
    <div class="form-control">
      <label class="space-x-2 cursor-pointer label">
        <span class="label-text">Hide replies from muted accounts</span>
        <input
          v-model="extOptions.hideRepliesFromMutedAccounts"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>
  </div>
</template>
