import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as axios from './axios'
import * as spinner from './spinner'

spinner.install()
axios.setup()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')