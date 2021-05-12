import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import {sync} from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import store from '@/store/store'
import VueResource from 'vue-resource'
import vueCountryRegionSelect from 'vue-country-region-select'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(vueCountryRegionSelect)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      defaultSet: 'mdi'
    }
  }),
  components: { App },
  template: '<App/>'
})
