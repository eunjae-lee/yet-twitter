<script setup lang="ts">
const viewing = ref(false)
defineProps<{
  title: string
}>()
</script>

<template>
  <section>
    <h2 class="flex items-center justify-between">
      <span>{{ title }}</span>
      <button class="btn btn-xs" @click="viewing = !viewing">
        {{ viewing ? $t('hide') : $t('view') }}
      </button>
    </h2>
    <slot v-if="viewing" />
  </section>
</template>

<style scoped>
h2 {
  @apply mx-1 text-sm font-bold border-b border-b-base-content border-opacity-25 pb-2 mb-4;
}
</style>
