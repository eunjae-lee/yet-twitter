<script setup lang="ts">
import {useExtensionOptions} from '~/composables/useStorageLocal'

const options = useExtensionOptions()
const usernames = computed(() => Object.keys(options.value.allowedUsernames))

const disallowUser = (username: string) => {
  delete options.value.allowedUsernames[username]
  options.value = options.value
}

const userToAllow = ref('')
const allowUser = (event: Event) => {
  event.preventDefault()
  if (userToAllow.value.length > 0) {
    options.value.allowedUsernames[userToAllow.value] = true
    options.value = options.value
    userToAllow.value = ''
  }
}
</script>

<template>
  <div class="mt-4 shadow-xl card w-96 bg-base-200">
    <div class="card-body">
      <form class="flex items-center gap-2" @submit="allowUser">
        <input
          type="text"
          placeholder="@username to allow"
          class="w-full input input-sm input-bordered"
          v-model="userToAllow"
        />
        <button type="submit" class="btn btn-xs btn-secondary">Allow</button>
      </form>
      <p class="mt-4">{{ $t('allowed_accounts_desc') }}</p>
      <p v-if="usernames.length === 0" class="mt-4 text-center opacity-50">
        ({{ $t('none') }})
      </p>
      <ul v-else>
        <li
          v-for="username in usernames"
          :key="username"
          class="flex items-center gap-1"
        >
          <button
            type="button"
            class="btn btn-ghost btn-xs"
            @click="disallowUser(username)"
          >
            <IconX />
          </button>
          <a
            class="link"
            :href="`https://twitter.com/${username}`"
            target="_blank"
            rel="noreferrer"
            >{{ username }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
