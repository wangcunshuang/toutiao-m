import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'

const app = createApp(App)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
app.config.globalProperties.$http = axios

app.use(store).use(router).use(Vant).mount('#app')
