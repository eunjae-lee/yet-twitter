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
            <span>{{ $t('hide_right_sidebar') }}</span>
          </span>
          <input
            v-model="extOptions.hideRightSidebar"
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
              <IconVerified />
            </span>
          </span>
          <input
            v-model="extOptions.hideBlueMarks"
            type="checkbox"
            class="toggle toggle-primary"
          />
        </label>
      </div>
    </section>

    <CollapsableSection
      :title="$t('stats_of_hidden_tweets_with_blue_mark')"
      v-if="extOptions.hideBlueMarks"
    >
      <HideBlueMarkStats />
    </CollapsableSection>

    <CollapsableSection :title="$t('allowed_accounts')">
      <AllowedAccounts />
    </CollapsableSection>

    <CollapsableSection :title="$t('muted_accounts')">
      <MutedAccounts />
    </CollapsableSection>

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
