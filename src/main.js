// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import database from './database'

import BootstrapVue from 'bootstrap-vue'

Vue.http = Vue.prototype.$http = axios

database.createDatabase()

Vue.prototype.$database = database
Vue.config.productionTip = false

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
