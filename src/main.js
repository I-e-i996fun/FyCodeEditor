import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// 引入组件和样式
import RouterTab from '@/components/RouterTab'
import '@/components/RouterTab/scss/routerTab.scss'

import '@/assets/css/base.scss'

Vue.use(Buefy)
Vue.use(RouterTab)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
