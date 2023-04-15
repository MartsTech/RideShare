import App from '@app/App.vue'
import router from '@app/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
