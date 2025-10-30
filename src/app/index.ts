import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import '.styles/main.css'

import App from './App.vue'
import { router } from './providers'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

export { app }