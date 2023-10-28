declare const __DEV__: boolean
/** Extension name, defined in packageJson.name */
declare const __NAME__: string

declare module '*.vue' {
  const component: any
  export default component
}

import type {MessageKeys} from './i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: MessageKeys) => string
  }
}

export {} // Important! See note.
