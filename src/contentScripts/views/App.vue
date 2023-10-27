<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'

const [show, toggle] = useToggle(false)
</script>

<template>
  <div
    class="fixed bottom-0 right-0 flex items-end m-5 font-sans select-none z-100 leading-1em"
  >
    <div
      class="text-gray-800 bg-white rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <SharedTitle />
      <SharedSubtitle />
    </div>
    <button
      class="flex w-10 h-10 border-none rounded-full shadow cursor-pointer"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <lucide:twitter class="block m-auto text-lg text-white" />
    </button>
  </div>
</template>
