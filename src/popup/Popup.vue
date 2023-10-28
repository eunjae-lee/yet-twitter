<script setup lang="ts">
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="flex flex-col items-center px-6 py-4 space-y-2 w-[28rem]">
    <Logo />
    <SharedTitle />
    <SharedSubtitle />
    <button class="btn btn-xs btn-ghost" @click="openOptionsPage">
      View in a new tab
    </button>
    <OptionsForm />
  </main>
</template>
