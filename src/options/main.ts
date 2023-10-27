/* eslint-disable import/order */
import {createApp} from 'vue'
import App from './Options.vue'
import {setupApp} from '~/logic/commonSetup'
import '../styles'

const app = createApp(App)
setupApp(app)
app.mount('#app')
