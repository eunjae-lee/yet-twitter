<script setup lang="ts">
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-[300px] flex flex-col items-center py-4 px-6 space-y-2">
    <Logo />
    <SharedTitle />
    <SharedSubtitle />
    <button class="btn btn-xs btn-ghost" @click="openOptionsPage">
      View in a new tab
    </button>
    <OptionsForm />
  </main>
</template>
