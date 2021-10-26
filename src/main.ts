import { createApp } from 'vue'
import router from './router'
import { store } from './store'
import naive from 'naive-ui'
import AppProvider from './AppProvider.vue'

// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'

const app = createApp(AppProvider)

app.use(router)
app.use(naive)
app.use(store)

app.mount('#app')
