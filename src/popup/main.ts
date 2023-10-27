import {createApp} from 'vue'
import '../styles'
import App from './Popup.vue'
import {setupApp} from '~/logic/commonSetup'

const app = createApp(App)
setupApp(app)
app.mount('#app')
