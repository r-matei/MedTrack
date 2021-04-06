import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify({
    icons: {
      defaultSet: 'mdi'
    }
  }),
  components: { App },
  template: '<App/>'
})
