import { createApp } from 'vue'
import router from './router'
import naive from 'naive-ui'
import App from './App.vue'

// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(router)
app.use(naive)

app.mount('#app')
