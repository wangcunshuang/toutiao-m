import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'

const app = createApp(App)

app.use(store).use(router).use(Vant).mount('#app')
