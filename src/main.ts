import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {setupRouter} from './router';

import App from './App.vue'
import './global.css'
const app = createApp(App);
await setupRouter(app) 
app.use(ElementPlus).mount('#app')
