import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as axios from './axios'
import * as spinner from './spinner'
import './style.scss'
import * as VueMenu from '@hscmap/vue-menu'

Vue.use(VueMenu, { prefix: 'menu' })

spinner.install()
axios.setup()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')