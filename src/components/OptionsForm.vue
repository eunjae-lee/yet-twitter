<script setup lang="ts">
import { extOptions } from '~/logic/storage'
</script>

<template>
  <div class="pt-8">
    <div class="form-control">
      <label class="label cursor-pointer space-x-2">
        <span class="label-text">Revert Twitter Logo</span>
        <input
          v-model="extOptions.revertTwitterLogo"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>
    <div class="form-control">
      <label class="label cursor-pointer space-x-2">
        <span class="label-text">Hide tweets with blue marks</span>
        <input
          v-model="extOptions.hideBlueMarks"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>
    <div class="form-control">
      <label class="label cursor-pointer space-x-2">
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
