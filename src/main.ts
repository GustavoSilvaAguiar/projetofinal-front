import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import '@mdi/font/css/materialdesignicons.css'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        colors: {
          primary: '#23A828'
        }
      }
    }
  }
})
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
})
const pinia = createPinia()
pinia.use(persistedState)
app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
