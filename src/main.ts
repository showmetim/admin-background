import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {setupRouter} from './router';
import pinia from '@/store/piniaInstance'

import App from './App.vue'
import './global.css'

const app = createApp(App);

(async () => {
  await setupRouter(app) 
  app.use(pinia).use(ElementPlus).mount('#app')
})()
