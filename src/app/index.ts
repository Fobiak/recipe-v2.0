import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './providers'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/shared/assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

export { app }
