import App from '@app/App.vue'
import router from '@app/router'
import '@app/styles/globals.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  }
})

app.mount('#app')
