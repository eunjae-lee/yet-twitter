<script setup lang="ts">
import {useExtensionOptions} from '~/composables/useStorageLocal'
const optionsLoaded = ref(false)
const extOptions = useExtensionOptions()
watch(extOptions, () => {
  optionsLoaded.value = true
})
onMounted(() => {
  setTimeout(() => {
    if (!optionsLoaded.value) {
      // If it's still not loaded, then it's probably the first time opening this extension,
      // and the default value was stored immediately.
      // However, it won't trigger `watch` in this case.
      // So we just proceed rendering the options.
      optionsLoaded.value = true
    }
  }, 200)
})
</script>

<template>
  <div class="pt-8 space-y-16" v-if="optionsLoaded">
    <section>
      <h2>{{ $t('timeline') }}</h2>
      <div class="form-control">
        <label class="space-x-2 cursor-pointer label">
          <span class="label-text">{{ $t('revert_twitter_logo') }}</span>
          <input
            v-model="extOptions.revertTwitterLogo"
            type="checkbox"
            class="toggle toggle-primary"
          />
        </label>
      </div>

      <div class="form-control">
        <label class="space-x-2 cursor-pointer label">
          <span class="flex items-center gap-1 label-text">
            <span>{{ $t('hide_tweets_with_blue_mark') }}</span>
            <span class="verified">
              <svg
                fill="currentColor"
                viewBox="0 0 22 22"
                aria-label="Verified account"
                role="img"
                class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                data-testid="icon-verified"
              >
                <g>
                  <path
                    d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                  ></path>
                </g>
              </svg>
            </span>
          </span>
          <input
            v-model="extOptions.hideBlueMarks"
            type="checkbox"
            class="toggle toggle-primary"
          />
        </label>
      </div>
      <HideBlueMarkStats v-if="extOptions.hideBlueMarks" />

      <div class="form-control">
        <label class="space-x-2 cursor-pointer label">
          <span class="flex items-center gap-1 label-text">
            <span>{{ $t('hide_right_sidebar') }}</span>
          </span>
          <input
            v-model="extOptions.hideRightSidebar"
            type="checkbox"
            class="toggle toggle-primary"
          />
        </label>
      </div>
    </section>

    <section>
      <h2>{{ $t('allowed_accounts') }}</h2>
      <AllowedAccounts />
    </section>

    <section v-if="false">
      <h2>{{ $t('tweet') }}</h2>
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
    </section>

    <!-- <section>
      <pre>{{ JSON.stringify(extOptions, null, 2) }}</pre>
    </section> -->
  </div>
</template>

<style scoped>
h2 {
  @apply mx-1 text-sm font-bold border-b border-b-base-content border-opacity-25 pb-2 mb-4;
}
.verified {
  color: rgb(29, 155, 240);
}
.verified svg {
  width: 16px;
}
</style>
